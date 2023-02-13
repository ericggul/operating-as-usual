import dynamic from "next/dynamic";
import React from "react";

const Comp = dynamic(() => import("foundations/screen/ImageTransition"), {
  ssr: false,
});

export default function Test() {
  return (
    <React.Fragment>
      <Comp />
    </React.Fragment>
  );
}
