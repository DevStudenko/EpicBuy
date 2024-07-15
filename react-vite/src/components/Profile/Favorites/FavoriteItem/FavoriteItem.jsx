import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFavoriteThunk } from '../../../../redux/favorites';
import AverageStarRating from '../../../Reviews/StarRating/AverageStarRating';
import { getProductsArray } from '../../../../redux/products';

import styles from './FavoriteItem.module.css';

const FavoriteItem = ({ favorite }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(getProductsArray);
    const favoriteProduct = products.find(product => product.id === favorite.product_id);




    const handleRemoveFromWishlist = () => {
        dispatch(removeFavoriteThunk(favorite.id));
    };

    const handleNavigate = () => {
        navigate(`/products/${favorite.product_id}`);
    };

    return (
        <div className={styles.favoriteItem} onClick={handleNavigate}>
            <img src={favoriteProduct?.preview_img_url} alt={favoriteProduct?.name} className={styles.productImage} />
            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{favoriteProduct?.name}</h2>
                <AverageStarRating rating={favoriteProduct?.avgRating} />
                <p className={styles.productPrice}>${favoriteProduct?.price}</p>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the navigation
                    handleRemoveFromWishlist();
                }}
                className={styles.removeButton}
            >
                Remove from Wishlist
            </button>
        </div>
    );
};

export default FavoriteItem;
