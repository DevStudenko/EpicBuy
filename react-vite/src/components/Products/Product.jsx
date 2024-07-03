import { IoStar } from "react-icons/io5";
import styles from './Product.module.css'
import { useDispatch } from "react-redux";
import { addItemToCartThunk } from "../../redux/cart";

const Product = ({ id, name, price, avgRating, preview_img_url }) => {
    const dispatch = useDispatch();
    const addToCart = () => {
        const item = {
            product_id: id
        }
        dispatch(addItemToCartThunk(item))
    }

    return (
        <main className={styles.main}>
            <div className={styles.products__container}>
                <div
                    className={styles.product}
                    title={name}
                >
                    <img src={preview_img_url} />
                    <div className={styles.product__info}>
                        <div className={styles.product__name}>{name}</div>
                        <div className={styles.product__price}>${price}</div>
                        <div className={styles.product__rating}><IoStar className={styles.product__starIcon} />{avgRating ? avgRating.toFixed(1) : "New"}</div>
                    </div>
                    <button onClick={addToCart} className={styles.product__add}>Add to Basket</button>
                </div>
            </div>
        </main>
    );
}

export default Product
