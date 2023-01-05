import { useState, useEffect } from "react";

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  const keyMapping = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump",
  };

  const handleKeyDown = (e) => {
    setMovement((prev) => ({
      ...prev,
      [keyMapping[e.code]]: true,
    }));
  };

  const handleKeyUp = (e) => {
    setMovement((prev) => ({
      ...prev,
      [keyMapping[e.code]]: false,
    }));
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};

export default usePlayerControls;
