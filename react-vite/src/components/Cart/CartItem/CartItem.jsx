import { useDispatch } from "react-redux"
import { removeCartItemThunk } from "../../../redux/cart";
import styles from "./CartItem.module.css";
import { IoStar } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import { getProductsArray } from "../../../redux/products";

const CartItem = ({ id, name, preview_img_url, price, quantity, avgRating }) => {
    const dispatch = useDispatch();
    // const products = useSelector(getProductsArray);
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!products: ', products)
    // const product = products.filter((product) => product.id === product_id);
    // console.log('!!!!!!!!!!!!!!!!!!!!product: ', product);
    // const avgRating = product.avgRating;

    const removeFromCart = () => {
        dispatch(removeCartItemThunk(id));
    }

    return (
        <main className={styles.main}>
            <div className={styles.items__container}>
                <div
                    className={styles.item}
                    title={name}
                >
                    <img src={preview_img_url} />
                    <div className={styles.product__info}>
                        <div className={styles.item__name}>{name}</div>
                        <div className={styles.item__price}>${price}</div>
                        <div className={styles.item__rating}><IoStar className={styles.item__starIcon} />{avgRating ? avgRating.toFixed(1) : "New"}</div>
                        <div className={styles.item__quantity}>quantity: {quantity}</div>
                    </div>
                    <button onClick={removeFromCart} className={styles.item__remove}>Remove from Basket</button>
                </div>
            </div>
        </main>
    )
}

export default CartItem
