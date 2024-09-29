import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Map items to the format expected by the backend
    const formattedItems = items.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    // Create PaymentIntent on component mount
    fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: formattedItems }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else if (data.message) {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error('Error creating payment intent:', err);
        setError('Failed to create payment intent.');
      });
  }, [items]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        // Payment succeeded
        console.log('Payment succeeded:', paymentIntent);
        setProcessing(false);
      
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || processing || !clientSecret}>
        {processing ? 'Processing…' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;
