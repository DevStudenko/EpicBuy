from app.models import db, User, Product, Review, Cart, CartItem, Favorite, Image, Purchase, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_seeder():
    ## SEED USERS
    user_list = [
        {'username':'Demo', 'email':'demo@aa.io', 'password':generate_password_hash("password")},
        {'username':'marnie', 'email':'marnie@aa.io', 'password':generate_password_hash("password")},
        {'username':'john', 'email':'john@aa.io', 'password':generate_password_hash("password")},
    ]

    for user_data in user_list:
        user = User(
            username=user_data['username'],
            email=user_data['email'],
            hashed_password=user_data['password'],
        )
        db.session.add(user)
    db.session.commit()

    ## SEED PRODUCTS
    product_list = [
        {'owner_id': 1, 'name': 'iPhone 13', 'description': 'Latest Apple smartphone', 'price': 999.00, 'preview_img_url': 'https://unsplash.com/photos/a-close-up-of-a-cell-phone-on-a-table-0ydMz3p5s3M'},
        {'owner_id': 2, 'name': 'MacBook Pro', 'description': 'High-performance laptop from Apple', 'price': 1999.00, 'preview_img_url': 'https://unsplash.com/photos/slightly-opened-silver-macbook-mP7aPSUm7aE'},
        {'owner_id': 3, 'name': 'Apple Watch', 'description': 'Smartwatch with fitness tracking', 'price': 399.00, 'preview_img_url': 'https://unsplash.com/photos/black-g208-smart-watch-QhF3YGsDrYk'},
    ]

    for product_data in product_list:
        product = Product(
            owner_id=product_data['owner_id'],
            name=product_data['name'],
            description=product_data['description'],
            price=product_data['price'],
            preview_img_url=product_data['preview_img_url'],
        )
        db.session.add(product)
    db.session.commit()

    ## SEED IMAGES
    image_list = [
        {'product_id': 1, 'img_url': 'https://unsplash.com/photos/a-close-up-of-a-cell-phone-with-a-camera-qJZqXSBr7_s'},
        {'product_id': 1, 'img_url': 'https://unsplash.com/photos/a-close-up-of-an-iphone-on-a-table-Mi5tb_R1zzw'},
        {'product_id': 2, 'img_url': 'https://unsplash.com/photos/black-and-gray-laptop-computer-ykI7BeSWgMo'},
        {'product_id': 2, 'img_url': 'https://unsplash.com/photos/turned-on-laptop-on-table-HyTwtsk8XqA'},
        {'product_id': 3, 'img_url': 'https://unsplash.com/photos/space-gray-aluminium-apple-watch-gtQddXwuS18'},
    ]

    for image_data in image_list:
        image = Image(
            product_id=image_data['product_id'],
            img_url=image_data['img_url'],
        )
        db.session.add(image)
    db.session.commit()

    ## SEED REVIEWS
    review_list = [
        {'user_id': 1, 'product_id': 1, 'review': 'Great phone!', 'avg_rating': 5},
        {'user_id': 2, 'product_id': 2, 'review': 'Loving my new laptop', 'avg_rating': 4},
        {'user_id': 3, 'product_id': 3, 'review': 'Very useful for fitness tracking', 'avg_rating': 5},
    ]

    for review_data in review_list:
        review = Review(
            user_id=review_data['user_id'],
            product_id=review_data['product_id'],
            review=review_data['review'],
            avg_rating=review_data['avg_rating'],
        )
        db.session.add(review)
    db.session.commit()

    ## SEED CARTS AND CART ITEMS
    cart_list = [
        {'user_id': 1},
        {'user_id': 2},
        {'user_id': 3},
    ]

    for cart_data in cart_list:
        cart = Cart(
            user_id=cart_data['user_id'],
        )
        db.session.add(cart)
    db.session.commit()

    cart_item_list = [
        {'cart_id': 1, 'product_id': 1, 'quantity': 1},
        {'cart_id': 2, 'product_id': 2, 'quantity': 1},
        {'cart_id': 3, 'product_id': 3, 'quantity': 1},
    ]

    for cart_item_data in cart_item_list:
        cart_item = CartItem(
            cart_id=cart_item_data['cart_id'],
            product_id=cart_item_data['product_id'],
            quantity=cart_item_data['quantity'],
        )
        db.session.add(cart_item)
    db.session.commit()

    ## SEED FAVORITES
    favorite_list = [
        {'user_id': 1, 'product_id': 1},
        {'user_id': 2, 'product_id': 2},
        {'user_id': 3, 'product_id': 3},
    ]

    for favorite_data in favorite_list:
        favorite = Favorite(
            user_id=favorite_data['user_id'],
            product_id=favorite_data['product_id'],
        )
        db.session.add(favorite)
    db.session.commit()

    ## SEED PURCHASES
    purchase_list = [
        {'user_id': 1, 'product_id': 1, 'quantity': 1, 'price_at_purchase': 999.00},
        {'user_id': 2, 'product_id': 2, 'quantity': 1, 'price_at_purchase': 1999.00},
        {'user_id': 3, 'product_id': 3, 'quantity': 1, 'price_at_purchase': 399.00},
    ]

    for purchase_data in purchase_list:
        purchase = Purchase(
            user_id=purchase_data['user_id'],
            product_id=purchase_data['product_id'],
            quantity=purchase_data['quantity'],
            price_at_purchase=purchase_data['price_at_purchase'],
        )
        db.session.add(purchase)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seeder():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM products"))
        db.session.execute(text("DELETE FROM reviews"))
        db.session.execute(text("DELETE FROM carts"))
        db.session.execute(text("DELETE FROM cart_items"))
        db.session.execute(text("DELETE FROM favorites"))
        db.session.execute(text("DELETE FROM images"))
        db.session.execute(text("DELETE FROM purchases"))

    db.session.commit()
