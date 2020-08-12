import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";

const stripeKey =
  "pk_test_51HF2pIHVEY85bCgtP9G9ccluezSoeHNuJC3FPDu8UioWSDO19Pq8PlXJfPZGTuELEuuNzgzkKiO7wWxG9K71uuBM001RM4Jkq6";
const stripePromise = loadStripe(stripeKey);

export default function PaymentPage(props) {
  const [error, setError] = useState(null);
  function handleToken(token, addresses) {
    console.log(token, addresses);
  }
  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeCheckout
          stripeKey={stripeKey}
          token={handleToken}
          billingAddress
          shippingAddress
          amount={props.amount * 100}
        >
          <input
            type="submit"
            disabled={props.disabled}
            value="Pay"
            className="btn btn-primary"
            style={{ width: 100 }}
          />
        </StripeCheckout>
      </Elements>
    </div>
  );
}
