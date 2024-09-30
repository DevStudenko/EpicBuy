import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCartItemsArray } from '../../../redux/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
  const items = useSelector(getCartItemsArray);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      const formattedItems = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));

      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: formattedItems }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else if (data.error) {
        alert(data.error);
      }
    };

    createPaymentIntent();
  }, [items]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <h1>Checkout</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading checkout...</p>
      )}
    </div>
  );
};

export default Checkout;
