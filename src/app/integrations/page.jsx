import CanyonIntegrations from "@/components/pages/canyon_integrations";

export const metadata = {
  title: "Integrations",
  description: "Canyon integrates with Snowflake, BigQuery, SAP, Okta, Entra ID, AWS, GitHub Actions, Semgrep, and 40+ more enterprise tools.",
  openGraph: {
    title: "Integrations",
    description: "Canyon integrates with Snowflake, BigQuery, SAP, Okta, Entra ID, AWS, GitHub Actions, Semgrep, and 40+ more enterprise tools.",
  },
};

export default function Page() {
  return <CanyonIntegrations />;
}
