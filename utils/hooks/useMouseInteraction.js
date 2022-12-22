import { useRef } from "react";

export default function useMouseInteraction({ containerRef, setShowUtils }) {
  let mousePosRef = useRef([0, 0]);

  const handlePointerDown = (e) => {
    mousePosRef.current[0] = e.clientX;
    mousePosRef.current[1] = e.clientY;
  };

  const handleClick = (e) => {
    const { target, clientX, clientY } = e;
    const downDistance = Math.sqrt(
      (mousePosRef.current[0] - clientX) ** 2 +
        (mousePosRef.current[1] - clientY) ** 2
    );

    if (downDistance > 5) {
      e.stopPropagation();
      return;
    }
    if (containerRef.current && containerRef.current.contains(target)) {
      e.stopPropagation();
      return;
    } else {
      setShowUtils((util) => !util);
    }
  };

  return { handlePointerDown, handleClick };
}
