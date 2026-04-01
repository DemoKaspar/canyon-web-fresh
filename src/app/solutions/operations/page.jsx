import CanyonSolutionsOperations from "@/components/pages/canyon_solutions_operations";

export const metadata = {
  title: "Canyon for Operations",
  description: "Custom operational tools built by your teams. Shift planners, SLA monitors, maintenance schedulers.",
  openGraph: {
    title: "Canyon for Operations",
    description: "Custom operational tools built by your teams. Shift planners, SLA monitors, maintenance schedulers.",
  },
};

export default function Page() {
  return <CanyonSolutionsOperations />;
}
