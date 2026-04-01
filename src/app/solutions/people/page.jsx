import CanyonSolutionsPeople from "@/components/pages/canyon_solutions_people";

export const metadata = {
  title: "Canyon for People",
  description: "People data is sensitive. Canyon enforces privacy by default with row and column-level permissions.",
  openGraph: {
    title: "Canyon for People",
    description: "People data is sensitive. Canyon enforces privacy by default with row and column-level permissions.",
  },
};

export default function Page() {
  return <CanyonSolutionsPeople />;
}
