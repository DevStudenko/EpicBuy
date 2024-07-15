import { useSelector, useDispatch } from 'react-redux';
import { getCartItemsArray } from '../../../redux/cart';
import CartItem from "./CartItem";
import { purchaseItemsThunk } from '../../../redux/purchases';
import { deleteAllCartItemsThunk } from '../../../redux/cart';
import { useNavigate } from 'react-router-dom';
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(getCartItemsArray);

  const handlePurchase = async () => {
    const response = await dispatch(purchaseItemsThunk(items));
    if (response.errors) {
      alert(response.errors);
    } else {
      dispatch(deleteAllCartItemsThunk());
      alert('Thank you for your purchase!');
      navigate('/');
    }
  };

  return (
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
      <div className={styles.checkout__button}>
        <button
          onClick={handlePurchase}
          className={styles.purchaseButton}
          disabled={items.length === 0}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default Cart;
