import { useSelector, useDispatch } from 'react-redux';
import { getCartItemsArray } from '../../../redux/cart';
import CartItem from "./CartItem";
import { purchaseItemsThunk } from '../../../redux/purchases';
import styles from "./Cart.module.css";
import { useState, useEffect } from 'react';
import { getAllCartItemsThunk } from '../../../redux/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(getCartItemsArray);
  const [subtotal, setSubtotal] = useState(0);
  const tax = "calculated at checkout"
  const total = subtotal;

  useEffect(() => {
    if (!items || !items.length) {
      dispatch(getAllCartItemsThunk())
    }
    const newSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, [items, dispatch]);

  const handlePurchase = async () => {
    const response = await dispatch(purchaseItemsThunk(items));
    if (response.errors) {
      alert(response.errors);
    } else {
      window.location.href = response.url;  // Redirect to Stripe Checkout
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkout}>
        <div className={styles.checkout__title}>
          <h1>Checkout</h1>
        </div>
        <div className={styles.checkout__items}>
          {items.length > 0 ? (
            items.map(({ id, quantity, avg_rating, product: { name, preview_img_url, price } }) => (
              <CartItem
                key={id}
                id={id}
                name={name}
                preview_img_url={preview_img_url}
                price={price}
                quantity={quantity}
                avgRating={avg_rating}
              />
            ))
          ) : (
            <p className={styles.emptyCartMessage}>Your cart is empty.</p>
          )}
        </div>
        <div className={styles.checkout__summary}>
          <div className={styles.checkoutDetails}>
            <div className={styles.summarySubtotal}>
              <div className={styles.summaryItem}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Tax:</span>
                <span>({tax})</span>
              </div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.total}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handlePurchase}
            className={styles.purchaseButton}
            disabled={items.length === 0}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
