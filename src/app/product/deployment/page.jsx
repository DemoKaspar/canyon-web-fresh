import CanyonDeploymentPage from "@/components/pages/canyon_deployment_page";

export const metadata = {
  title: "Deployment",
  description: "One-click deployment to your infrastructure. AWS, Azure, GCP, on-premise, air-gapped.",
  openGraph: {
    title: "Deployment",
    description: "One-click deployment to your infrastructure. AWS, Azure, GCP, on-premise, air-gapped.",
  },
};

export default function Page() {
  return <CanyonDeploymentPage />;
}
