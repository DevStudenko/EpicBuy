
EpicBuy
Welcome to EpicBuy, your ultimate destination for gaming PCs. Designed for gamers by gamers, EpicBuy provides a seamless and engaging platform to buy, sell, and review gaming PCs. Enjoy features like:

Product Listings: Browse through a wide range of gaming PCs with detailed specifications.
User Reviews and Ratings: Share your experience and read reviews from other gamers.
Shopping Cart: Add your favorite products to the cart and proceed to a secure checkout.
Admin Panel: Manage products, track orders, and ensure the best customer experience.
Why EpicBuy is Perfect for Your Gaming PC Business
EpicBuy is an ideal solution for businesses selling gaming PCs because it provides a comprehensive admin dashboard for managing products. As an admin, you can easily add new products, update existing listings, and manage sales. This streamlined process allows for efficient product management and helps you focus on growing your business.

Live Site
https://epicbuy.onrender.com

Wiki
Technologies Used
<p align="left">
  <img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" width="40" style="margin-right: 10px;">
  <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" width="40" style="margin-right: 10px;">
  <img src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" alt="Redux" width="40" style="margin-right: 10px;">
    <img src=https://user-images.githubusercontent.com/25181517/183423507-c056a6f9-1ba8-4312-a350-19bcbc5a8697.png alt="JavaScript" width="40" style="margin-right: 10px;">
  <img src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" width="40" style="margin-right: 10px;">
  <img src=  https://user-images.githubusercontent.com/25181517/183423775-2276e25d-d43d-4e58-890b-edbc88e915f7.png alt="PostgreSQL" width="40" style="margin-right: 10px;">
  <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" width="40" style="margin-right: 10px;">
  <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" width="40" style="margin-right: 10px;">
  <img src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="GIT" width="40">
  <img src=https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png alt="GIT" width="40">
</p>
Getting Started
To see EpicBuy live, click the link above. To run EpicBuy locally on your machine, follow these steps:

Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/YourUsername/EpicBuy.git
Set up environment and local database:

In the root directory (same folder as app.py), create a .env file and copy the following environment variables into it:

SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://your_postgres_user:your_postgres_password@localhost:5432/epicbuy
FLASK_ENV=development
Still in the root directory, enter the following commands:

bash
Copy code
pipenv install
pipenv shell
flask db migrate
flask db upgrade
flask seed all
pipenv run flask run
(The backend server should now be running on port 5000)
Frontend Setup
In a separate terminal, CD into the react-app folder and run:

bash
Copy code
npm install
npm run dev
(The frontend should now be running on port 5173)
Accessing the Application
In your favorite browser, navigate to http://localhost:5173
(You can confirm the correct port number in the frontend terminal)
Features
User Features
Browse Products: View detailed information about various gaming PCs.
Add to Cart: Easily add products to your shopping cart and proceed to checkout.
Reviews and Ratings: Read and write reviews for products.
Admin Features
Manage Products: Add, update, or delete products from the inventory.
Track Orders: Monitor and manage customer orders and transactions.
Contribution
We welcome contributions to improve EpicBuy. Feel free to fork the repository and submit pull requests.

License
This project is licensed under the MIT License. See the LICENSE file for more information.

Contact
For any inquiries or support, please contact us at support@epicbuy.com
