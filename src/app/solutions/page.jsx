import CanyonSolutionsIndex from "@/components/pages/canyon_solutions_index";

export const metadata = {
  title: "Solutions",
  description: "Canyon for every team. Operations, Finance, Sales, Data & IT, Customer Success, People, Government.",
  openGraph: {
    title: "Solutions | Canyon",
    description: "Canyon for every team. Business teams describe what they need. Canyon builds it on certified enterprise data.",
  },
};

export default function Page() {
  return <CanyonSolutionsIndex />;
}
