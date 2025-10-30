import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { getFallbackImageUrl } from "@/lib/images";

interface Restaurant {
  id: number;
  name: string;
  distance: string;
  image: string;
  discount: string;
  coordinates: [number, number]; // [lng, lat]
  category?: string;
}

interface MapboxMapProps {
  restaurants: Restaurant[];
  apiKey: string;
  radiusFilter: number;
  userLocation: [number, number] | null;
  onRestaurantClick?: (restaurant: Restaurant) => void;
}

// Fallback público fornecido pelo usuário
const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoiYnJ1bm9wZWVoIiwiYSI6ImNtZ2xiMDUyeDE0czMybXBxMDJqMzNhaTMifQ.avNOq-OXZFvbBT6baT5cCA";

const MARKER_ZOOM_THRESHOLD = 14;

function restaurantsToGeoJSON(items: Restaurant) {
  // dummy to satisfy TS, actual implementation below
}

function restaurantsToFeatureCollection(items: Restaurant[]) {
  return {
    type: "FeatureCollection",
    features: items.map((r) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: r.coordinates },
      properties: {
        id: r.id,
        name: r.name,
        discount: r.discount,
        distance: r.distance,
        category: r.category || "",
      },
    })),
  } as GeoJSON.FeatureCollection<GeoJSON.Point>;
}

function getRingColor(restaurant: Restaurant) {
  const s = (restaurant.category || restaurant.name || "").toLowerCase();
  if (s.includes("pizza")) return "#e11d48"; // rosa/vermelho
  if (s.includes("hamburg")) return "#fb923c"; // laranja
  if (s.includes("sushi") || s.includes("japon")) return "#3b82f6"; // azul
  if (s.includes("café") || s.includes("cafe")) return "#8b5cf6"; // roxo
  if (s.includes("aça") || s.includes("acai")) return "#a855f7"; // roxo médio
  if (s.includes("mexic") || s.includes("taco")) return "#f59e0b"; // amber
  if (s.includes("pasta") || s.includes("massa")) return "#f97316"; // laranja forte
  return "#ff7a00"; // padrão
}

