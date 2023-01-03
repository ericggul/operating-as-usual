import * as S from "./styles";
import { useEffect, useState } from "react";

import axios from "axios";

//stripe
import getStripe from "utils/lib/getStripe";

const LANGUAGE_CODES = [
  "af",
  "sq",
  "am",
  "ar",
  "hy",
  "az",
  "eu",
  "be",
  "bn",
  "bs",
  "bg",
  "ca",
  "ceb",
  "ny",
  "zh",
  "zh-TW",
  "co",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "tl",
  "fi",
  "fr",
  "fy",
  "gl",
  "ka",
  "de",
  "el",
  "gu",
  "ht",
  "ha",
  "haw",
  "iw",
  "he",
  "hi",
  "hmn",
  "hu",
  "is",
  "ig",
  "id",
  "ga",
  "it",
  "ja",
  "jw",
  "kn",
  "kk",
  "km",
  "rw",
  "ko",
  "ku",
  "ky",
  "lo",
  "la",
  "lv",
  "lt",
  "lb",
  "mk",
  "mg",
  "ms",
  "ml",
  "mt",
  "mi",
  "mr",
  "mn",
  "my",
  "ne",
  "no",
  "or",
  "ps",
  "fa",
  "pl",
  "pt",
  "pa",
  "ro",
  "ru",
  "sm",
  "gd",
  "sr",
  "st",
  "sn",
  "sd",
  "si",
  "sk",
  "sl",
  "so",
  "es",
  "su",
  "sw",
  "sv",
  "tg",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "ur",
  "uz",
  "vi",
  "cy",
  "xh",
  "yi",
  "yo",
  "zu",
];
const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
      <S.Header>It seems like you owe JY 5 pound</S.Header>
      <S.Text>Pay 5 pounds securely and simply, and let go of all the hesitation.</S.Text>
      <S.PayButton onClick={handlePayment}>Pay Now</S.PayButton>
    </S.Container>
  );
}
