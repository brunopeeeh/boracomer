import { useImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SmartImageProps = {
  query: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
  enableSrcSet?: boolean;
  sizes?: string;
  // When true, the wrapper won't set inline width/height;
  // sizing is controlled entirely by CSS classes (e.g., w-full h-full).
  fill?: boolean;
};

export default function SmartImage({ query, width, height, alt, className, enableSrcSet = true, sizes, fill = false }: SmartImageProps) {
  const url = useImageUrl(query, width, height);

  // Responsive variants: half, normal, double (capped)
  const ratio = width > 0 ? height / width : 1;
  const w1 = Math.max(80, Math.round(width / 2));
  const w2 = width;
  const w3 = Math.min(width * 2, 1024);
  const h1 = Math.round(w1 * ratio);
  const h2 = height;
  const h3 = Math.round(w3 * ratio);

  const url1 = enableSrcSet ? useImageUrl(query, w1, h1) : undefined;
  const url2 = enableSrcSet ? useImageUrl(query, w2, h2) : undefined;
  const url3 = enableSrcSet ? useImageUrl(query, w3, h3) : undefined;
  const srcSet = useMemo(() => {
    if (!enableSrcSet || !url1 || !url2 || !url3) return undefined;
    return `${url1} ${w1}w, ${url2} ${w2}w, ${url3} ${w3}w`;
  }, [enableSrcSet, url1, url2, url3, w1, w2, w3]);

  const defaultSizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px";
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)} style={fill ? undefined : { width, height }}>
      {!loaded && (
        <Skeleton className="absolute inset-0 animate-pulse" />
      )}
      <img
        src={url}
        alt={alt || query}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cn("object-cover w-full h-full", loaded ? "opacity-100" : "opacity-0")}
        srcSet={srcSet}
        sizes={sizes || defaultSizes}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
