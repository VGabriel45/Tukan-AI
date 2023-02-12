import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


export const createSubscription = async (name: string, email: string, priceId: string) => {
    const stripe = useStripe();
      const elements = useElements();
      
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name,
          email,
        },
      });

      // call the backend to create subscription
      const response = await fetch("http://localhost:3001/stripe/createSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: paymentMethod?.paymentMethod?.id,
          name,
          email,
          priceId
        }),
      }).then((res) => res.json());

      // confirm the payment by the user
      const confirmPayment = await stripe?.confirmCardPayment(
        response.clientSecret
      );
  };