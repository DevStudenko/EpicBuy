from app.models import db, User, Product, Review, Cart, CartItem, Favorite, Image, Purchase, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash


def create_seeder():
    ## SEED USERS
    user_list = [
        {'username': 'Demo', 'email': 'demo@aa.io', 'password': generate_password_hash("password"), 'profile_img_url': ""},
        {'username': 'marnie', 'email': 'marnie@aa.io', 'password': generate_password_hash("password"), 'profile_img_url': ""},
        {'username': 'john', 'email': 'john@aa.io', 'password': generate_password_hash("password"), 'profile_img_url': ""},
        {'username': 'admin', 'email': 'admin@aa.io', 'password': generate_password_hash("admin"), 'is_admin': True, 'profile_img_url': ""}
    ]

    for user_data in user_list:
        user = User(
            username=user_data['username'],
            email=user_data['email'],
            hashed_password=user_data['password'],
            is_admin=user_data.get('is_admin', False),
            profile_img_url=user_data['profile_img_url']
        )
        db.session.add(user)
    db.session.commit()

    ## SEED PRODUCTS
    product_list = [
        {'owner_id': 3, 'name': 'Zenith Blaze', 'description': 'Windows 11 Home AMD Ryzen™ 9 7900X CPU MSI PRO B650-P WIFI 32GB DDR5-6000MHz RAM GeForce RTX 4070 Ti SUPER - 16GB 1TB WD M.2 NVMe SSD', 'price': 2199, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/25755/gaming-pc-01-H7-Flow-Black-main-solo-400.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Inferno Sentinel', 'description': 'Windows 11 Home AMD Ryzen™ 5 7600 CPU ASUS Prime B650M-A AX6 16GB DDR5-5200MHz RAM GeForce RTX 3050 - 6GB 1TB WD M.2 NVMe SSD', 'price': 1399, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/27658/gaming-pc-01-Scale-main-400-solo-(2).png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Quantum Fury', 'description': 'Windows 11 Home Intel® Core™ i7-14700KF CPU ASUS Z790 GAMING WiFi 7 32GB DDR5-6000MHz RAM GeForce RTX 4060 Ti - 8GB 1TB WD M.2 NVMe SSD', 'price': 1799, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/27211/gaming-pc-01-Trace7Mesh-main-400-solo-.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Aurora Titan', 'description': 'Windows 11 Home AMD Ryzen™ 7 7800X3D CPU ASUS Prime B650M-A AX6 32GB DDR5-6000MHz RAM GeForce RTX 4070 SUPER - 12GB 1TB WD M.2 NVMe SSD', 'price': 2099, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/26900/gaming-pc-01-Lancool-216-white-main-400-solo.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Stellar Surge', 'description': 'Windows 11 Home AMD Ryzen™ 9 7900X CPU MSI PRO B650-P WIFI 32GB DDR5-6000MHz RAM AMD Radeon RX 7900 XTX - 24GB 2TB WD M.2 NVMe SSD', 'price': 2499, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/27550/gaming-pc-01-iBP-Y70Black-MainSolo-400.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Hyperion Vanguard', 'description': 'Windows 11 Home AMD Ryzen™ 9 7950X CPU ASUS PRIME X670-P WIFI 32GB DDR5-6000MHz RAM GeForce RTX 4090 - 24GB 2TB WD M.2 NVMe SSD', 'price': 3199, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/27050/gaming-pc-01-H9-Elite-white-main-400-solo.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Quantum Surge', 'description': 'Windows 11 Home Intel Core i5-14400F CPU ASUS Z790 GAMING WiFi 7 32GB DDR5-6000MHz RAM GeForce RTX 3050 - 6GB 1TB WD M.2 NVMe SSD', 'price': 1499, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/17462/SnowblindS-01-400-5.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Cosmic Raptor', 'description': 'Windows 11 Home AMD Ryzen™ 9 7950X CPU MSI PRO B650-P WIFI 32GB DDR5-6000MHz RAM GeForce RTX 4080 SUPER - 16GB 2TB WD M.2 NVMe SSD', 'price': 2799, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/27052/gaming-pc-01-H9-Elite-black-main-400-solo.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Phantom Vortex', 'description': 'Windows 11 Home Intel® Core™ i7-14700KF CPU ASUS Z790 GAMING WiFi 7 32GB DDR5-6000MHz RAM GeForce RTX 4070 Ti SUPER - 16GB 2TB WD M.2 NVMe SSD', 'price': 2399, 'preview_img_url': 'https://content.ibuypower.com/Images/Components/25119/gaming-pc-01-Y60-MainSolo-400.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Nebula Striker', 'description': 'Windows 11 Home Intel Core i5-14400F - 16GB Memory - NVIDIA GeForce RTX 4060 8GB - 1TB SSD - Black', 'price': 1599, 'preview_img_url': 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6575/6575072_sd.jpg', 'quantity': 30},
        {'owner_id': 3, 'name': 'Inferno Pulse', 'description': 'CHASSIS: Black PROCESSOR: AMD Ryzen™ 5 5600G 3.9 - 4.4GHz 6 Cores GRAPHICS CARD TYPE: AMD Radeon™ GRAPHICS CARD: Integrated Radeon RX Vega Graphics* MOTHERBOARD: A520M Motherboard POWER SUPPLY: MSI MPG 750W GOLD DDR4 DIMM MEMORY: 16GB DDR4 3600MHz T-Force Delta RGB (2x 8GB) OPERATING SYSTEM DRIVE: 500GB NVME SSD GEN 3 OPERATING SYSTEM: Windows 11 Home', 'price': 1099, 'preview_img_url': 'https://xoticpc.com/cdn/shop/files/GX13REDEYE05.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Stellar Titan', 'description': 'WINDOWS 11 HOME + USB RECOVERY AMD RYZEN 5 5600 6-CORE NVIDIA GeForce RTX 4060 8GB 16GB DDR4 Dual Channel 1TB NVMe M.2 Cooler Master Hyper 212 Evo CM MasterFans RGB Cooler Master TD500 RGB 750W ATX 80 Plus Gold MSI B550 Series | AMD Wireless 802.11ax', 'price': 1242, 'preview_img_url': 'https://www.buildredux.com/cdn/shop/files/TD500-1-Trans_x480.png', 'quantity': 30},
        {'owner_id': 3, 'name': 'Galactic Fury', 'description': 'PROCESSOR: Intel® Core™ i9-14900K 3.2 - 6.0GHz 24 Cores GRAPHICS CARD: ASUS ROG Strix GeForce RTX™ 4090 24GB GDDR6X MOTHERBOARD: ASUS ROG MAXIMUS Z790 DARK HERO POWER SUPPLY: ASUS 1200W THOR PLATINUM MEMORY: T-Force Delta RGB Black 32GB DDR5 6000MHz (2X 16GB) OPERATING SYSTEM DRIVE: 2TB NVME SSD GEN 4 OPERATING SYSTEM: Windows 11 Home COOLING: ASUS ROG RYUJIN 360 AIO Liquid Cooler', 'price': 4299, 'preview_img_url': 'https://xoticpc.com/cdn/shop/files/HDMS.png', 'quantity': 30}
    ]

    for product_data in product_list:
        product = Product(
            owner_id=product_data['owner_id'],
            name=product_data['name'],
            description=product_data['description'],
            price=product_data['price'],
            preview_img_url=product_data['preview_img_url'],
            quantity=product_data['quantity']
        )
        db.session.add(product)
    db.session.commit()

    ## SEED IMAGES
    image_list = [
        {'product_id': 1, 'img_url': 'https://images.unsplash.com/photo-1632582593957-e28f748ba619'},
        {'product_id': 1, 'img_url': 'https://images.unsplash.com/photo-1647503380147-e075b24f4cbe'},
        {'product_id': 2, 'img_url': 'https://images.unsplash.com/photo-1580522154071-c6ca47a859ad'},
        {'product_id': 2, 'img_url': 'https://images.unsplash.com/photo-1542393545-10f5cde2c810'},
        {'product_id': 3, 'img_url': 'https://images.unsplash.com/photo-1542541864-4abf21a55761'}
    ]

    for image_data in image_list:
        image = Image(
            product_id=image_data['product_id'],
            img_url=image_data['img_url']
        )
        db.session.add(image)
    db.session.commit()

    ## SEED REVIEWS
    review_list = [
        {'user_id': 1, 'product_id': 1, 'review': 'Great PC!', 'rating': 5},
        {'user_id': 2, 'product_id': 2, 'review': 'Loving my new setup', 'rating': 4},
        {'user_id': 3, 'product_id': 3, 'review': 'Very powerful and efficient', 'rating': 5}
    ]

    for review_data in review_list:
        review = Review(
            user_id=review_data['user_id'],
            product_id=review_data['product_id'],
            review=review_data['review'],
            rating=review_data['rating']
        )
        db.session.add(review)
    db.session.commit()

    ## SEED CARTS AND CART ITEMS
    cart_list = [
        {'user_id': 1},
        {'user_id': 2},
        {'user_id': 3}
    ]

    for cart_data in cart_list:
        cart = Cart(
            user_id=cart_data['user_id']
        )
        db.session.add(cart)
    db.session.commit()

    cart_item_list = [
        {'cart_id': 1, 'product_id': 1, 'quantity': 1},
        {'cart_id': 2, 'product_id': 2, 'quantity': 1},
        {'cart_id': 3, 'product_id': 3, 'quantity': 1}
    ]

    for cart_item_data in cart_item_list:
        cart_item = CartItem(
            cart_id=cart_item_data['cart_id'],
            product_id=cart_item_data['product_id'],
            quantity=cart_item_data['quantity']
        )
        db.session.add(cart_item)
    db.session.commit()

    ## SEED FAVORITES
    favorite_list = [
        {'user_id': 1, 'product_id': 1},
        {'user_id': 2, 'product_id': 2},
        {'user_id': 3, 'product_id': 3}
    ]

    for favorite_data in favorite_list:
        favorite = Favorite(
            user_id=favorite_data['user_id'],
            product_id=favorite_data['product_id']
        )
        db.session.add(favorite)
    db.session.commit()

    ## SEED PURCHASES
    purchase_list = [
        {'user_id': 1, 'product_id': 1, 'quantity': 1, 'price_at_purchase': 2199.00},
        {'user_id': 2, 'product_id': 2, 'quantity': 1, 'price_at_purchase': 1949.00},
        {'user_id': 3, 'product_id': 3, 'quantity': 1, 'price_at_purchase': 1799.00}
    ]

    for purchase_data in purchase_list:
        purchase = Purchase(
            user_id=purchase_data['user_id'],
            product_id=purchase_data['product_id'],
            quantity=purchase_data['quantity'],
            price_at_purchase=purchase_data['price_at_purchase']
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
