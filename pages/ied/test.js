//dynamic import VisualTest
import { useMemo } from "react";
import dynamic from "next/dynamic";
const GridTest = dynamic(() => import("components/ied/grids/Grid2"), { ssr: false });
const StripeTest = dynamic(() => import("components/ied/stripes/Stripe1"), { ssr: false });
const CircleTest = dynamic(() => import("components/ied/circles/Circle6"), { ssr: false });

const getRandom = (a, b) => Math.random() * (b - a) + a;
export default function IED() {
  const data = useMemo(() => {
    let array = [];
    for (let i = 0; i < 100; i++) {
      array.push(getRandom(0.5, 4));
    }
    return array;
  }, []);
  return <CircleTest data={data} />;
}