const MapboxMap = ({ restaurants, apiKey, radiusFilter, userLocation, onRestaurantClick }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapZoomTrigger, setMapZoomTrigger] = useState(0);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = apiKey || DEFAULT_MAPBOX_TOKEN;

    // Initialize map
    const initialCenter = userLocation || [-40.3377, -20.3155]; // Vitória, ES
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: initialCenter,
      zoom: 14,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Ensure style is loaded before adding sources/layers
    map.current.on("load", () => {
      // Add clustered source for restaurants
      if (!map.current?.getSource("restaurants")) {
        map.current!.addSource("restaurants", {
          type: "geojson",
          data: restaurantsToFeatureCollection(restaurants),
          cluster: true,
          clusterMaxZoom: 13,
          clusterRadius: 50,
        });
      }

      // Cluster circles
      if (!map.current?.getLayer("clusters")) {
        map.current!.addLayer({
          id: "clusters",
          type: "circle",
          source: "restaurants",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#ff7a00",
            "circle-radius": [
              "step",
              ["get", "point_count"],
              18,
              10, 22,
              25, 26,
              50, 32
            ],
            "circle-opacity": 0.85,
          },
        });
      }

      // Cluster count labels
      if (!map.current?.getLayer("cluster-count")) {
        map.current!.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "restaurants",
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: { "text-color": "#ffffff" },
        });
      }

      // Unclustered small points (for click targets when zoomed out)
      if (!map.current?.getLayer("unclustered-points")) {
        map.current!.addLayer({
          id: "unclustered-points",
          type: "circle",
          source: "restaurants",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#ff7a00",
            "circle-radius": 4,
            "circle-opacity": 0.7,
          },
        });
      }

      // Cluster click to expand
      map.current!.on("click", "clusters", (e) => {
        const features = map.current!.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        const clusterId = features[0]?.properties && (features[0].properties["cluster_id"] as number);
        const source: any = map.current!.getSource("restaurants");
        if (clusterId && source) {
          source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
            if (err) return;
            map.current!.easeTo({ center: (features[0] as any).geometry.coordinates, zoom });
          });
        }
      });

      map.current!.on("mouseenter", "clusters", () => {
        map.current!.getCanvas().style.cursor = "pointer";
      });
      map.current!.on("mouseleave", "clusters", () => {
        map.current!.getCanvas().style.cursor = "";
      });

      // Trigger marker refresh on zoom/move changes
      map.current!.on("zoomend", () => setMapZoomTrigger((n) => n + 1));
      map.current!.on("moveend", () => setMapZoomTrigger((n) => n + 1));

      // If we already have a user location, add radius layer now
      if (userLocation) {
        try {
          if (map.current!.getSource("radius")) {
            map.current!.removeLayer("radius-layer");
            map.current!.removeSource("radius");
          }

          map.current!.addSource("radius", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "Point", coordinates: userLocation },
              properties: {},
            },
          });

          map.current!.addLayer({
            id: "radius-layer",
            type: "circle",
            source: "radius",
            paint: {
              "circle-radius": {
                stops: [
                  [0, 0],
                  [20, radiusFilter * 1000 / 0.075],
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
        } catch (e) {
          // no-op; guards in case style load timing changes
        }
      }
    });

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
    // If style isn't loaded yet, wait until 'load' then re-run this logic once
    if (!map.current.isStyleLoaded()) {
      const fn = () => {
        // Re-run effect body once style is loaded
        if (!map.current || !userLocation) return;

        userMarker.current?.remove();

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
          .addTo(map.current!);

        map.current!.flyTo({ center: userLocation, zoom: 14, duration: 1000 });

        if (map.current!.getSource("radius")) {
          map.current!.removeLayer("radius-layer");
          map.current!.removeSource("radius");
        }

        map.current!.addSource("radius", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "Point", coordinates: userLocation },
            properties: {},
          },
        });

        map.current!.addLayer({
          id: "radius-layer",
          type: "circle",
          source: "radius",
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [20, radiusFilter * 1000 / 0.075],
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
      };
      map.current.once("load", fn);
      return;
    }

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

    // Update clustered source data
    const src = map.current.getSource("restaurants") as mapboxgl.GeoJSONSource;
    if (src) {
      src.setData(restaurantsToFeatureCollection(filteredRestaurants) as any);
    }

    // Show HTML pins only at high zoom
    if (map.current.getZoom() < MARKER_ZOOM_THRESHOLD) {
      return;
    }

    // Add new markers (HTML pins)
    filteredRestaurants.forEach((restaurant) => {
      const el = document.createElement("div");
      el.className = "restaurant-marker";
      const imgUrl = getFallbackImageUrl(restaurant.name, 96, 96);
      const ringColor = getRingColor(restaurant);
      // Wrapper interno para animação, evitando sobrescrever o transform usado pelo Mapbox no elemento raiz
      el.innerHTML = `
        <div class="pin-wrapper" style="
          position: relative;
          width: 52px;
          height: 72px;
          cursor: pointer;
          transition: transform 0.2s ease;
          will-change: transform;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: #fff;
            border: 3px solid ${ringColor}; /* aro por categoria */
            box-shadow: 0 3px 10px rgba(0,0,0,0.25);
            overflow: hidden;
          ">
            <img src="${imgUrl}" alt="${restaurant.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
          </div>
          <div style="
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 0; height: 0;
            border-left: 11px solid transparent;
            border-right: 11px solid transparent;
            border-top: 18px solid ${ringColor}; /* ponteiro por categoria */
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
          "></div>
        </div>
      `;

      const pinWrapper = el.querySelector<HTMLElement>(".pin-wrapper");
      // Animação segura: aplica transform no wrapper, não no elemento raiz do Marker
      el.addEventListener("mouseenter", () => {
        if (pinWrapper) pinWrapper.style.transform = "scale(1.15)";
      });

      el.addEventListener("mouseleave", () => {
        if (pinWrapper) pinWrapper.style.transform = "scale(1)";
      });

      // Suporte básico a toque em mobile
      el.addEventListener("touchstart", () => {
        if (pinWrapper) pinWrapper.style.transform = "scale(1.15)";
      }, { passive: true });
      el.addEventListener("touchend", () => {
        if (pinWrapper) pinWrapper.style.transform = "scale(1)";
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

      const marker = new mapboxgl.Marker(el, { anchor: "bottom" })
        .setLngLat(restaurant.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Fit bounds only when user location is known (avoid zooming out demais)
    if (userLocation && filteredRestaurants.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredRestaurants.forEach((r) => bounds.extend(r.coordinates));
      bounds.extend(userLocation);
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 1000,
      });
    }
  }, [restaurants, radiusFilter, userLocation, onRestaurantClick, mapZoomTrigger]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!(apiKey || DEFAULT_MAPBOX_TOKEN) && (
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
