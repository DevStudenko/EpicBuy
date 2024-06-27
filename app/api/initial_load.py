from flask import Blueprint, jsonify
from app.models import Product, CartItem, Review, User, Cart
from flask_login import login_required, current_user

initial_load = Blueprint('initial_load', __name__)

@initial_load.route('', methods=['GET'])
@login_required
def initial_load_data():
    products = Product.query.all()
    cart_items = CartItem.query.join(CartItem.cart).filter(Cart.user_id == current_user.id).all()
    reviews = Review.query.all()

    return jsonify({
        "products": [product.to_dict() for product in products],
        "cartItems": [cart_item.to_dict() for cart_item in cart_items],
        "reviews": [review.to_dict() for review in reviews],
    }), 200
