import CanyonAgentOrchestrationPage from "@/components/pages/canyon_agent_orchestration_page";

export const metadata = {
  title: "Agent Orchestration",
  description: "Model-agnostic orchestration with enterprise context injection. Open source.",
  openGraph: {
    title: "Agent Orchestration",
    description: "Model-agnostic orchestration with enterprise context injection. Open source.",
  },
};

export default function Page() {
  return <CanyonAgentOrchestrationPage />;
}
