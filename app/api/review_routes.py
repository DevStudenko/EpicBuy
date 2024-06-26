from flask import Blueprint, request, jsonify
from app.models import db, Review, Product
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def create_review(product_id):
    data = request.get_json()
    review_text = data.get('review')
    avg_rating = data.get('avg_rating')

    if not review_text or not avg_rating:
        return jsonify({"message": "Review text and rating are required"}), 400

    review = Review(
        user_id=current_user.id,
        product_id=product_id,
        review=review_text,
        avg_rating=avg_rating
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    data = request.get_json()
    review_text = data.get('review')
    avg_rating = data.get('avg_rating')

    review = Review.query.filter_by(id=review_id, user_id=current_user.id).first()

    if not review:
        return jsonify({"message": "Review not found"}), 404

    review.review = review_text if review_text else review.review
    review.avg_rating = avg_rating if avg_rating else review.avg_rating

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
