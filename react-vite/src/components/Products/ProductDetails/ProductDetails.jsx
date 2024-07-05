import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsArray } from '../../../redux/products';
import { getReviewsArray } from '../../../redux/reviews';
import Product from '../Product';
import styles from './ProductDetails.module.css';
import { IoStar } from "react-icons/io5";

const ProductDetails = () => {
    const { id } = useParams();
    const productId = parseInt(id);
    const products = useSelector(getProductsArray);
    const reviews = useSelector(getReviewsArray);

    const product = products.find(product => product.id === productId);
    const productReviews = reviews.filter(review => review.product_id === productId);

    if (!product) {
        return <div>Loading...</div>;
    }

    const { name, price, preview_img_url, avgRating } = product;

    return (
        <div className={styles.productDetails}>
            <Product id={id} name={name} price={price} preview_img_url={preview_img_url} avgRating={avgRating} />
            <div className={styles.reviews}>
                <h2>Reviews</h2>
                {productReviews.length > 0 ? (
                    productReviews.map(({ id, username, rating, review }) => (
                        <div key={id} className={styles.review}>
                            <p><strong>{username}</strong>: {review}</p>
                            <p>Rating: <IoStar className={styles.review__starIcon} />{rating ? rating.toFixed(1) : "New"}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
