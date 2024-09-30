from flask import Blueprint, request, jsonify
from app.models import db, Product, Image
from app.aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user

product_routes = Blueprint('products', __name__)

@product_routes.route('', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@product_routes.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    return jsonify(product.to_dict()), 200

@product_routes.route("", methods=['POST'])
@login_required
def create_product():
    data = request.get_json()
    # Extract data from the request
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    preview_img_url = data.get('preview_img_url')
    quantity = data.get('quantity')

    if not name or not description or not price or not preview_img_url or not quantity:
        return jsonify({"message": "All fields are required"}), 400
    try:
        # Create and save the new product
        product = Product(
            owner_id=current_user.id,
            name=name,
            description=description,
            price=price,
            preview_img_url=preview_img_url,
            quantity=quantity
        )
        db.session.add(product)
        db.session.commit()
        return jsonify(product.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if not current_user.is_admin:
        return jsonify({"message": "Forbidden"}), 403

    data = request.get_json()

    try:
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.quantity = data.get('quantity', product.quantity)
        new_preview_img_url = data.get('preview_img_url')

        # Handle image update if a new one is provided
        if new_preview_img_url and new_preview_img_url != product.preview_img_url:
            # Only attempt to remove the old image if it's from AWS S3
            if product.preview_img_url and "your-s3-bucket-url" in product.preview_img_url:
                remove_file_from_s3(product.preview_img_url)
            product.preview_img_url = new_preview_img_url

        db.session.commit()
        return jsonify(product.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if not current_user.is_admin:
        return jsonify({"message": "Forbidden"}), 403

    # Check if the preview_img_url is from AWS S3 before attempting to delete
    if product.preview_img_url and "http://epic-buy-bucket.s3.amazonaws.com" in product.preview_img_url:
        remove_file_from_s3(product.preview_img_url)

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200

@product_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def add_image_to_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if product.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    if 'file' not in request.files:
        return jsonify({"message": "File is required"}), 400

    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = get_unique_filename(filename)
        file.filename = unique_filename
        upload_response = upload_file_to_s3(file)

        if "errors" in upload_response:
            return upload_response, 400

        image = Image(
            product_id=product_id,
            img_url=upload_response["url"]
        )

        db.session.add(image)
        db.session.commit()
        return jsonify(image.to_dict()), 201
    else:
        return jsonify({"message": "Invalid file type"}), 400
