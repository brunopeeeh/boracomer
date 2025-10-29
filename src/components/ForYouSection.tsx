import { Star, Clock, MapPin, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const restaurants = [
  {
    id: 1,
    name: "Taco Fiesta",
    rating: 4.9,
    time: "15-25 min",
    distance: "0.5 km",
    image: "🌮",
    category: "Mexicano",
    deliveryFee: "Grátis",
    tags: ["🔥 Mais Pedido", "⚡ Entrega Rápida"]
  },
  {
    id: 2,
    name: "Pasta Italiana",
    rating: 4.7,
    time: "20-30 min",
    distance: "1.8 km",
    image: "🍝",
    category: "Italiano",
    deliveryFee: "R$ 5,00",
    tags: ["💰 Cupom Disponível"]
  },
  {
    id: 3,
    name: "Açaí do Bem",
    rating: 4.8,
    time: "10-20 min",
    distance: "0.3 km",
    image: "🥤",
    category: "Açaí",
    deliveryFee: "Grátis",
    tags: ["🆕 Novo", "⚡ Entrega Rápida"]
  },
];

const ForYouSection = () => {
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold mb-4 text-foreground">Para Você</h2>
      <div className="space-y-3">
        {restaurants.map((restaurant, index) => (
          <Card 
            key={restaurant.id} 
            className="overflow-hidden shadow-soft hover:shadow-md transition-smooth cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-3 p-3">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-4xl flex-shrink-0">
                {restaurant.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground truncate">{restaurant.name}</h3>
                    <p className="text-xs text-muted-foreground">{restaurant.category}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-xs font-semibold">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{restaurant.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span className={restaurant.deliveryFee === "Grátis" ? "text-primary font-semibold" : ""}>
                      {restaurant.deliveryFee}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {restaurant.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForYouSection;
