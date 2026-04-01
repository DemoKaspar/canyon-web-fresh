"use client";
import { useState } from "react";
const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const LOGO_B64 = null; // removed, using /logo.png

const SECTIONS = [
  { id: "data", label: "Data Sources", headline: "Connect to your data where it lives.", sub: "No migration. No ETL. No data movement.",
    subsections: [
      { type: "grid", label: "Data Warehouses", items: [
        { name: "Snowflake", desc: "Read-only connector. Governance enforced." },
        { name: "BigQuery", desc: "Native connector. No data movement." },
        { name: "Redshift", desc: "Direct query with access control." },
        { name: "Databricks", desc: "Delta Lake and Unity Catalog compatible." },
        { name: "MS Fabric", desc: "Lakehouse and warehouse support." },
        { name: "ClickHouse", desc: "High-performance analytical queries." },
        { name: "SAP HANA", desc: "Direct integration with SAP landscapes." },
      ]},
      { type: "table", label: "Data Lakes", items: [
        { name: "Amazon S3", how: "Queried in place via Canyon's federation layer." },
        { name: "Azure Data Lake (ADLS)", how: "Native connector. Parquet, Delta, CSV." },
        { name: "Google Cloud Storage", how: "Direct access to lake-format data." },
      ]},
      { type: "table", label: "Operational Databases", items: [
        { name: "PostgreSQL", how: "Direct connector for read and read/write workloads." },
        { name: "MySQL", how: "Read-only connector with governance." },
        { name: "MongoDB", how: "Document store connector." },
        { name: "SQL Server", how: "ODBC connector with RBAC enforcement." },
      ]},
      { type: "table", label: "BI & Analytics", items: [
        { name: "Tableau", how: "Metric definitions ingested to bootstrap ontology." },
        { name: "Looker", how: "LookML models imported into semantic layer." },
        { name: "Power BI", how: "DAX measures and dimensions ingested." },
        { name: "dbt", how: "Model definitions imported. Metrics carry over." },
      ]},
    ],
  },
  { id: "identity", label: "Identity", headline: "Every app inherits your identity provider.", sub: "No new user accounts. No separate access management.",
    subsections: [
      { type: "grid", items: [
        { name: "Okta", desc: "SAML 2.0 / OIDC. Roles and groups inherited." },
        { name: "Microsoft Entra ID", desc: "Azure AD integration. Conditional access respected." },
        { name: "Google Workspace", desc: "Google SSO with group-based RBAC." },
        { name: "Generic SAML", desc: "Any SAML 2.0 compatible IdP." },
        { name: "Generic OIDC", desc: "Any OpenID Connect compatible provider." },
      ]},
    ],
  },
  { id: "ai", label: "AI Tools", headline: "Context injection for any AI tool.", sub: "Canyon injects enterprise context via MCP.",
    subsections: [
      { type: "grid", label: "AI Coding Tools", items: [
        { name: "Claude Code", desc: "Full MCP integration." },
        { name: "Cursor", desc: "MCP context injection." },
        { name: "Lovable", desc: "Enterprise context layer." },
        { name: "GitHub Copilot", desc: "VS Code integration." },
        { name: "Custom tooling", desc: "Any MCP-compatible tool." },
      ]},
      { type: "table", label: "Model Providers", items: [
        { name: "Anthropic (Claude)", how: "Full model support. Canyon is model-agnostic." },
        { name: "OpenAI (GPT-4, GPT-4o)", how: "API integration via Canyon's orchestration." },
        { name: "Google (Gemini)", how: "Supported via standard API." },
        { name: "Mistral", how: "European-hosted models supported." },
        { name: "Custom / self-hosted", how: "Any model accessible via API." },
      ]},
    ],
  },
  { id: "deploy", label: "Deployment", headline: "Deploy to your environment. We never touch it.",
    subsections: [
      { type: "table", label: "Cloud Runtimes", items: [
        { name: "AWS EKS", how: "Kubernetes on AWS. Full support." },
        { name: "AWS ECS Fargate", how: "Serverless containers." },
        { name: "Azure AKS", how: "Kubernetes on Azure." },
        { name: "Azure Container Apps", how: "Managed container runtime." },
        { name: "GCP GKE", how: "Kubernetes on Google Cloud." },
        { name: "GCP Cloud Run", how: "Serverless containers." },
        { name: "On-premise", how: "Any container runtime. Air-gapped supported." },
      ]},
      { type: "table", label: "Cloud Resources", items: [
        { name: "RDS / Aurora / Azure SQL / Cloud SQL", how: "Managed databases provisioned automatically." },
        { name: "S3 / Blob Storage / Cloud Storage", how: "Object storage for generated apps." },
        { name: "Route53 / Azure DNS / Cloud DNS", how: "DNS and routing configured." },
      ]},
      { type: "table", label: "CI/CD", items: [
        { name: "GitHub Actions", how: "Native pipeline integration." },
        { name: "GitLab CI", how: "Pipeline hooks supported." },
        { name: "Canyon Deploy Engine", how: "Built-in zero-config deployment." },
        { name: "Custom CI/CD", how: "Webhook-based integration." },
      ]},
    ],
  },
  { id: "security", label: "Security", headline: "Plugs into your existing security stack.",
    subsections: [
      { type: "table", items: [
        { name: "Semgrep", how: "Static code analysis in deploy pipeline." },
        { name: "GitLeaks", how: "Secret scanning before deployment." },
        { name: "Trivy", how: "Container vulnerability scanning." },
        { name: "Tenable", how: "Vulnerability management integration." },
        { name: "Syft", how: "SBOM generation for every build." },
      ]},
    ],
  },
  { id: "observability", label: "Observability", headline: "Audit logs go where your data already goes.",
    subsections: [
      { type: "table", items: [
        { name: "Datadog", how: "Metrics and audit log export." },
        { name: "Grafana", how: "Dashboard integration for Canyon metrics." },
        { name: "Splunk", how: "Audit trail export for SIEM." },
        { name: "Canyon Audit Interface", how: "Built-in query interface for audit logs." },
      ]},
    ],
  },
  { id: "apis", label: "APIs", headline: "Internal APIs surfaced semantically to AI tools.",
    subsections: [
      { type: "table", items: [
        { name: "REST / OpenAPI", how: "Specs ingested. Endpoints discoverable by AI." },
        { name: "Internal microservices", how: "Registered as governed endpoints." },
        { name: "Third-party SaaS APIs", how: "Mapped with auth handled by Canyon." },
        { name: "MCP servers", how: "Native Model Context Protocol support." },
      ]},
    ],
  },
];

