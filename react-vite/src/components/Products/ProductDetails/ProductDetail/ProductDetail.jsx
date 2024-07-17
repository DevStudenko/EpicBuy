import { useDispatch, useSelector } from 'react-redux';
import { addItemToCartThunk } from '../../../../redux/cart';
import { addFavoriteThunk, removeFavoriteThunk, getFavoritesArray } from '../../../../redux/favorites';
import { getPurchasesArray } from '../../../../redux/purchases';
import { getReviewsArray } from '../../../../redux/reviews';
import OpenModalButton from '../../../OpenModalButton';
import LoginFormModal from '../../../Auth/LoginFormModal';
import CreateReview from '../../../Reviews/CreateReview';
import AverageStarRating from '../../../Reviews/StarRating/AverageStarRating';
import styles from './ProductDetail.module.css';
import { getPurchasesThunk } from '../../../../redux/purchases';
import { useEffect } from 'react';

const ProductDetail = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userFavorites = useSelector(getFavoritesArray);
    const reviews = useSelector(getReviewsArray);
    const purchases = useSelector(getPurchasesArray);

    const { id, name, description, price, preview_img_url, avgRating } = product;

    const isFavorite = userFavorites.some(favorite => favorite.product_id === id);
    const hasPurchased = purchases?.some(purchase => purchase.product_id === id);
    const productReviews = reviews.filter(review => review.product_id === id);
    const userReview = productReviews.find(review => review.user_id === user?.id);

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [dispatch])

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
                    <AverageStarRating rating={avgRating} />
                </div>
                <div className={styles.productPrice}>${price}</div>
                {user ? (
                    <button onClick={handleAddToCart} className={styles.addToCartButton}>Add to Basket</button>
                ) : (
                    <div className={styles.signInPrompt}>
                        Please sign in to purchase this product.{' '}
                        <OpenModalButton
                            buttonText="Sign In"
                            className={styles.signInButton}
                            modalComponent={<LoginFormModal />}
                        />
                    </div>
                )}
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
