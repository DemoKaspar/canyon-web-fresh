import CanyonBlog from "@/components/pages/canyon_blog";

export const metadata = {
  title: "Blog",
  description: "Product updates, customer stories, and thinking on enterprise AI from the Canyon team.",
  openGraph: {
    title: "Blog",
    description: "Product updates, customer stories, and thinking on enterprise AI from the Canyon team.",
  },
};

export default function Page() {
  return <CanyonBlog />;
}
