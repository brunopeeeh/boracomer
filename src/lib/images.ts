import { useEffect, useMemo, useState } from "react";

export function getFallbackImageUrl(query: string, width = 320, height = 240): string {
  const q = encodeURIComponent(query.toLowerCase());
  return `https://picsum.photos/seed/${q}/${width}/${height}`;
}

async function fetchPexelsImageUrl(query: string, width = 320, height = 240): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY as string | undefined;
    if (!apiKey) return null;
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`; 
    const res = await fetch(url, { headers: { Authorization: apiKey } });
    if (!res.ok) return null;
    const data = await res.json();
    const photo = data?.photos?.[0];
    const base = (photo?.src?.landscape || photo?.src?.large || photo?.src?.medium) as string | undefined;
    if (!base) return null;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}w=${width}&h=${height}&auto=compress&cs=tinysrgb`;
  } catch {
    return null;
  }
}

const cache = new Map<string, string>();

export function useImageUrl(query: string, width = 320, height = 240) {
  const key = useMemo(() => `${query}:${width}x${height}`.toLowerCase(), [query, width, height]);
  const [url, setUrl] = useState<string>(() => cache.get(key) || getFallbackImageUrl(query, width, height));

  useEffect(() => {
    let mounted = true;
    (async () => {
      const cached = cache.get(key);
      if (cached) {
        if (mounted) setUrl(cached);
        return;
      }
      const pexels = await fetchPexelsImageUrl(query, width, height);
      const next = pexels || getFallbackImageUrl(query, width, height);
      cache.set(key, next);
      if (mounted) setUrl(next);
    })();
    return () => { mounted = false; };
  }, [key, query, width, height]);

  return url;
}