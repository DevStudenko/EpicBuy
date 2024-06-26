from flask import Blueprint, request, jsonify
from app.models import db, Review, Product
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)

@review_routes.route('', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200

@review_routes.route('/<int:product_id>', methods=['GET'])
def get_reviews_for_product(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

@review_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def create_review(product_id):
    data = request.get_json()
    review_text = data.get('review')
    rating = data.get('rating')

    if not review_text or not rating:
        return jsonify({"message": "Review text and rating are required"}), 400

    review = Review(
        user_id=current_user.id,
        product_id=product_id,
        review=review_text,
        rating=rating
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    data = request.get_json()
    review_text = data.get('review')
    rating = data.get('rating')

    review = Review.query.filter_by(id=review_id, user_id=current_user.id).first()

    if not review:
        return jsonify({"message": "Review not found"}), 404

    review.review = review_text if review_text else review.review
    review.rating = rating if rating else review.rating

    db.session.commit()
    return jsonify(review.to_dict()), 200

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.filter_by(id=review_id, user_id=current_user.id).first()

    if not review:
        return jsonify({"message": "Review not found"}), 404

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200
