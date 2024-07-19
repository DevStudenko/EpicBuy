import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cancel.module.css';

const Cancel = () => {
  return (
    <div className={styles.cancelContainer}>
      <h1>Payment Canceled</h1>
      <p>Your payment was canceled. If this was a mistake, you can try again.</p>
      <Link to="/cart" className={styles.retryButton}>Go to Cart</Link>
    </div>
  );
};

export default Cancel;
