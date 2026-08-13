const BASE_URL = "https://samhitasolutions.in";

export const seoData: Record<
  string,
  { title: string; description: string; canonical: string }
> = {
  "/": {
    title: "Samhita Soil Solutions | Organic Bio-Pesticides & Bio-Fertilizers",
    description:
      "Government of India certified organic bio-pesticides, bio-fertilizers, and micronutrients. Sustainable agriculture solutions from Kakinada, Andhra Pradesh.",
    canonical: `${BASE_URL}/`,
  },
  "/about": {
    title: "About Us | Samhita Soil Solutions",
    description:
      "Founded in 2014, Samhita Soil Solutions is a CIBRC-certified manufacturer of organic bio-pesticides and bio-fertilizers in Andhra Pradesh.",
    canonical: `${BASE_URL}/about`,
  },
  "/products": {
    title:
      "Products | Bio-Pesticides & Bio-Fertilizers | Samhita Soil Solutions",
    description:
      "Explore our range of CIBRC-certified organic bio-pesticides and bio-fertilizers including Pseudomonas fluorescens, Trichoderma viride, and more.",
    canonical: `${BASE_URL}/products`,
  },
  "/blog": {
    title: "Blog | Samhita Soil Solutions",
    description:
      "Insights on soil science, bio-fertilizers, bio-pesticides, and government schemes for sustainable agriculture from Samhita Soil Solutions.",
    canonical: `${BASE_URL}/blog`,
  },
  "/contact": {
    title: "Contact Us | Samhita Soil Solutions",
    description:
      "Get in touch with Samhita Soil Solutions. Located in Kakinada, Andhra Pradesh. Call +91 98485 49349 or email samhitasoilsolutions@gmail.com.",
    canonical: `${BASE_URL}/contact`,
  },
};

export { BASE_URL };
