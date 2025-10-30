import { Star, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArrows } from "@/components/ui/scroll-arrows";
import SmartImage from "@/components/ui/SmartImage";

const promotions = [
  {
    id: 1,
    name: "Burger Premium",
    discount: "30% OFF",
    rating: 4.8,
    time: "25-35 min",
    distance: "1.2 km",
    image: "🍔",
    category: "Hamburguer",
    badge: "🔥 Mais Pedido",
    deliveryFee: "Grátis",
    imageQuery: "gourmet burger close up juicy cheeseburger"
  },
  {
    id: 2,
    name: "Pizza Napoletana",
    discount: "2 por 1",
    rating: 4.9,
    time: "30-40 min",
    distance: "2.5 km",
    image: "🍕",
    category: "Pizza",
    badge: "⚡ Entrega Rápida",
    deliveryFee: "R$ 3,00",
    imageQuery: "pepperoni pizza close up lots of pepperoni"
  },
  {
    id: 3,
    name: "Sushi Express",
    discount: "25% OFF",
    rating: 4.7,
    time: "20-30 min",
    distance: "0.8 km",
    image: "🍱",
    category: "Japonês",
    badge: "🆕 Novo",
    deliveryFee: "Grátis",
    imageQuery: "assorted sushi platter nigiri maki sashimi philadelphia roll"
  },
];

const PromotionsCarousel = () => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-4 py-4 relative">
      <h2 className="text-xl font-bold mb-4 text-foreground">Promoções Próximas</h2>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {promotions.map((promo, index) => (
          <Card 
            key={promo.id} 
            onClick={() => navigate(`/promotion/${promo.id}`)}
            className="min-w-[280px] overflow-hidden shadow-elegant hover:shadow-lg transition-smooth cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-40">
              <SmartImage
                query={promo.imageQuery || promo.category || promo.name}
                width={320}
                height={160}
                alt={promo.name}
                className="absolute inset-0 w-full h-full object-cover"
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
      <ScrollArrows containerRef={scrollRef} />
    </div>
  );
};

export default PromotionsCarousel;
