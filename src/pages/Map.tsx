import { ArrowLeft, MapPin, Navigation, Locate, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { loadLojas } from "@/lib/data";
import SmartImage from "@/components/ui/SmartImage";
const MapboxMap = lazy(() => import("@/components/MapboxMap"));

// Tipos e utilitários para lojas.json
interface RawLoja {
  nome_empresa: string;
  modelo_negocio?: string;
  tipo_atendimento?: string;
  Latitude: number;
  Longitude: number;
}

interface Restaurant {
  id: number;
  name: string;
  distance: string;
  image: string;
  discount: string;
  coordinates: [number, number]; // [lng, lat]
  imageQuery?: string; // para SmartImage nos cards
  category?: string; // para cores dos pins
}

// Haversine para calcular distância em km
function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
    }
  return `${km.toFixed(1)} km`;
}

function getEmoji(modelo?: string): string {
  const s = (modelo || "").toLowerCase();
  if (s.includes("hamburg")) return "🍔";
  if (s.includes("pizza")) return "🍕";
  if (s.includes("sushi") || s.includes("japon")) return "🍱";
  if (s.includes("aça") || s.includes("acai")) return "🥤";
  if (s.includes("café") || s.includes("cafe")) return "☕";
  if (s.includes("mexic") || s.includes("taco")) return "🌮";
  if (s.includes("pasta") || s.includes("massa")) return "🍝";
  return "🍽️";
}

// Token padrão do Mapbox (fallback). Pode ser sobrescrito via VITE_MAPBOX_TOKEN
const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoiYnJ1bm9wZWVoIiwiYSI6ImNtZ2xiMDUyeDE0czMybXBxMDJqMzNhaTMifQ.avNOq-OXZFvbBT6baT5cCA";

// Token inicial vindo do ambiente ou fallback
const envToken = (import.meta as any).env?.VITE_MAPBOX_TOKEN as string | undefined;
const initialToken = envToken || DEFAULT_MAPBOX_TOKEN;

const Map = () => {
  const navigate = useNavigate();
  const [mapboxToken, setMapboxToken] = useState(initialToken);
  const [showTokenInput, setShowTokenInput] = useState(!initialToken);
  const [radiusFilter, setRadiusFilter] = useState(5); // km
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const radiusOptions = [
    { value: 0.5, label: "500m" },
    { value: 1, label: "1 km" },
    { value: 5, label: "5 km" },
    { value: 10, label: "10 km" },
  ];

  // Buscar lojas.json via react-query com validação Zod
  const { data: lojasData, isLoading: isLoadingLojas } = useQuery({
    queryKey: ["lojas.json"],
    queryFn: loadLojas,
    staleTime: 1000 * 60 * 5,
  });

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          toast.success("Localização obtida com sucesso!");
          setIsLocating(false);
        },
        (error) => {
          toast.error("Erro ao obter localização: " + error.message);
          setIsLocating(false);
        }
      );
    } else {
      toast.error("Geolocalização não disponível no seu navegador");
      setIsLocating(false);
    }
  };

  const handleSaveToken = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      toast.success("Token do Mapbox configurado!");
    } else {
      toast.error("Por favor, insira um token válido");
    }
  };

  // Mapear lojas para restaurantes e filtrar por raio
  const restaurants: Restaurant[] = useMemo(() => {
    const entries = lojasData ?? [];
    return entries.map((loja, idx) => {
      const coords: [number, number] = [loja.Longitude, loja.Latitude];
      const distKm = userLocation ? calculateDistance(userLocation, coords) : undefined;
      const category = loja.modelo_negocio || "";
      return {
        id: idx,
        name: loja.nome_empresa,
        distance: distKm !== undefined ? formatDistance(distKm) : "",
        image: getEmoji(loja.modelo_negocio),
        discount: loja.tipo_atendimento || "",
        coordinates: coords,
        imageQuery: loja.modelo_negocio || loja.nome_empresa,
        category,
      };
    });
  }, [lojasData, userLocation]);

  const filteredRestaurants: Restaurant[] = useMemo(() => {
    if (!userLocation) return restaurants;
    return restaurants.filter((r) => calculateDistance(userLocation, r.coordinates) <= radiusFilter);
  }, [restaurants, userLocation, radiusFilter]);

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
            <h1 className="text-xl font-bold text-foreground">Mapa</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleGetLocation}
              disabled={isLocating}
            >
              {isLocating ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              ) : (
                <Locate className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowTokenInput(true)}
              className="flex items-center gap-1"
            >
              <Key className="h-4 w-4" />
              Token
            </Button>
          </div>
        </div>

        {/* Radius Filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          {radiusOptions.map((option) => (
            <Button
              key={option.value}
              variant={radiusFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setRadiusFilter(option.value)}
              className="rounded-full whitespace-nowrap"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </header>

      {/* Mapbox Token Input */}
      {showTokenInput && (
        <div className="px-4 py-4 bg-accent/50 border-b border-border">
          <Label className="text-sm font-medium mb-2 block">
            Token Público do Mapbox
          </Label>
          <p className="text-xs text-muted-foreground mb-3">
            Obtenha seu token em{" "}
            <a 
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com/tokens
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.ey..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveToken}>
              Salvar
            </Button>
          </div>
        </div>
      )}

      {/* Mapa Interativo */}
      <div className="relative h-[70vh]">
        <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Carregando mapa…</div>}>
          <MapboxMap
            restaurants={filteredRestaurants}
            apiKey={mapboxToken}
            radiusFilter={radiusFilter}
            userLocation={userLocation}
            onRestaurantClick={(restaurant) => {
              toast.info(`${restaurant.name} - ${restaurant.discount}`);
            }}
          />
        </Suspense>
      </div>

      <BottomNav />
    </div>
  );
};

export default Map;
