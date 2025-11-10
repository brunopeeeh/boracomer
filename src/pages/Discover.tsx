import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, Filter, Star, MapPin, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import SmartImage from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { Skeleton } from "@/components/ui/skeleton";
import { loadBfs } from "@/lib/data";
import { loadYoogaStore } from "@/lib/yooga";
import logoBurgerPremium from "@/assets/logo-burger-premium.png";
import logoPizzaNapoletana from "@/assets/logo-pizza-napoletana.png";
import logoSushiExpress from "@/assets/logo-sushi-express.png";
import logoTacoLoco from "@/assets/logo-taco-loco.png";

const restaurants = [
  {
    id: 1,
    name: "Burger Premium",
    category: "Hamburguer",
    rating: 4.8,
    reviews: 234,
    distance: "1.2 km",
    time: "25-35 min",
    logo: logoBurgerPremium,
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
    logo: logoPizzaNapoletana,
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
    logo: logoSushiExpress,
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
    logo: logoTacoLoco,
    posts: 28,
    followers: 650,
    description: "Sabores autênticos do México",
  },
];

const Discover = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bfsCard, setBfsCard] = useState<any | null>(null);

  // Simula carregamento leve para exibir skeletons e evitar layout shift
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  // Carrega a primeira loja real do bfs.json e mapeia para o card
  useEffect(() => {
    async function load() {
      try {
        const lojas = await loadBfs();
        const loja = lojas[0];
        if (!loja) return;
        // Tenta enriquecer com informações da API Yooga (descrição, tempo)
        const yooga = await loadYoogaStore("bfs");
        const timeStr = (() => {
          const min = yooga?.min_delivery_time;
          const max = yooga?.max_delivery_time;
          if (min && max) return `${min}-${max} min`;
          if (min && !max) return `${min} min`;
          if (!min && max) return `${max} min`;
          return "";
        })();
        const description = yooga?.description || loja.tipo_atendimento || "";
        const card = {
          id: 9999,
          name: loja.nome_empresa,
          category: loja.modelo_negocio || "",
          rating: undefined,
          reviews: undefined,
          distance: "",
          time: timeStr,
          image: (yooga?.img || loja.img || loja.modelo_negocio || loja.nome_empresa),
          imageQuery: (yooga?.img || loja.img || loja.modelo_negocio || loja.nome_empresa),
          posts: undefined,
          followers: undefined,
          description,
          slug: "bfs",
        };
        setBfsCard(card);
      } catch {}
    }
    load();
  }, []);

  const allRestaurants = useMemo(() => {
    return [
      ...(bfsCard ? [bfsCard] : []),
      ...restaurants,
    ];
  }, [bfsCard]);

  const filteredRestaurants = allRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (restaurant.category || "").toLowerCase().includes(searchQuery.toLowerCase())
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
        {isLoading && (
          <>
            {[0,1,2].map((i) => (
              <Card key={`skeleton-${i}`} className="overflow-hidden shadow-soft">
                <div className="flex gap-4 p-4">
                  <Skeleton className="w-24 h-24 rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
        {!isLoading && filteredRestaurants.map((restaurant, index) => (
          <Card
            key={restaurant.id}
            className="overflow-hidden shadow-soft hover:shadow-lg transition-smooth cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => {
              if ((restaurant as any).slug) {
                navigate(`/store/${(restaurant as any).slug}`);
              } else {
                // Navega para a página de loja usando um slug baseado no nome
                const slug = restaurant.name.toLowerCase().replace(/\s+/g, '-');
                navigate(`/store/${slug}`);
              }
            }}
          >
            <div className="flex gap-4 p-4">
              {(restaurant as any).logo ? (
                <img
                  src={(restaurant as any).logo}
                  alt={restaurant.name}
                  className="w-24 h-24 rounded-xl flex-shrink-0 object-cover bg-white"
                />
              ) : (
                <SmartImage
                  query={(restaurant as any).imageQuery || (restaurant as any).image || restaurant.category || restaurant.name}
                  width={96}
                  height={96}
                  alt={restaurant.name}
                  enableSrcSet={restaurant.id !== 9999}
                  className="w-24 h-24 rounded-xl flex-shrink-0"
                />
              )}
              
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
                  {restaurant.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs font-semibold">{restaurant.rating}</span>
                      {restaurant.reviews && (
                        <span className="text-xs text-muted-foreground">({restaurant.reviews})</span>
                      )}
                    </div>
                  )}
                  {restaurant.distance && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {restaurant.distance}
                    </div>
                  )}
                  {restaurant.time && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {restaurant.time}
                    </div>
                  )}
                </div>
                
                {(restaurant.posts && restaurant.followers) && (
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{restaurant.posts} posts</span>
                    <span>•</span>
                    <span>{restaurant.followers} seguidores</span>
                  </div>
                )}
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
