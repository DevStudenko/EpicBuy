from flask import Blueprint, request, jsonify
from app.models import db, Product, Image
from app.aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename

product_routes = Blueprint('products', __name__)

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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

        preview_img_url = upload_response["url"]

        product = Product(
            owner_id=current_user.id,
            name=request.form.get('name'),
            description=request.form.get('description'),
            price=request.form.get('price'),
            preview_img_url=preview_img_url,
            quantity=request.form.get('quantity')
        )

        db.session.add(product)
        db.session.commit()
        return jsonify(product.to_dict()), 201
    else:
        return jsonify({"message": "Invalid file type"}), 400

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product couldn't be found"}), 404
    if not current_user.is_admin:
        return jsonify({"message": "Forbidden"}), 403

    try:
        if 'file' in request.files:
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                unique_filename = get_unique_filename(filename)
                file.filename = unique_filename
                upload_response = upload_file_to_s3(file)

                if "errors" in upload_response:
                    return upload_response, 400

                if product.preview_img_url:
                    remove_file_from_s3(product.preview_img_url)

                product.preview_img_url = upload_response["url"]

        product.name = request.form.get('name', product.name)
        product.description = request.form.get('description', product.description)
        product.price = request.form.get('price', product.price)
        product.quantity = request.form.get('quantity', product.quantity)

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

    if product.preview_img_url:
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
