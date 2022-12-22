import * as easings from "d3-ease";
export const CONFIG = [
  {
    animation: [
      {
        duration: 60000,
        easing: easings.easeLinear,
      },
      { duration: 5000, easing: easings.easeCubic, friction: 25, bounce: 20 },
    ],

    light: {
      lightColor: "#F6DA77",
    },
  },
];
