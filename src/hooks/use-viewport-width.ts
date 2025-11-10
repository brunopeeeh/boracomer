import { useEffect, useRef, useState } from "react";

type Options = {
  initial?: number;
  throttleMs?: number;
};

export default function useViewportWidth(options: Options = {}) {
  const { initial = 1024, throttleMs = 100 } = options;
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : initial);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => {
      if (throttleMs <= 0) {
        setVw(window.innerWidth);
        return;
      }
      if (timerRef.current) return; // skip while throttled
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        setVw(window.innerWidth);
      }, throttleMs);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [throttleMs]);

  return vw;
}