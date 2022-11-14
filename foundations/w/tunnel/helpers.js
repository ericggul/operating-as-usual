import { useState, useEffect } from "react";

/*****************
 * Player Controls
 ****************/
export const usePlayerControls = () => {
  const [forward, setForward] = useState(false);

  const handleKeyDown = (e) => {
    if (e.code === "KeyW" && !forward) {
      setForward(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.code === "KeyW") {
      setForward(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return forward;
};
