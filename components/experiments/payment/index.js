import * as S from "./styles";
import { useEffect, useState } from "react";

import axios from "axios";

//stripe
import getStripe from "utils/lib/getStripe";
import { HEADER, TEXT, LANGUAGE_CODES } from "./data";

const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function SafariAR() {
  //payment request
  async function handlePayment() {
    const stripe = await getStripe();

    let price = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID : process.env.NEXT_PUBLIC_STRIPE_TEST_PRICE_ID;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "/experiments/payment-completed",
      cancelUrl: "https://www.google.com",
    });

    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleTranslate();
  }, []);

  //translate

  async function handleTranslate() {
    const language = getRandomFromArray(LANGUAGE_CODES);
    const res = await axios.post(
      "/api/google/translate",
      { text: "Hello", target: language },
      {
        responseType: "string",
      }
    );
    console.log(res);
  }

  return (
    <S.Container>
      <S.Inner>
        <S.Header>It seems like you owe JY 5 pound.</S.Header>
        <S.Text>
          Pay 5 pounds securely and simply, <br /> and let go of all the hesitation.
        </S.Text>
        <S.PayButton onClick={handlePayment}>Pay Now</S.PayButton>
      </S.Inner>
    </S.Container>
  );
}
