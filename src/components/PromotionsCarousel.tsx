import { Star, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArrows } from "@/components/ui/scroll-arrows";
import { Skeleton } from "@/components/ui/skeleton";
import burgerImage from "@/assets/burger-premium.jpg";
import pizzaImage from "@/assets/pizza-napoletana.jpg";
import sushiImage from "@/assets/sushi-platter.jpg";

const promotions = [
  {
    id: 1,
    name: "Burger Premium",
    discount: "30% OFF",
    rating: 4.8,
    time: "25-35 min",
    distance: "1.2 km",
    image: burgerImage,
    category: "Hamburguer",
    badge: "🔥 Mais Pedido",
    deliveryFee: "Grátis"
  },
  {
    id: 2,
    name: "Pizza Napoletana",
    discount: "2 por 1",
    rating: 4.9,
    time: "30-40 min",
    distance: "2.5 km",
    image: pizzaImage,
    category: "Pizza",
    badge: "⚡ Entrega Rápida",
    deliveryFee: "R$ 3,00"
  },
  {
    id: 3,
    name: "Sushi Express",
    discount: "25% OFF",
    rating: 4.7,
    time: "20-30 min",
    distance: "0.8 km",
    image: sushiImage,
    category: "Japonês",
    badge: "🆕 Novo",
    deliveryFee: "Grátis"
  },
];

const PromotionsCarousel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="px-4 py-4 relative">
      <h2 className="text-xl font-bold mb-4 text-foreground">Promoções Próximas</h2>
      <div
        id="promotions-carousel"
        ref={scrollRef}
        role="region"
        aria-label="Carrossel de promoções"
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {isLoading && (
          <>
            {[0,1,2].map((i) => (
              <Card key={`promo-skeleton-${i}`} className="min-w-[280px] overflow-hidden shadow-elegant">
                <div className="relative h-40">
                  <Skeleton className="absolute inset-0" />
                </div>
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
        {!isLoading && promotions.map((promo, index) => (
          <Card 
            key={promo.id} 
            onClick={() => navigate(`/promotion/${promo.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/promotion/${promo.id}`);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Ver promoção de ${promo.discount} em ${promo.name}`}
            className="min-w-[280px] overflow-hidden shadow-elegant hover:shadow-lg focus:shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-40">
              <img
                src={promo.image}
                alt={`Imagem do restaurante ${promo.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <Badge className="absolute top-3 right-3 gradient-gold text-foreground font-bold">
                {promo.discount}
              </Badge>
              <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] px-2 py-1">
                {promo.badge}
              </Badge>
              {promo.deliveryFee === "Grátis" && (
                <Badge className="absolute bottom-3 left-3 bg-accent/90 text-white text-[10px] px-2 py-1">
                  💰 Frete Grátis
                </Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-foreground">{promo.name}</h3>
                  <p className="text-xs text-muted-foreground">{promo.category}</p>
                </div>
                <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span className="text-xs font-semibold">{promo.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{promo.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{promo.distance}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ScrollArrows containerRef={scrollRef} ariaLabelPrev="Promoções anteriores" ariaLabelNext="Próximas promoções" />
    </div>
  );
};

export default PromotionsCarousel;
