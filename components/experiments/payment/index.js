import * as S from "./styles";
import { useEffect, useState } from "react";

//stripe
import getStripe from "utils/lib/getStripe";
import { loadStripe } from "@stripe/stripe-js";

export default function SafariAR() {
  //payment request
  async function handlePayment() {
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "https://www.google.com",
      cancelUrl: "https://www.google.com",
    });

    if (error) {
      console.log(error);
    }
  }
  return (
    <S.Container>
      <S.PayButton onClick={handlePayment}>pay</S.PayButton>
    </S.Container>
  );
}
