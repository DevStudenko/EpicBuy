import { useCallback } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_KEY;
const stripePromise = loadStripe(publishableKey);

const Checkout = ({ items }) => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/purchases/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items })  // Pass the items from props
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [items]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Checkout;
