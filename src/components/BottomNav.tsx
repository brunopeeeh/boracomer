import { Home, Compass, Map, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useIsMobile from "@/hooks/use-is-mobile"; // Import the hook

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Descobrir", path: "/discover" },
  { icon: Map, label: "Mapa", path: "/map" },
  { icon: User, label: "Perfil", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile(); // Use the hook

  if (!isMobile) {
    return null; // Don't render on desktop
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "fill-primary" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
