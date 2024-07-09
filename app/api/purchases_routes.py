from flask import Blueprint, request, jsonify
from app.models import db, Purchase, Product, CartItem, Cart
from flask_login import login_required, current_user

purchase_routes = Blueprint('purchases', __name__)

@purchase_routes.route('', methods=['POST'])
@login_required
def purchase_items():
    cart_items = CartItem.query.filter_by(cart_id=current_user.cart.id).all()

    if not cart_items:
        return jsonify({"message": "No items in cart"}), 400

    for cart_item in cart_items:
        product = Product.query.get(cart_item.product_id)
        if product.quantity < cart_item.quantity:
            return jsonify({"message": f"Not enough stock for {product.name}"}), 400

        product.quantity -= cart_item.quantity

        purchase = Purchase(
            user_id=current_user.id,
            product_id=product.id,
            quantity=cart_item.quantity,
            price_at_purchase=product.price
        )
        db.session.add(purchase)
        db.session.delete(cart_item)

    db.session.commit()
    return jsonify({"message": "Purchase successful"}), 200


