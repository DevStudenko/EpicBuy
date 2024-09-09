from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from app.models import db, Purchase, Product, CartItem, User
from flask_login import login_required, current_user
import os
import stripe

stripe.api_key = os.environ.get("STRIPE_SECRET")
API_KEY = os.environ.get("STRIPE_SECRET")

# Set the base URL based on the environment
BASE_URL = "http://localhost:5173"
if os.environ.get("FLASK_ENV") == 'production':
    BASE_URL = os.environ.get("REACT_APP_BASE_URL")

app = Flask(__name__)
CORS(app)

purchase_routes = Blueprint('purchases', __name__)

# Route to create a Stripe checkout session
@purchase_routes.route('/create-checkout-session', methods=['POST'])
@login_required
def create_checkout_session():
    data = request.json
    items = data.get('items', [])

    if not items:
        return jsonify({"message": "No items to purchase"}), 400

    lineItems = []
    for item in items:
        product = Product.query.get(item['product_id'])
        if product.quantity < item['quantity']:
            return jsonify({"message": f"Not enough stock for {product.name}"}), 400

        lineItems.append({
            'price_data': {
                'currency': "usd",
                'product_data': {
                    'name': product.name,
                    'images': [product.preview_img_url]
                },
                'unit_amount': int(product.price * 100)  # Stripe expects amount in cents
            },
            'quantity': item['quantity']
        })

    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=lineItems,
            mode='payment',
            automatic_tax={"enabled": True},
            success_url=f"{BASE_URL}/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{BASE_URL}/cancel",
        )
        return jsonify({'clientSecret': checkout_session.client_secret}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Route to handle the status of a checkout session
@purchase_routes.route('/session-status', methods=['GET'])
def session_status():
    session_id = request.args.get('session_id')
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return jsonify(status=session.status, customer_email=session.customer_details.email)
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Route for handling successful purchase after Stripe checkout session
@purchase_routes.route('/success', methods=['POST'])
@login_required
def purchase_success():
    data = request.json
    session_id = data.get('session_id')

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        if session.payment_status == 'paid':
            # Clear the cart items after successful payment
            CartItem.query.filter_by(cart_id=current_user.cart.id).delete()
            db.session.commit()
            return jsonify({"message": "Purchase successful"}), 200
        else:
            return jsonify({"message": "Payment not completed"}), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Route to handle item purchase (store purchase data in the DB)
@purchase_routes.route('', methods=['POST'])
@login_required
def purchase_items():
    data = request.json
    items = data.get('items', [])

    if not items:
        return jsonify({"message": "No items to purchase"}), 400

    for item in items:
        product = Product.query.get(item['product_id'])
        if product.quantity < item['quantity']:
            return jsonify({"message": f"Not enough stock for {product.name}"}), 400

        # Deduct product quantity
        product.quantity -= item['quantity']

        # Create a purchase record
        purchase = Purchase(
            user_id=current_user.id,
            product_id=product.id,
            quantity=item['quantity'],
            price_at_purchase=product.price
        )
        db.session.add(purchase)

    try:
        db.session.commit()
        return jsonify({"message": "Purchase recorded successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


# Route to get all purchases made by the current user
@purchase_routes.route('', methods=['GET'])
@login_required
def get_all_purchases():
    purchases = Purchase.query.filter_by(user_id=current_user.id).all()
    return jsonify([purchase.to_dict() for purchase in purchases]), 200


# Register the blueprint in your app
app.register_blueprint(purchase_routes, url_prefix='/api/purchases')
