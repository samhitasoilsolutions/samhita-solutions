import ProductsHero from "@/components/products/ProductsHero";
import ProductsSolutions from "@/components/products/ProductsSolutions";
import ProductsPricing from "@/components/products/ProductsPricing";
import PaddyCultivationSection from "@/components/home/PaddyCultivationSection";
import CTASection from "@/components/home/CTASection";

export default function Products() {
  return (
    <>
      <ProductsHero />
      <ProductsSolutions />
      <ProductsPricing />
      <PaddyCultivationSection />
      <CTASection />
    </>
  );
}
