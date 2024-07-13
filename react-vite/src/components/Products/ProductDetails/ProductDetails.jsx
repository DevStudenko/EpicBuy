import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsArray } from '../../../redux/products';
import { getReviewsArray } from '../../../redux/reviews';
import Product from '../Product';
import ReviewItem from '../../Reviews/ReviewItem';
import styles from './ProductDetails.module.css';
import OpenModalButton from '../../OpenModalButton';
import CreateReview from '../../Reviews/CreateReview';
import { getPurchasesArray } from '../../../redux/purchases';

const ProductDetails = () => {
    const { id } = useParams();
    const productId = parseInt(id);
    const products = useSelector(getProductsArray);
    const reviews = useSelector(getReviewsArray);
    const user = useSelector((state) => state.session.user);
    const purchases = useSelector(getPurchasesArray);

    const product = products.find(product => product.id === productId);
    const productReviews = reviews.filter(review => review.product_id === productId);

    const userReview = productReviews.find(review => review.user_id === user?.id);
    const hasPurchased = purchases.some(purchase => purchase.product_id === productId);

    if (!product) {
        return <div>Loading...</div>;
    }

    const { name, price, preview_img_url, avgRating } = product;

    return (
        <div className={styles.productDetails}>
            <Product id={id} name={name} price={price} preview_img_url={preview_img_url} avgRating={avgRating} />
            <div className={styles.reviews}>
                <h2>Reviews</h2>
                {user && hasPurchased && !userReview && (
                    <OpenModalButton
                        buttonText="Write a Review"
                        modalComponent={<CreateReview productId={productId} />}
                    />
                )}
                {productReviews.length > 0 ? (
                    productReviews.map(review => (
                        <ReviewItem key={review.id} review={review} />
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
