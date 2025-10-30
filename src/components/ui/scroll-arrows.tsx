import { useEffect, useState, useCallback } from "react";
import type { RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ScrollArrowsProps = {
  containerRef: RefObject<HTMLDivElement>;
  amount?: number; // pixels to scroll per click
  classNameLeft?: string;
  classNameRight?: string;
};

export function ScrollArrows({
  containerRef,
  amount = 200,
  classNameLeft = "absolute -left-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center bg-card rounded-full shadow z-10 focus:outline-none border border-border hover:bg-muted transition-colors",
  classNameRight = "absolute -right-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center bg-card rounded-full shadow z-10 focus:outline-none border border-border hover:bg-muted transition-colors",
}: ScrollArrowsProps) {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const check = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeft(scrollLeft > 5); // Pequena margem para evitar problemas de precisão
    setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    
    // Verificação inicial com delay para garantir que o conteúdo foi renderizado
    const timeoutId = setTimeout(check, 100);
    check();
    
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearTimeout(timeoutId);
    };
  }, [containerRef, check]);

  const scrollBy = (offset: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <>
      {showLeft && (
        <button onClick={() => scrollBy(-amount)} className={classNameLeft}>
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>
      )}
      {showRight && (
        <button onClick={() => scrollBy(amount)} className={classNameRight}>
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      )}
    </>
  );
}