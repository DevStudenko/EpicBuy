import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { IoStar } from "react-icons/io5";
import { useState } from "react";
import { updateCartItemThunk, removeCartItemThunk } from "../../../redux/cart";

const CartItem = ({ id, name, preview_img_url, price, quantity, avgRating }) => {
    const dispatch = useDispatch();
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const updateQuantity = (e) => {
        const newQuantity = parseInt(e.target.value);
        setCurrentQuantity(newQuantity);
        if (newQuantity < 1) {
            dispatch(removeCartItemThunk(id));
        } else {
            dispatch(updateCartItemThunk(id, newQuantity));
        }
    };

    const removeFromCart = () => {
        dispatch(removeCartItemThunk(id));
    };

    const qtyOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <main className={styles.main}>
            <div className={styles.items__container}>
                <div
                    className={styles.item}
                    title={name}
                >
                    <img src={preview_img_url} alt={name} />
                    <div className={styles.product__info}>
                        <div className={styles.item__name}>{name}</div>
                        <div className={styles.item__price}>${price}</div>
                        <div className={styles.item__rating}>
                            <IoStar className={styles.item__starIcon} />
                            {avgRating ? avgRating.toFixed(1) : "New"}
                        </div>
                        <div className={styles.item__quantity}>
                            Quantity:
                            <select value={currentQuantity} onChange={updateQuantity}>
                                {qtyOptions.map((val) => (
                                    <option value={val} key={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={removeFromCart} className={styles.item__remove}>Delete</button>
                </div>
            </div>
        </main>
    );
};

export default CartItem;
