import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

PaymentPage.propTypes = {
  amount: PropTypes.number,
  disabled: PropTypes.bool,
  product_id: PropTypes.string,
};
const stripeKey =
  "pk_test_51HF2pIHVEY85bCgtP9G9ccluezSoeHNuJC3FPDu8UioWSDO19Pq8PlXJfPZGTuELEuuNzgzkKiO7wWxG9K71uuBM001RM4Jkq6";
const stripePromise = loadStripe(stripeKey);

export default function PaymentPage(props) {
  let history = useHistory();
  var datetoday = new Date();
  var today = datetoday.toLocaleDateString("en-US");

  var datetomorrow = new Date(datetoday);
  datetomorrow.setDate(datetoday.getDate() + 1);
  var tomorrow = datetomorrow.toLocaleDateString("en-US");

  function handleToken(token, addresses) {
    const newOrder = {
      payment_status: "success",
      product_id: props.product_id,
      order_status: 0,
      total_price: props.amount,
      order_quantity: props.order_quantity,
      order_date: today,
    };

    axios
      .post("http://localhost:4000/inventory/checkout", newOrder)
      .then((res) => {
        history.push({ pathname: "/purchaseorders", toastVisibility: true });
      });
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
