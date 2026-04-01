import CanyonProductPage from "@/components/pages/canyon_product_page";

export const metadata = {
  title: "Product",
  description: "Three layers. One platform. Canyon connects your data, orchestrates AI agents, and deploys to your infrastructure.",
  openGraph: {
    title: "Product",
    description: "Three layers. One platform. Canyon connects your data, orchestrates AI agents, and deploys to your infrastructure.",
  },
};

export default function Page() {
  return <CanyonProductPage />;
}
