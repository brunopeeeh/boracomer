

import { useState, useMemo, useEffect, useRef } from "react";
import useIsMobile from "../hooks/use-is-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartLogo from "@/components/ui/SmartLogo";

const stories = [
  { id: 1, name: "Burger House", image: "🍔" },
  { id: 2, name: "Pizza Bella", image: "🍕" },
  { id: 3, name: "Sushi Master", image: "🍱" },
  { id: 4, name: "Café & Cia", image: "☕" },
  { id: 5, name: "Taco Loco", image: "🌮" },
  { id: 6, name: "Vegan Delights", image: "🥗" },
  { id: 7, name: "Sweet Treats", image: "🍰" },
  { id: 8, name: "Healthy Bites", image: "🍎" },
  { id: 9, name: "Grill Master", image: "🍖" },
  { id: 10, name: "Seafood Shack", image: "🍤" },
  { id: 11, name: "Pasta Palace", image: "🍝" },
  { id: 12, name: "Juice Bar", image: "🥤" },
  { id: 13, name: "Breakfast Club", image: "🍳" },
  { id: 14, name: "Ice Cream Dream", image: "🍦" },
  { id: 15, name: "Smoothie King", image: "🥭" },
  { id: 16, name: "Vegan Vibes", image: "🥦" },
  { id: 17, name: "Hot Dogs & More", image: "🌭" },
  { id: 18, name: "Donut Delight", image: "🍩" },
  { id: 19, name: "Waffle World", image: "🧇" },
  { id: 20, name: "Crepe Corner", image: "🥞" },
  { id: 21, name: "Smoothie Bar", image: "🥤" },
  { id: 22, name: "Soup Kitchen", image: "🍲" },
  { id: 23, name: "Sandwich Spot", image: "🥪" },
  { id: 24, name: "Curry House", image: "🍛" },
  { id: 25, name: "Mexican Fiesta", image: "🌶️" },
  { id: 26, name: "Thai Taste", image: "🍜" },
  { id: 27, name: "Mediterranean", image: "🫒" },
  { id: 28, name: "Bakery Bliss", image: "🥐" },
  { id: 29, name: "Juice Boost", image: "🍊" },
  { id: 30, name: "Candy Land", image: "🍬" },
];

const StoriesSection = () => {
  const isMobile = useIsMobile();
  // 6 no desktop, 4 no mobile
  const itemsPerPage = isMobile ? 4 : 6;
  const stepCount = isMobile ? 2 : 3; // mover 3 no desktop para sensação de passagem
  const maxNameLen = isMobile ? 10 : 12;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const logoSize = isMobile ? 48 : 56; // garantir que o logo cabe no círculo

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setShowLeftArrow(el.scrollLeft > 4);
    setShowRightArrow(el.scrollLeft < maxScrollLeft - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => checkScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(checkScroll, 100); // checagem inicial
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, [itemsPerPage]);

  const scrollByStep = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const perItemWidth = el.clientWidth / itemsPerPage; // aproxima o card + gap
    const delta = perItemWidth * stepCount * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const formatName = (name: string) =>
    name.length > maxNameLen ? `${name.slice(0, maxNameLen)}…` : name;

  return (
    <div className="px-4 py-4 relative">
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-7 justify-start items-start overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 sm:px-8 pb-2 pr-6 sm:pr-12"
      >
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 mx-1 sm:mx-2 flex-shrink-0 snap-start">
            <div className="relative bg-gradient-to-br from-primary to-accent p-[2px] rounded-full">
              <div className="bg-background rounded-full p-[3px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full">
                  <SmartLogo name={story.name} width={logoSize} height={logoSize} title={story.name} />
                </div>
              </div>
            </div>
            <span className="text-[12px] leading-tight text-center text-foreground/80 font-medium max-w-20 sm:max-w-24 truncate">
              {formatName(story.name)}
            </span>
          </div>
        ))}
      </div>

      {showLeftArrow && (
        <button
          onClick={() => scrollByStep("prev")}
          className="absolute -left-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center bg-card rounded-full shadow z-10 focus:outline-none border border-border hover:bg-muted"
          aria-label="Stories anteriores"
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={() => scrollByStep("next")}
          className="absolute -right-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center bg-card rounded-full shadow z-10 focus:outline-none border border-border hover:bg-muted"
          aria-label="Próximos stories"
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      )}
    </div>
  );
};

export default StoriesSection;
