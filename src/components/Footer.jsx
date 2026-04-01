import Link from "next/link";

const CRIMSON = "#FF4444";

const FOOTER_COLS = [
  { title: "Product", links: [
    { label: "Overview", href: "/product" },
    { label: "Semantic Data Layer", href: "/product/semantic-data-layer" },
    { label: "Agent Orchestration", href: "/product/agent-orchestration" },
    { label: "Deployment", href: "/product/deployment" },
    { label: "Security", href: "/security" },
    { label: "Integrations", href: "/integrations" },
  ]},
  { title: "Solutions", links: [
    { label: "Operations", href: "/solutions/operations" },
    { label: "Finance", href: "/solutions/finance" },
    { label: "Sales", href: "/solutions/sales" },
    { label: "Data & IT", href: "/solutions/data-it" },
    { label: "Customer Success", href: "/solutions/customer-success" },
    { label: "People", href: "/solutions/people" },
    { label: "Government", href: "/solutions/government" },
  ]},
  { title: "Resources", links: [
    { label: "Examples", href: "/examples" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Events", href: "/resources/events" },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(66,59,87,0.15)", padding: "48px 28px 24px", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32, marginBottom: 40 }}>
        {/* Logo col */}
        <div>
          <img src="/logo.png" alt="Canyon" style={{ height: 18, marginBottom: 12 }} />
          <div style={{ fontSize: 13, color: "rgba(240,224,219,0.35)", lineHeight: 1.6 }}>
            Enterprise AI Production Platform.
            Certified data. Governed access. Your infrastructure.
          </div>
        </div>
        {FOOTER_COLS.map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.5)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{col.title}</div>
            {col.links.map((link, j) => (
              <Link key={j} href={link.href} style={{ display: "block", fontSize: 13, color: "rgba(240,224,219,0.35)", textDecoration: "none", padding: "3px 0" }}>{link.label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(66,59,87,0.1)", paddingTop: 16 }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.25)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", textDecoration: "none" }}>Imprint</Link>
        </div>
      </div>
    </footer>
  );
}
