import React from "react";
import { Home, Search, Compass, Heart, PlusCircle, User, Menu, LayoutGrid, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeviceFrame from "@/components/DeviceFrame";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r bg-background p-4">
        <div className="flex items-center gap-2 mb-8">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">Bora Comer?</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <Home className="h-5 w-5" />
            <span>Início</span>
          </Link>
          <Link to="/discover" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <Compass className="h-5 w-5" />
            <span>Descobrir</span>
          </Link>
          <Link to="/map" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <Search className="h-5 w-5" />
            <span>Mapa</span>
          </Link>
          <Link to="/coupons" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <Ticket className="h-5 w-5" />
            <span>Meus Cupons</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
            <User className="h-5 w-5" />
            <span>Perfil</span>
          </Link>
          {/* Add more navigation items as needed */}
        </nav>
      </aside>

      {/* Main Content Area - centered feed width (estilo Instagram) */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[980px] px-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DesktopLayout;
