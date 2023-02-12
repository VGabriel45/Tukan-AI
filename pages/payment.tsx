import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { log } from "console";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Payment = () => {
  // collect data from the user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  // stripe items
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setName(user.username);
    setEmail(user.email);
    getProductPriceId();
  }, []);

  const getProductPriceId = async () => {
    const response = await axios.get(
      `http://localhost:3001/stripe/listProducts`
    );
    setPriceId(response.data.data[0].default_price);
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setProcessing(true);

    try {
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name,
          email,
        },
      });

      const payload = {
        paymentMethod: paymentMethod?.paymentMethod?.id,
        name,
        email,
        priceId,
      };
      const response = await axios.post(
        `http://localhost:3001/stripe/createSubscription`,
        payload
      );

      const confirmPayment = await stripe?.confirmCardPayment(
        response.data.clientSecret
      );

      if (confirmPayment?.error) {
        setError(`Payment failed ${confirmPayment.error.message}`);
        setProcessing(false);
      } else {
        setProcessing(false);
        setSucceeded(true);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
};

export default Payment;
