import CanyonEvents from "@/components/pages/canyon_events";

export const metadata = {
  title: "Events",
  description: "Conferences, webinars, and meetups. Come see Canyon in action.",
  openGraph: {
    title: "Events",
    description: "Conferences, webinars, and meetups. Come see Canyon in action.",
  },
};

export default function Page() {
  return <CanyonEvents />;
}
