import { useSelector } from 'react-redux';
import { getCartItemsArray } from '../../redux/cart';
import CartItem from "./CartItem";

import styles from "./Cart.module.css"


const Cart = () => {
  const items = useSelector(getCartItemsArray);

  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__title}>
        <h1>Checkout</h1>
      </div>
      {items.map(({ id, quantity, avg_rating, product: { name, preview_img_url, price } }) => (
        <CartItem
          key={id}
          id={id}
          name={name}
          preview_img_url={preview_img_url}
          price={price}
          quantity={quantity}
          avgRating={avg_rating}
        />
      ))}
    </div>
  )

}

export default Cart
