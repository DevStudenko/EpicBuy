import { useDispatch } from "react-redux"
import { removeCartItemThunk } from "../../../redux/cart";

const CartItem = ({ id, name, preview_img_url, price }) => {
    const dispatch = useDispatch();

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
                    </div>
                    <button onClick={removeFromCart} className={styles.item__remove}>Remove from Basket</button>
                </div>
            </div>
        </main>
    )
}

export default CartItem
