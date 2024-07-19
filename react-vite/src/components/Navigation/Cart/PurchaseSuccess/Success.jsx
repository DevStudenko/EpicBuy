import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Success.module.css';

const Success = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      fetch('/api/purchases/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message !== 'Purchase successful') {
            alert('Failed to clear cart items.');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [searchParams]);

  return (
    <div className={styles.successContainer}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <Link to="/" className={styles.homeButton}>Go to Home</Link>
    </div>
  );
};

export default Success;
