
import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useIsMobile from "../hooks/use-is-mobile";
import { BREAKPOINTS, isTabletWidth } from "@/lib/breakpoints";
import useViewportWidth from "@/hooks/use-viewport-width";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartLogo from "@/components/ui/SmartLogo";
import logoBurgerPremium from "@/assets/logo-burger-premium.png";
import logoPizzaNapoletana from "@/assets/logo-pizza-napoletana.png";
import logoSushiExpress from "@/assets/logo-sushi-express.png";
import logoTacoLoco from "@/assets/logo-taco-loco.png";
import logoTheBurger from "@/assets/logo-the-burger.png";
import logoCafeCia from "@/assets/logo-cafe-cia.png";
import logoSweetTreats from "@/assets/logo-sweet-treats.png";
import logoHealthyBites from "@/assets/logo-healthy-bites.png";
import logoSeafoodShack from "@/assets/logo-seafood-shack.png";
import logoPastaPalace from "@/assets/logo-pasta-palace.png";
import logoBreakfastClub from "@/assets/logo-breakfast-club.png";

const stories = [
  { id: 1, name: "Burger Premium", logo: logoBurgerPremium, slug: "burger-premium" },
  { id: 2, name: "Pizza Napoletana", logo: logoPizzaNapoletana, slug: "pizza-napoletana" },
  { id: 3, name: "Sushi Express", logo: logoSushiExpress, slug: "sushi-express" },
  { id: 4, name: "Taco Loco", logo: logoTacoLoco, slug: "taco-loco" },
  { id: 5, name: "The Burger", logo: logoTheBurger, slug: "bfs" },
  { id: 6, name: "Café & Cia", logo: logoCafeCia },
  { id: 7, name: "Sweet Treats", logo: logoSweetTreats },
  { id: 8, name: "Healthy Bites", logo: logoHealthyBites },
  { id: 9, name: "Grill Master", image: "🍖" },
  { id: 10, name: "Seafood Shack", logo: logoSeafoodShack },
  { id: 11, name: "Pasta Palace", logo: logoPastaPalace },
  { id: 12, name: "Juice Bar", image: "🥤" },
  { id: 13, name: "Breakfast Club", logo: logoBreakfastClub },
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
  // alinhar com Tailwind: sm = 640px
  const isMobile = useIsMobile(BREAKPOINTS.sm);
  // acompanhar viewport para distinguir tablet (hook central)
  const vw = useViewportWidth({ initial: BREAKPOINTS.lg, throttleMs: 120 });

  const isTablet = isTabletWidth(vw);
  // 6 no desktop, 5 no tablet, 4 no mobile
  const itemsPerPage = isMobile ? 4 : isTablet ? 5 : 6;
  const stepCount = isMobile ? 2 : 3; // mover 3 no desktop/tablet para sensação de passagem
  // Refinar truncagem por breakpoint para uniformizar altura
  const maxNameLen = isMobile ? 9 : isTablet ? 11 : 12;
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
        className="flex gap-4 sm:gap-6 justify-start items-start overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 sm:px-8 pb-2 pr-6 sm:pr-12"
      >
        {stories.map((story) => {
          const content = (
            <>
              <div className="relative bg-gradient-to-br from-primary to-accent p-[2px] rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                <div className="bg-background rounded-full p-[3px]">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white flex items-center justify-center">
                    {story.logo ? (
                      <img 
                        src={story.logo} 
                        alt={story.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <SmartLogo name={story.name} width={logoSize} height={logoSize} title={story.name} fontScale={isTablet ? 0.34 : 0.36} />
                    )}
                  </div>
                </div>
              </div>
              <span className="text-[12px] leading-tight text-center text-foreground/80 font-medium max-w-20 sm:max-w-24 truncate transition-colors duration-200 group-hover:text-primary">
                {formatName(story.name)}
              </span>
            </>
          );

          return story.slug ? (
            <Link 
              key={story.id} 
              to={`/store/${story.slug}`}
              className="flex flex-col items-center gap-2 mx-1 sm:mx-2 flex-shrink-0 snap-start group cursor-pointer"
            >
              {content}
            </Link>
          ) : (
            <div key={story.id} className="flex flex-col items-center gap-2 mx-1 sm:mx-2 flex-shrink-0 snap-start group">
              {content}
            </div>
          );
        })}
      </div>

      {showLeftArrow && (
        <button
          onClick={() => scrollByStep("prev")}
          className="absolute -left-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center bg-card rounded-full shadow-md z-10 focus:outline-none border border-border hover:bg-muted transition-all duration-200 hover:scale-110 hover:shadow-lg"
          aria-label="Stories anteriores"
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={() => scrollByStep("next")}
          className="absolute -right-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center bg-card rounded-full shadow-md z-10 focus:outline-none border border-border hover:bg-muted transition-all duration-200 hover:scale-110 hover:shadow-lg"
          aria-label="Próximos stories"
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      )}
    </div>
  );
};

export default StoriesSection;
