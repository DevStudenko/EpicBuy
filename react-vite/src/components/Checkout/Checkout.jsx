// import * as React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

const publishableKey = process.env.STRIPE_KEY
const stripePromise = loadStripe(publishableKey);

const Checkout = () => {
    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        return fetch("/create-checkout-session", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data.clientSecret);
      }, []);

      const options = {fetchClientSecret};

      return (
        <div id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )
}

export default Checkout
