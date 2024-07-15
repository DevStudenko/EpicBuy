import { useDispatch, useSelector } from "react-redux";
import { addItemToCartThunk } from "../../redux/cart";
import { Link } from "react-router-dom";
import AverageStarRating from "../Reviews/StarRating/AverageStarRating";
import styles from './Product.module.css';

const Product = ({ id, name, price, avgRating, preview_img_url }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const addToCart = (event) => {
        event.preventDefault();
        const item = {
            product_id: id,
            avg_rating: avgRating
        }
        dispatch(addItemToCartThunk(item));
    }

    return (
        <main className={styles.main}>
            <Link to={`/products/${id}`} className={styles.product__container}>
                <div
                    className={styles.product}
                    title={name}
                >
                    <img src={preview_img_url} alt={`${name}`} />
                    <div className={styles.product__info}>
                        <div className={styles.product__name}>{name}</div>
                        <div className={styles.product__rating}>
                            {avgRating > 0 ? <AverageStarRating rating={avgRating} /> : "New"}
                        </div>
                        <div className={styles.product__price}>${price}</div>
                    </div>
                    {user && ( // Show Add to Basket button if user is logged in
                        <button onClick={addToCart} className={styles.product__add}>Add to Basket</button>
                    )}
                </div>
            </Link>
        </main>
    );
}

export default Product;
