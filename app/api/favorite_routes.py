from flask import Blueprint, request, jsonify
from app.models import db, Favorite, Product
from flask_login import login_required, current_user

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('', methods=['GET'])
@login_required
def get_all_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    return jsonify([favorite.to_dict() for favorite in favorites]), 200

@favorite_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def add_to_favorites(product_id):
    favorite = Favorite.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if favorite:
        return jsonify({"message": "Product is already in favorites"}), 400

    new_favorite = Favorite(
        user_id=current_user.id,
        product_id=product_id
    )
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(new_favorite.to_dict()), 201

@favorite_routes.route('/<int:favorite_id>', methods=['DELETE'])
@login_required
def remove_from_favorites(favorite_id):
    favorite = Favorite.query.filter_by(id=favorite_id, user_id=current_user.id).first()
    if not favorite:
        return jsonify({"message": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200
