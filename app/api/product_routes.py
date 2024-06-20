from flask import Blueprint, request, jsonify
from app.models import db, Product, Image
from flask_login import login_required, current_user

product_routes = Blueprint('products', __name__)

@product_routes.route('/', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@product_routes.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    return jsonify(product.to_dict()), 200

@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    data = request.get_json()
    product = Product(
        owner_id=current_user.id,
        name=data.get('name'),
        description=data.get('description'),
        price=data.get('price'),
        preview_img_url=data.get('preview_img_url')
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    data = request.get_json()
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if product.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.preview_img_url = data.get('preview_img_url', product.preview_img_url)

    db.session.commit()
    return jsonify(product.to_dict()), 200

@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if product.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200

@product_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def add_image_to_product(product_id):
    data = request.get_json()
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if product.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    image = Image(
        product_id=product_id,
        img_url=data.get('img_url')
    )
    db.session.add(image)
    db.session.commit()
    return jsonify(image.to_dict()), 201
