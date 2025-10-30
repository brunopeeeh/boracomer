import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Gera URL de imagem real usando Unsplash Source sem precisar de API key
// Ex: getImageUrl("burger", 320, 240) -> foto temática de burger
export function getImageUrl(query: string, width = 320, height = 240): string {
  const q = encodeURIComponent(query.toLowerCase());
  // Usa Picsum com seed para manter tema estável sem API key
  return `https://picsum.photos/seed/${q}/${width}/${height}`;
}
