// Cart.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItemsArray, getAllCartItemsThunk } from '../../../redux/cart';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const items = useSelector(getCartItemsArray);
  const [subtotal, setSubtotal] = useState(0);
  const tax = 'calculated at checkout';
  const total = subtotal;

  useEffect(() => {
    dispatch(getAllCartItemsThunk());

    const newSubtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [dispatch, items]);

  const handleCheckout = () => {
    navigate('/checkout'); // Use navigate instead of history.push
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkout}>
        <div className={styles.checkout__title}>
          <h1>Your Cart</h1>
        </div>
        <div className={styles.checkout__items}>
          {items.length > 0 ? (
            items.map(({ id, quantity, product }) => (
              <CartItem
                key={id}
                id={id}
                name={product.name}
                preview_img_url={product.preview_img_url}
                price={product.price}
                quantity={quantity}
                avgRating={product.avg_rating}
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
            onClick={handleCheckout}
            className={styles.purchaseButton}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
