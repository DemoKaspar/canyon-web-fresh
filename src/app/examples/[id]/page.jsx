import ExampleDetail from "@/components/pages/canyon_example_detail";

// Generate static params for all examples
export function generateStaticParams() {
  const ids = [
    "defect-monitor", "shift-planner", "partner-onboarding", "sla-monitor",
    "maintenance-scheduler", "board-pnl", "budget-variance", "metric-reconciliation",
    "pipeline-health", "partner-incentive", "campaign-roi", "account-health",
    "churn-risk", "headcount-tracker", "attrition-monitor", "app-inventory",
    "shadow-ai", "service-delivery", "audit-viewer",
  ];
  return ids.map((id) => ({ id }));
}

export function generateMetadata({ params }) {
  const title = params.id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} | Canyon Examples`,
    description: `See how Canyon builds a ${title.toLowerCase()} on certified enterprise data with governance by default.`,
  };
}

export default function Page({ params }) {
  return <ExampleDetail id={params.id} />;
}
