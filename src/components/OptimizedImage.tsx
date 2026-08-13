interface OptimizedImageProps {
  src: string;
  avif: string;
  webp: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export default function OptimizedImage({
  src,
  avif,
  webp,
  alt,
  className,
  loading = "lazy",
}: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} className={className} loading={loading} />
    </picture>
  );
}
