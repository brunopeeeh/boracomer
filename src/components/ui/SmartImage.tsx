import { useImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  query: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
};

export default function SmartImage({ query, width, height, alt, className }: SmartImageProps) {
  const url = useImageUrl(query, width, height);
  return (
    <img
      src={url}
      alt={alt || query}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={cn("object-cover", className)}
    />
  );
}