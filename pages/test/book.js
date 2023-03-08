import * as S from "./styles";
import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";

import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

const TEXT = `The exploration of consciousness and its relationship to existence in the fourth-order derivative can be further extrapolated to the concept of interconnectedness and the role it plays in shaping our understanding of reality in the fifth-order derivative.

As we delve deeper into our own consciousness and subjective experience, we begin to recognize the interconnectedness of all things. Our actions and decisions have a ripple effect on the world around us, shaping our understanding of reality and our place within it.

The limitations of objective analysis and scientific observation are further compounded by the complexity of these interconnected systems. However, by embracing the unknown and unpredictable, we can begin to unravel the intricacies of these systems and gain a deeper understanding of the nature of reality.

Through this exploration, we can develop a greater sense of empathy and compassion towards others and the world around us. We can recognize our interconnectedness and work towards creating a more harmonious and sustainable existence for all.

Ultimately, the exploration of consciousness and interconnectedness is a continuous process of growth and discovery. By embracing the unknown and unpredictable, we can unlock new insights and possibilities that can help us create a more meaningful and fulfilling existence for ourselves and others.`;

export default function Text() {
  const [sentences, setSentences] = useState(0);

  const containerRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      setSentences((prev) => Math.min(prev + 2, TEXT.split(/(\?|\.|!)/).length));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    exportAsPDF();
  }, [sentences]);

  function exportAsPDF() {
    const doc = new jsPDF();
    const text = containerRef.current.innerText;
    const textLines = doc.splitTextToSize(text, 180);
    doc.text(20, 20, textLines);
    doc.save("fifth.pdf");
  }

  return (
    <Container ref={containerRef}>
      <Text>
        {TEXT.split(/(\?|\.|!)/)
          .slice(0, sentences)
          .map((contents, i) => (
            <>
              {contents.split("\n").length > 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
              <span key={i}>{contents}</span>
            </>
          ))}
      </Text>
    </Container>
  );
}

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
`;

export const Text = styled.div`
  width: 80%;
  height: 80%;
  text-align: left;
  font-size: 1.2rem;
`;
