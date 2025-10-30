import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

interface Restaurant {
  id: number;
  name: string;
  distance: string;
  image: string;
  discount: string;
  coordinates: [number, number]; // [lng, lat]
}

interface MapboxMapProps {
  restaurants: Restaurant[];
  apiKey: string;
  radiusFilter: number;
  userLocation: [number, number] | null;
  onRestaurantClick?: (restaurant: Restaurant) => void;
}

const MapboxMap = ({ restaurants, apiKey, radiusFilter, userLocation, onRestaurantClick }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userMarker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;

    // Initialize map
    const initialCenter = userLocation || [-40.3377, -20.3155]; // Vitória, ES
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: initialCenter,
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cleanup
    return () => {
      markers.current.forEach((marker) => marker.remove());
      userMarker.current?.remove();
      map.current?.remove();
    };
  }, [apiKey, userLocation]);

  // Update user location marker
  useEffect(() => {
    if (!map.current || !userLocation) return;

    // Remove old user marker
    userMarker.current?.remove();

    // Create custom user marker element
    const el = document.createElement("div");
    el.className = "user-location-marker";
    el.style.width = "20px";
    el.style.height = "20px";
    el.style.borderRadius = "50%";
    el.style.backgroundColor = "#3b82f6";
    el.style.border = "3px solid white";
    el.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.5)";

    userMarker.current = new mapboxgl.Marker(el)
      .setLngLat(userLocation)
      .addTo(map.current);

    // Center map on user location
    map.current.flyTo({
      center: userLocation,
      zoom: 14,
      duration: 1000,
    });

    // Add circle for radius
    if (map.current.getSource("radius")) {
      map.current.removeLayer("radius-layer");
      map.current.removeSource("radius");
    }

    map.current.addSource("radius", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: userLocation,
        },
        properties: {},
      },
    });

    map.current.addLayer({
      id: "radius-layer",
      type: "circle",
      source: "radius",
      paint: {
        "circle-radius": {
          stops: [
            [0, 0],
            [20, radiusFilter * 1000 / 0.075], // Convert km to pixels approximately
          ],
          base: 2,
        },
        "circle-color": "#3b82f6",
        "circle-opacity": 0.1,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#3b82f6",
        "circle-stroke-opacity": 0.3,
      },
    });
  }, [userLocation, radiusFilter]);

  // Update restaurant markers
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Filter restaurants by radius
    const filteredRestaurants = userLocation
      ? restaurants.filter((restaurant) => {
          const distance = calculateDistance(userLocation, restaurant.coordinates);
          return distance <= radiusFilter;
        })
      : restaurants;

    // Add new markers with clustering
    filteredRestaurants.forEach((restaurant) => {
      const el = document.createElement("div");
      el.className = "restaurant-marker";
      el.innerHTML = `
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s;
        ">
          ${restaurant.image}
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.2)";
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
      });

      el.addEventListener("click", () => {
        onRestaurantClick?.(restaurant);
      });

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 4px;">${restaurant.name}</h3>
          <p style="font-size: 14px; color: #666;">${restaurant.discount}</p>
          <p style="font-size: 12px; color: #999;">${restaurant.distance}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(restaurant.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (filteredRestaurants.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredRestaurants.forEach((r) => bounds.extend(r.coordinates));
      if (userLocation) bounds.extend(userLocation);
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 1000,
      });
    }
  }, [restaurants, radiusFilter, userLocation, onRestaurantClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!apiKey && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Configure sua chave do Mapbox para visualizar o mapa
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Calculate distance between two coordinates in km
function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  
  const R = 6371; // Earth's radius in km
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

export default MapboxMap;
