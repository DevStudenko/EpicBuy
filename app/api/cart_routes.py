from flask import Blueprint, request, jsonify
from app.models import db, Cart, CartItem
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('', methods=['GET'])
@login_required
def get_all_cart_items():
    cart_items = CartItem.query.join(CartItem.cart).filter(Cart.user_id == current_user.id).all()
    return jsonify([cart_item.to_dict() for cart_item in cart_items]), 200

@cart_routes.route('', methods=['POST'])
@login_required
def add_item_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    avg_rating = data.get('avg_rating')

    # Check if the user already has a cart
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    if not cart:
        # Create a new cart if it doesn't exist
        cart = Cart(user_id = current_user.id)
        db.session.add(cart)
        db.session.commit()

    # Add the item to the cart
    cart_item = CartItem.query.filter(CartItem.cart_id == cart.id, CartItem.product_id == product_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id = cart.id, product_id = product_id, quantity = quantity, avg_rating = avg_rating)
        db.session.add(cart_item)

    db.session.commit()
    return jsonify(cart_item.to_dict()), 201

@cart_routes.route('/<int:cart_item_id>', methods=['PUT'])
@login_required
def update_cart_item(cart_item_id):
    data = request.get_json()
    quantity = data.get('quantity')

    cart_item = CartItem.query.options(joinedload(CartItem.product)).join(Cart).filter(
        CartItem.id == cart_item_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        return jsonify({"message": "Cart item not found"}), 404

    cart_item.quantity = quantity
    db.session.commit()

    return jsonify(cart_item.to_dict()), 200

@cart_routes.route("/<int:cart_item_id>", methods = ['DELETE'])
@login_required
def remove_cart_item(cart_item_id):
    cart_item = CartItem.query.join(Cart).filter(
        CartItem.id == cart_item_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        return jsonify({"message": "Cart item not found"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200

@cart_routes.route("", methods=['DELETE'])
@login_required
def clear_cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    if not cart:
        return jsonify({"message": "No cart found for user"}), 404

    CartItem.query.filter(CartItem.cart_id == cart.id).delete()
    db.session.commit()

    return jsonify({"message": "All cart items successfully deleted"}), 200
