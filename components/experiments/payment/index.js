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

    let price = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID : process.env.NEXT_PUBLIC_STRIPE_TEST_ID;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "https://operating-as-usual.vercel.app/experiments/payment-completed",
      cancelUrl: "https://operating-as-usual.vercel.app/experiments/payment-completed",
    });

    if (error) {
      console.log(error);
    }
  }

  //language-translation

  const [language, setLanguage] = useState("ja");
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const language = getRandomFromArray(LANGUAGE_CODES);
      setLanguage(language);
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    languagHandler(language);
  }, [language]);

  async function languagHandler(language) {
    const header = await handleTranslate(HEADER, language);
    const text = await handleTranslate(TEXT, language);

    setHeader(header);
    setText(text);
  }

  //translate

  async function handleTranslate(text, target) {
    const language = getRandomFromArray(LANGUAGE_CODES);
    const res = await axios.post(
      "/api/google/translate",
      { text, target },
      {
        responseType: "string",
      }
    );
    return res.data;
  }

  return (
    <S.Container>
      <S.Inner>
        <S.Header>{header}</S.Header>
        <S.Text>{text}</S.Text>
        <S.PayButton onClick={handlePayment}>Pay Now</S.PayButton>
      </S.Inner>
    </S.Container>
  );
}
