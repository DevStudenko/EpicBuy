import { Link } from 'react-router-dom';
import styles from './Success.module.css';

const Success = () => {
  return (
    <div className={styles.successContainer}>
      <h1>Payment Successful!</h1>
      <p>Your order has been placed successfully.Thank you for your purchase.</p>
      <Link to="/" className={styles.homeButton}>Go to Home</Link>
    </div>
  );
};

export default Success;
