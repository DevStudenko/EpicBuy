from flask import Blueprint, request, jsonify  # Add jsonify here
from flask_login import login_required
from werkzeug.utils import secure_filename
from app.aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.models import db, Image

image_routes = Blueprint('images', __name__)

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@image_routes.route('/new', methods=['POST'])
@login_required
def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            unique_filename = get_unique_filename(filename)
            file.filename = unique_filename
            upload_response = upload_file_to_s3(file)
            print('Upload response:', upload_response)
            if "errors" in upload_response:
                return jsonify(upload_response), 400

            # Return the URL wrapped in a JSON object
            return jsonify({"url": upload_response["url"]}), 200

        return jsonify({"error": "File type not allowed"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@image_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
    try:
        image = Image.query.get(image_id)
        if not image:
            return jsonify({"error": "Image not found"}), 404  # Updated jsonify

        delete_response = remove_file_from_s3(image.img_url)

        if isinstance(delete_response, dict) and "errors" in delete_response:
            return jsonify(delete_response), 400  # Updated jsonify

        db.session.delete(image)
        db.session.commit()

        return jsonify({"message": "Image deleted successfully"}), 200  # Updated jsonify

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500  # Updated jsonify


@image_routes.route('/', methods=['GET'])
@login_required
def get_all_images():
    try:
        images = Image.query.all()
        print(images)
        return jsonify([image.to_dict() for image in images]), 200  # Updated jsonify
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Updated jsonify