export default function CanyonIntegrations() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:0px}
        ::-webkit-scrollbar-thumb{background:transparent}
        @media(max-width:768px){
          .pnav-items{display:none !important}
          .phamburger{display:flex !important}
          .int-logo-grid{grid-template-columns:1fr 1fr !important}
          .int-pills{overflow-x:auto !important;flex-wrap:nowrap !important}
        }
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(66,59,87,0.2)", background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}><img src={"/logo.png"} alt="Canyon" style={{ height: 20 }} /></a>
        <nav className="pnav-items" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Product", "Solutions", "Security", "Resources", "Company"].map((l, i) => (
            <button key={i} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 500, color: "rgba(240,224,219,0.5)", padding: "4px 0" }}>{l}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", color: "#F0E0DB", padding: "7px 18px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Book a Demo</button>
          <button className="phamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "none", background: "transparent", border: "none", cursor: "pointer", padding: 4, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero */}
        <section style={{ paddingTop: 48, paddingBottom: 20 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 8px" }}>Canyon works with your stack. Not instead of it.</h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.45)", margin: "0 0 20px", maxWidth: 560 }}>Connects to what you already have. Makes it all available to AI-generated apps with governance enforced by default.</p>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search integrations..." style={{ width: "100%", maxWidth: 400, padding: "10px 14px", borderRadius: 8, border: "1px solid #2A1F1C", background: "#18181B", color: "#DDBAB1", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
        </section>

        {/* Section pills */}
        <div className="int-pills" style={{ display: "flex", gap: 6, marginBottom: 32, position: "sticky", top: 52, zIndex: 10, background: "rgba(13,13,15,0.95)", padding: "10px 0", borderBottom: "1px solid rgba(42,31,28,0.3)" }}>
          <span style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", alignSelf: "center", marginRight: 6, whiteSpace: "nowrap" }}>Jump to:</span>
          {SECTIONS.map(s => (
            <a key={s.id} href={`#int-${s.id}`} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", background: "#18181B", border: "1px solid #2A1F1C", color: "#DDBAB1", cursor: "pointer" }}>{s.label}</a>
          ))}
        </div>

        {/* Sections */}
        {SECTIONS.map(section => {
          const sectionMatch = !q || section.subsections.some(sub => sub.items.some(item => item.name.toLowerCase().includes(q) || (item.desc||"").toLowerCase().includes(q) || (item.how||"").toLowerCase().includes(q)));
          if (!sectionMatch) return null;
          return (
            <section key={section.id} id={`int-${section.id}`} style={{ paddingBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{section.label}</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 4px" }}>{section.headline}</h2>
              {section.sub && <p style={{ fontSize: 14, color: "rgba(240,224,219,0.35)", margin: "0 0 20px" }}>{section.sub}</p>}

              {section.subsections.map((sub, si) => {
                const items = sub.items.filter(item => !q || item.name.toLowerCase().includes(q) || (item.desc||"").toLowerCase().includes(q) || (item.how||"").toLowerCase().includes(q));
                if (items.length === 0) return null;
                return (
                  <div key={si} style={{ marginBottom: 20 }}>
                    {sub.label && <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.6)", marginBottom: 10 }}>{sub.label}</div>}
                    {sub.type === "grid" ? (
                      <div className="int-logo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                        {items.map((item, j) => (
                          <div key={j} style={{ background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 8, padding: "14px", cursor: "pointer", transition: "border-color 0.15s" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "#532E25"} onMouseLeave={e => e.currentTarget.style.borderColor = "#2A1F1C"}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 4 }}>{item.name}</div>
                            <div style={{ fontSize: 12, color: "rgba(240,224,219,0.4)", lineHeight: 1.4 }}>{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 8, overflow: "hidden" }}>
                        {items.map((item, j) => (
                          <div key={j} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, padding: "12px 16px", borderBottom: j < items.length - 1 ? "1px solid rgba(42,31,28,0.5)" : "none", background: j % 2 === 0 ? "#18181B" : "#0D0D0F" }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(240,224,219,0.7)" }}>{item.name}</div>
                            <div style={{ fontSize: 13, color: "rgba(240,224,219,0.45)" }}>{item.how}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {section.id === "security" && <a href="/security" style={{ fontSize: 14, fontWeight: 600, color: CYAN, textDecoration: "none" }}>Full security posture →</a>}
            </section>
          );
        })}

        {/* Footer callout */}
        <section style={{ background: "#18181B", borderRadius: 14, padding: "32px", textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 8 }}>Not seeing your stack?</div>
          <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", marginBottom: 20 }}>We add integrations continuously. If your tooling is in use at a European enterprise, it's likely already on our roadmap.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", borderRadius: 10, padding: "12px 24px", color: "#F0E0DB", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Book a demo</button>
          </div>
        </section>
      </main>

      <footer style={{ padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 920, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
