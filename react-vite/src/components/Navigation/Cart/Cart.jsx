import { useSelector, useDispatch } from 'react-redux';
import { getCartItemsArray, getAllCartItemsThunk } from '../../../redux/cart';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../Checkout';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Cart = () => {
  const dispatch = useDispatch();
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
  }, [dispatch]);

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkout}>
        <div className={styles.checkout__title}>
          <h1>Checkout</h1>
        </div>
        <div className={styles.checkout__items}>
          {items.length > 0 ? (
            items.map(
              ({
                id,
                quantity,
                avg_rating,
                product: { name, preview_img_url, price },
              }) => (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  preview_img_url={preview_img_url}
                  price={price}
                  quantity={quantity}
                  avgRating={avg_rating}
                />
              )
            )
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
          {/* Render the CheckoutForm within the Elements provider */}
          <Elements stripe={stripePromise}>
            <CheckoutForm items={items} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Cart;
