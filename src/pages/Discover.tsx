import { useState } from "react";
import { ArrowLeft, Search, Filter, Star, MapPin, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import SmartImage from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const restaurants = [
  {
    id: 1,
    name: "Burger Premium",
    category: "Hamburguer",
    rating: 4.8,
    reviews: 234,
    distance: "1.2 km",
    time: "25-35 min",
    image: "hamburger",
    imageQuery: "gourmet burger close up juicy cheeseburger",
    posts: 45,
    followers: 1200,
    description: "Os melhores hambúrgueres artesanais da cidade",
  },
  {
    id: 2,
    name: "Pizza Napoletana",
    category: "Pizza",
    rating: 4.9,
    reviews: 456,
    distance: "2.5 km",
    time: "30-40 min",
    image: "pizza",
    imageQuery: "pepperoni pizza close up lots of pepperoni",
    posts: 78,
    followers: 2300,
    description: "Autêntica pizza italiana no forno a lenha",
  },
  {
    id: 3,
    name: "Sushi Express",
    category: "Japonês",
    rating: 4.7,
    reviews: 189,
    distance: "0.8 km",
    time: "20-30 min",
    image: "sushi",
    imageQuery: "assorted sushi platter nigiri maki sashimi philadelphia roll",
    posts: 34,
    followers: 890,
    description: "Sushi fresco e delivery rápido",
  },
  {
    id: 4,
    name: "Taco Loco",
    category: "Mexicano",
    rating: 4.6,
    reviews: 167,
    distance: "1.5 km",
    time: "20-30 min",
    image: "tacos",
    imageQuery: "tacos al pastor close up street food",
    posts: 28,
    followers: 650,
    description: "Sabores autênticos do México",
  },
];

const Discover = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Descobrir Restaurantes</h1>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar restaurantes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {filteredRestaurants.map((restaurant, index) => (
          <Card
            key={restaurant.id}
            className="overflow-hidden shadow-soft hover:shadow-lg transition-smooth cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex gap-4 p-4">
              <SmartImage
                query={restaurant.imageQuery || restaurant.image || restaurant.category || restaurant.name}
                width={96}
                height={96}
                alt={restaurant.name}
                className="w-24 h-24 rounded-xl flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-bold text-foreground">{restaurant.name}</h3>
                    <p className="text-xs text-muted-foreground">{restaurant.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {restaurant.description}
                </p>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-xs font-semibold">{restaurant.rating}</span>
                    <span className="text-xs text-muted-foreground">({restaurant.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {restaurant.distance}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {restaurant.time}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{restaurant.posts} posts</span>
                  <span>•</span>
                  <span>{restaurant.followers} seguidores</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Discover;
