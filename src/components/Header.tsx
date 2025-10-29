import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  // Simulando dados do usuário - em produção viria de um contexto/API
  const userName = "João";
  const currentCity = "São Paulo, SP";

  return (
    <header className="gradient-primary text-primary-foreground px-4 pt-12 pb-4 rounded-b-3xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-primary-foreground" />
        <div className="flex-1">
          <p className="text-sm font-medium">Bem vindo, {userName}!</p>
          <p className="text-xs opacity-90">{currentCity}</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Restaurantes, comida ou bairro" className="pl-10 bg-card border-0 shadow-soft h-12 rounded-xl" />
      </div>
    </header>
  );
};

export default Header;

