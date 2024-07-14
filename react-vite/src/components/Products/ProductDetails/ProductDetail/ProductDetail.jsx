import { useDispatch, useSelector } from 'react-redux';
import { addItemToCartThunk } from '../../../../redux/cart';
import { addFavoriteThunk, removeFavoriteThunk, getFavoritesArray } from '../../../../redux/favorites';
import { getPurchasesArray } from '../../../../redux/purchases';
import { getReviewsArray } from '../../../../redux/reviews';
import OpenModalButton from '../../../OpenModalButton';
import CreateReview from '../../../Reviews/CreateReview';
import styles from './ProductDetail.module.css';

const ProductDetail = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userFavorites = useSelector(getFavoritesArray);
    const reviews = useSelector(getReviewsArray);
    const { id, name, description, price, preview_img_url, avgRating } = product;
    const isFavorite = userFavorites.some(favorite => favorite.product_id === id);
    const purchases = useSelector(getPurchasesArray);
    const hasPurchased = purchases?.some(purchase => purchase.product_id === id);
    const productReviews = reviews.filter(review => review.product_id === id);
    const userReview = productReviews.find(review => review.user_id === user?.id);

    const handleAddToCart = () => {
        const item = {
            product_id: id,
            avg_rating: avgRating,
        };
        dispatch(addItemToCartThunk(item));
    };

    const handleAddToWishlist = () => {
        dispatch(addFavoriteThunk(id));
    };

    const handleRemoveFromWishlist = () => {
        const favorite = userFavorites.find(favorite => favorite.product_id === id);
        if (favorite) {
            dispatch(removeFavoriteThunk(favorite.id));
        }
    };

    return (
        <div className={styles.product}>
            <img src={preview_img_url} alt={`${name}`} className={styles.productImage} />
            <div className={styles.productInfo}>
                <h1 className={styles.productName}>{name}</h1>
                <p className={styles.productDescription}>{description}</p>
                <div className={styles.productRating}>
                    Rating: {avgRating ? avgRating.toFixed(1) : "New"}
                </div>
                <div className={styles.productPrice}>${price}</div>
                <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to Basket</button>
                {user && (
                    isFavorite ? (
                        <button onClick={handleRemoveFromWishlist} className={styles.removeFromWishlistButton}>
                            Remove from Wishlist
                        </button>
                    ) : (
                        <button onClick={handleAddToWishlist} className={styles.addToWishlistButton}>
                            Add to Wishlist
                        </button>
                    )
                )}
                {user && hasPurchased && !userReview && (
                    <OpenModalButton
                        buttonText="Add a Review"
                        modalComponent={<CreateReview productId={id} />}
                        className={styles.addReviewButton}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
