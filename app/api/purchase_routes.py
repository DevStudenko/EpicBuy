from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from app.models import db, Purchase, Product, CartItem, Cart, User
from flask_login import login_required, current_user
import os
import stripe

stripe.api_key = os.environ.get("STRIPE_SECRET")

app = Flask(__name__)
CORS(app)

purchase_routes = Blueprint('purchases', __name__)

@purchase_routes.route('', methods=['POST'])
@login_required
def purchase_items():
    data = request.json
    items = data.get('items', [])

    if not items:
        return jsonify({"message": "No items to purchase"}), 400

    lineItems = []
    for item in items:
        product = Product.query.get(item['product_id'])
        if product.quantity < item['quantity']:
            return jsonify({"message": f"Not enough stock for {product.name}"}), 400

        product.quantity -= item['quantity']

        purchase = Purchase(
            user_id=current_user.id,
            product_id=product.id,
            quantity=item['quantity'],
            price_at_purchase=product.price
        )
        db.session.add(purchase)

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
            payment_method_types=['card'],
            line_items=lineItems,
            mode='payment',
            success_url='http://localhost:3000/success',  # Update this URL
            cancel_url='http://localhost:3000/cancel',    # Update this URL
        )
    except Exception as e:
        return jsonify({'message': str(e)}), 500

    CartItem.query.filter_by(cart_id=current_user.cart.id).delete()
    db.session.commit()

    return jsonify({'url': checkout_session.url}), 200

@purchase_routes.route('', methods=['GET'])
@login_required
def get_all_purchases():
    purchases = Purchase.query.filter_by(user_id=current_user.id).all()
    return jsonify([purchase.to_dict() for purchase in purchases]), 200

app.register_blueprint(purchase_routes, url_prefix='/api/purchases')
