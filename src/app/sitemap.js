const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://canyon.tech";

const ROUTES = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/product", priority: 0.9, changefreq: "weekly" },
  { path: "/product/semantic-data-layer", priority: 0.8, changefreq: "monthly" },
  { path: "/product/agent-orchestration", priority: 0.8, changefreq: "monthly" },
  { path: "/product/deployment", priority: 0.8, changefreq: "monthly" },
  { path: "/security", priority: 0.9, changefreq: "monthly" },
  { path: "/examples", priority: 0.8, changefreq: "weekly" },
  { path: "/integrations", priority: 0.7, changefreq: "monthly" },
  { path: "/solutions/operations", priority: 0.7, changefreq: "monthly" },
  { path: "/solutions/finance", priority: 0.7, changefreq: "monthly" },
  { path: "/solutions/sales", priority: 0.7, changefreq: "monthly" },
  { path: "/solutions/data-it", priority: 0.7, changefreq: "monthly" },
  { path: "/solutions/customer-success", priority: 0.7, changefreq: "monthly" },
  { path: "/solutions/people", priority: 0.7, changefreq: "monthly" },
  { path: "/solutions/government", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/blog", priority: 0.6, changefreq: "weekly" },
  { path: "/resources/events", priority: 0.6, changefreq: "weekly" },
];

export default function sitemap() {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));
}
