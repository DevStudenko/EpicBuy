from flask import Blueprint, request, jsonify
from app.models import db, Purchase, Product, CartItem, Cart, User
from flask_login import login_required, current_user

purchase_routes = Blueprint('purchases', __name__)

@purchase_routes.route('', methods=['POST'])
@login_required
def purchase_items():
    cart_items = CartItem.query.filter_by(cart_id=current_user.cart.id).all()

    if not cart_items:
        return jsonify({"message": "No items in cart"}), 400

    total_cost = 0
    for cart_item in cart_items:
        product = Product.query.get(cart_item.product_id)
        if product.quantity < cart_item.quantity:
            return jsonify({"message": f"Not enough stock for {product.name}"}), 400

        product.quantity -= cart_item.quantity
        total_cost += product.price * cart_item.quantity

        purchase = Purchase(
            user_id=current_user.id,
            product_id=product.id,
            quantity=cart_item.quantity,
            price_at_purchase=product.price
        )
        db.session.add(purchase)
        db.session.delete(cart_item)

    current_user.balance -= total_cost
    db.session.commit()

    return jsonify({"message": "Purchase successful", "balance": current_user.balance}), 200

@purchase_routes.route('', methods=['GET'])
@login_required
def get_all_purchases():
    purchases = Purchase.query.filter_by(user_id=current_user.id).all()
    return jsonify([purchase.to_dict() for purchase in purchases]), 200
