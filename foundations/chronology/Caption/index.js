import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

const TEXTSETS = [
  "0. Circle: The start and the highest.",
  "1. Sphere: Cross-Dimensional evolution",
  "2. Cylinder: Higher Control on Heights.",
  "3. Pyramides: The symbol of ancient civilizations.",
  "4. Cube: Corbusier representation of optimization.",
  "5. Tower: Higher tower, better efficiency.",
  "6. Orbital: Probabilistic expression of nature.",
  "7. Double Helix: Human's symmetrical representation of imperfect nature.",
  "8. Bell Curve: Authority and absurdity of modern statistics.",
  "9. Randomness: How to reach to non-Euclidean via Euclidean.",
  "10. Jar: Euclidean simulation of non-Euclidean beauty.",
  "11. Giwa: A search of randomness inside the Korean beauty.",
];

function Caption({ layout, realTimeMode }) {
  const [text, setText] = useState("");
  const textRef = useRef(null);

  useEffect(() => {
    if (!realTimeMode) {
      setText(TEXTSETS[layout]);
    } else {
      setText("");
    }
  }, [layout, realTimeMode]);

  useEffect(() => {
    if (textRef && textRef.current && text) {
      let target = textRef.current;
      target.innerHTML = "";

      text.split(" ").map((txt, i) => {
        const createNode = () => {
          const n = document.createElement("span");
          n.style.display = "inline-block";
          n.style.margin = "0.2rem";
          n.innerText = txt;

          n.animate(
            [
              {
                opacity: 0,
              },
              {
                opacity: 1,
              },
            ],
            {
              duration: 1000,
              delay: i * 350,
              fill: "backwards",
            }
          );

          n.animate(
            [
              {
                opacity: 1,
              },
              {
                opacity: 0,
              },
            ],
            {
              duration: 1000,
              delay: i * 350 + 8000,
              fill: "forwards",
            }
          );

          target.appendChild(n);
        };

        createNode();
      });
    }
  }, [textRef, text]);

  return (
    <S.StyledCaption>
      <S.Text ref={textRef} />
    </S.StyledCaption>
  );
}
export default Caption;
