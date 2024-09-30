from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from flask_login import login_required, current_user
from app.models import Product
import stripe
import os

stripe.api_key = os.environ.get("STRIPE_SECRET")

# Set the base URL based on the environment
BASE_URL = "http://localhost:5173"
if os.environ.get("FLASK_ENV") == 'production':
    BASE_URL = os.environ.get("REACT_APP_BASE_URL")

payment_routes = Blueprint('payments', __name__)

@payment_routes.route('/create-payment-intent', methods=['POST'])
@login_required
def create_payment_intent():
    data = request.get_json()
    items = data.get('items', [])

    if not items:
        return jsonify({"error": "No items to purchase"}), 400

    # Calculate total amount (in cents)
    total_amount_cents = 0
    for item in items:
        product = Product.query.get(item['product_id'])
        if not product:
            return jsonify({"error": f"Product with ID {item['product_id']} not found"}), 404
        if product.quantity < item['quantity']:
            return jsonify({"error": f"Not enough stock for {product.name}"}), 400

        total_amount_cents += int(product.price * item['quantity'] * 100)

    try:
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=total_amount_cents,
            currency='usd',
            automatic_payment_methods={'enabled': True},
            automatic_tax={'enabled': True},
            # Optionally, include customer information
            metadata={'user_id': current_user.id},
        )
        return jsonify({
            'clientSecret': intent.client_secret
        }), 200
    except Exception as e:
        print(f"Error creating PaymentIntent: {e}")
        return jsonify({'error': str(e)}), 500
