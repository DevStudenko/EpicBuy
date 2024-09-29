from flask import Blueprint, request, jsonify
from app.models import db, Product
from flask_login import login_required
import stripe
import os

stripe.api_key = os.environ.get("STRIPE_SECRET")

payment_routes = Blueprint('payments', __name__)

@payment_routes.route('/create-payment-intent', methods=['POST'])
@login_required
def create_payment_intent():
    data = request.get_json()
    items = data.get('items', [])

    if not items:
        return jsonify({"message": "No items to purchase"}), 400

    total_amount = 0
    for item in items:
        product = Product.query.get(item['product_id'])
        if not product:
            return jsonify({"message": f"Product with ID {item['product_id']} not found"}), 404
        if product.quantity < item['quantity']:
            return jsonify({"message": f"Not enough stock for {product.name}"}), 400

        total_amount += product.price * item['quantity']

    # Convert total amount to cents
    total_amount_cents = int(total_amount * 100)

    try:
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=total_amount_cents,
            currency='usd',
            automatic_payment_methods={'enabled': True},
        )
        return jsonify({'clientSecret': intent.client_secret}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500
