import CanyonSecurity from "@/components/pages/canyon_security";

export const metadata = {
  title: "Security",
  description: "Canyon enforces access control, audit logging, and data governance by default on every deployment. No data movement. Your infrastructure.",
  openGraph: {
    title: "Security",
    description: "Canyon enforces access control, audit logging, and data governance by default on every deployment. No data movement. Your infrastructure.",
  },
};

export default function Page() {
  return <CanyonSecurity />;
}
