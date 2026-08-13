import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { seoData, BASE_URL } from "@/lib/seo";

export default function PageMeta() {
  const { pathname } = useLocation();
  const data = seoData[pathname];
  if (!data) return null;

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <link rel="canonical" href={data.canonical} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={data.canonical} />
      <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
    </Helmet>
  );
}
