import { loadStripe } from "@stripe/stripe-js";

export default async function getStripe() {
  let key = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY : process.env.NEXT_PUBLIC_STRIPE_TEST_KEY;
  const stripePromise = loadStripe(key);
  return stripePromise;
}
