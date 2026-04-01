import CanyonDemo from "@/components/pages/canyon_interactive_demo";

export const metadata = {
  title: null,
  description: "Certified data. Governed access. Deployed to your infrastructure. Canyon is the enterprise data layer for AI-built software.",
  openGraph: {
    title: "Canyon | Enterprise AI Production Platform",
    description: "Certified data. Governed access. Deployed to your infrastructure. Canyon is the enterprise data layer for AI-built software.",
  },
};

export default function Page() {
  return <CanyonDemo />;
}
