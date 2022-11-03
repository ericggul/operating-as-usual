import React, { useState, useEffect, useCallback, useMemo } from "react";

export default function useResize(ignoreDocument = false) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const onResize = useCallback(() => {
    const documentClientHeight = document.documentElement.clientHeight;
    const documentClientWidth = document.documentElement.clientWidth;
    if (ignoreDocument) {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      return;
    }
    setWindowHeight(documentClientWidth > 768 ? documentClientHeight : window.innerHeight);
    setWindowWidth(documentClientWidth);
  }, [ignoreDocument]);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return [windowWidth, windowHeight];
}
