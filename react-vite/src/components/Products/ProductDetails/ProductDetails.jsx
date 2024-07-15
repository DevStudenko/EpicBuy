import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsArray, getProductByIdThunk } from '../../../redux/products';
import { getReviewsArray } from '../../../redux/reviews';
import { getAllReviewsThunk } from '../../../redux/reviews';
import ReviewItem from '../../Reviews/ReviewItem';
import ProductDetail from './ProductDetail';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
    const { id } = useParams();
    const productId = parseInt(id);
    const dispatch = useDispatch();
    const products = useSelector(getProductsArray);
    const reviews = useSelector(getReviewsArray);

    const product = products.find(product => product.id === productId);
    const productReviews = reviews.filter(review => review.product_id === productId);


    useEffect(() => {
        if (!product) {
            dispatch(getProductByIdThunk(productId));
        }
        if (!productReviews.length) {
            dispatch(getAllReviewsThunk());
        }
    }, [productId, product, dispatch, productReviews]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.productDetails}>
            <ProductDetail product={product} />
            <div className={styles.reviews}>
                <h2>Reviews</h2>
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
};

export default ProductDetails;
