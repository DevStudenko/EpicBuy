from flask import Blueprint, jsonify
from app.models import Product, CartItem, Review, User
from flask_login import login_required, current_user

initial_load_routes = Blueprint('initial_load', __name__)

@initial_load_routes.route('/init_load', methods=['GET'])
@login_required
def initial_load():
    products = Product.query.all()
    cart_items = CartItem.query.join(CartItem.cart).filter(Cart.user_id == current_user.id).all()
    reviews = Review.query.all()

    return jsonify({
        "products": [product.to_dict() for product in products],
        "cartItems": [cart_item.to_dict() for cart_item in cart_items],
        "reviews": [review.to_dict() for review in reviews],
    }), 200
