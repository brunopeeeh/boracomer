import { ArrowLeft, Settings, Heart, MapPin, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";

const userStats = [
  { label: "Pedidos", value: 42, icon: "🛍️" },
  { label: "Avaliações", value: 28, icon: "⭐" },
  { label: "Favoritos", value: 15, icon: "❤️" },
];

const recentOrders = [
  { id: 1, restaurant: "Burger Premium", image: "🍔", date: "Há 2 dias", rating: 5 },
  { id: 2, restaurant: "Pizza Napoletana", image: "🍕", date: "Há 5 dias", rating: 5 },
  { id: 3, restaurant: "Sushi Express", image: "🍱", date: "Há 1 semana", rating: 4 },
];

const achievements = [
  { id: 1, name: "Explorador", icon: "🗺️", description: "Pediu de 10+ restaurantes" },
  { id: 2, name: "Crítico", icon: "✍️", description: "Fez 20+ avaliações" },
  { id: 3, name: "Fiel", icon: "🏆", description: "Cliente há 6 meses" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Perfil</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Profile Header */}
      <div className="px-4 py-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl">
          👤
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1">João Silva</h2>
        <p className="text-muted-foreground flex items-center justify-center gap-1">
          <MapPin className="w-4 h-4" />
          São Paulo, SP
        </p>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {userStats.map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-bold text-foreground mb-3">Conquistas</h3>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="p-3 text-center">
              <div className="text-3xl mb-1">{achievement.icon}</div>
              <div className="text-xs font-semibold text-foreground">{achievement.name}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-bold text-foreground mb-3">Pedidos Recentes</h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <Card key={order.id} className="p-4 hover:shadow-lg transition-smooth cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-2xl">
                  {order.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{order.restaurant}</h4>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">{order.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
