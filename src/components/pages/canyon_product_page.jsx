"use client";
import { useState } from "react";

const CRIMSON = "#FF4444";
const LOGO_B64 = null; // removed, using /logo.png

const LAYERS = [
  {
    id: "data-layer",
    icon: "🗄",
    tag: "Data Layer",
    tagColor: "#8BE9FD",
    tagBg: "rgba(139,233,253,0.08)",
    tagBorder: "rgba(139,233,253,0.2)",
    title: "The enterprise ontology",
    subtitle: "Certified data, access controls, and stable APIs for every app, agent, and workflow.",
    body: "Canyon connects to your warehouses, lakes, BI stacks, and APIs. It reads your data, learns what it means, and builds a living semantic model. entities, relationships, certified metrics, governed access. Apps don't query raw tables. They query certified business concepts.",
    connects: ["Snowflake", "BigQuery", "Redshift", "Databricks", "SAP", "Postgres", "REST APIs", "Tableau / Looker / Power BI"],
    serves: [
      "Cached verified queries for performance",
      "On-demand queries for exploration",
      "Governed read/write for apps that need to write back",
      "No data movement. queries in place",
    ],
    openSource: false,
    deepDive: { label: "Deep dive: Data Layer", href: "/product/semantic-data-layer" },
  },
  {
    id: "agent-orchestration",
    icon: "⚡",
    tag: "Agent Orchestration",
    tagColor: CRIMSON,
    tagBg: "rgba(255,68,68,0.08)",
    tagBorder: "rgba(255,68,68,0.2)",
    title: "Model-agnostic context injection",
    subtitle: "Wired to any AI tool or provider.",
    body: "Canyon injects enterprise context. certified data definitions, governance rules, UI standards, deployment policies. into AI tools at generation time via MCP architecture. Works with OpenAI, Anthropic, or any custom model. Works with Claude Code, Cursor, Lovable, or your own tooling.",
    connects: ["Claude Code", "Cursor", "Lovable", "OpenAI", "Anthropic", "Custom models"],
    serves: [
      "Context injection at build time via MCP",
      "Design system and API specs wired in",
      "Governance guardrails enforced before generation",
      "Model-agnostic. swap providers without rebuilding",
    ],
    openSource: true,
    deepDive: { label: "Deep dive: Agent Orchestration", href: "/product/agent-orchestration" },
  },
  {
    id: "deployment",
    icon: "☁",
    tag: "Deployment",
    tagColor: "#50FA7B",
    tagBg: "rgba(80,250,123,0.08)",
    tagBorder: "rgba(80,250,123,0.2)",
    title: "Automatic infrastructure provisioning",
    subtitle: "Your environment, your control.",
    body: "Canyon reads the generated app, identifies infrastructure dependencies, and deploys to your cloud environment. EKS, RDS, S3, or your own stack. Workload identity injected via OIDC/SPIFFE. No static credentials. No parallel IT world.",
    connects: ["AWS", "Azure", "GCP", "ECS / EKS", "Kubernetes", "Your CI/CD"],
    serves: [
      "Zero-config containerization (OCI images)",
      "Workload identity. no static secrets",
      "Deploys through your existing guardrails",
      "Observable and auditable by default",
    ],
    openSource: true,
    deepDive: { label: "Deep dive: Deployment", href: "/product/deployment" },
  },
];

export default function CanyonProductPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:0px}
        ::-webkit-scrollbar-thumb{background:transparent}
        @media(max-width:768px){
          .pnav-items{display:none !important}
          .phamburger{display:flex !important}
          .phero-title{font-size:28px !important}
          .psection-title{font-size:24px !important}
          .player-cards{gap:16px !important}
          .pstep-grid{grid-template-columns:1fr !important}
          .pstep-grid>div:nth-child(2),.pstep-grid>div:nth-child(4){display:none !important}
          .pproof-grid{grid-template-columns:1fr !important}
          .pisnot-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 140% 60% at 50% -5%, rgba(83,46,37,0.25) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 10% 80%, rgba(66,59,87,0.2) 0%, transparent 45%),
          radial-gradient(ellipse 60% 40% at 95% 70%, rgba(255,68,68,0.04) 0%, transparent 40%)`
      }} />

      {/* Topo pattern */}
      <svg style={{ position: "fixed", inset: 0, zIndex: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.03 }}>
        <defs>
          <pattern id="topo" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M0 80 Q50 40 100 80 T200 80" stroke="#DDBAB1" strokeWidth="0.7" fill="none"/>
            <path d="M0 120 Q40 90 100 120 T200 120" stroke="#DDBAB1" strokeWidth="0.5" fill="none"/>
            <path d="M0 160 Q50 135 100 160 T200 160" stroke="#DDBAB1" strokeWidth="0.3" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)"/>
      </svg>

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 20, padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(66,59,87,0.2)",
        background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          <img src={"/logo.png"} alt="Canyon" style={{ height: 20, width: "auto" }} />
        </a>
        <nav className="pnav-items" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Product with dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={e => e.currentTarget.querySelector('.pdropdown').style.opacity = 1}
            onMouseLeave={e => e.currentTarget.querySelector('.pdropdown').style.opacity = 0}
          >
            <button style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 12, fontWeight: 700,
              color: "#F0E0DB", padding: "4px 0", display: "flex", alignItems: "center", gap: 3,
            }}>
              Product
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="pdropdown" style={{
              position: "absolute", top: "100%", left: -12, paddingTop: 8,
              opacity: 0, transition: "opacity 0.15s", pointerEvents: "auto",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0}
            >
              <div style={{
                background: "rgba(30,28,42,0.95)", border: "1px solid rgba(66,59,87,0.35)",
                borderRadius: 10, padding: "8px 4px", minWidth: 200,
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}>
                {[
                  { label: "Data Layer", sub: "Certified data & access controls", href: "/product/semantic-data-layer", color: "#8BE9FD" },
                  { label: "Agent Orchestration", sub: "Model-agnostic context injection", href: "/product/agent-orchestration", color: CRIMSON },
                  { label: "Deployment", sub: "Your infrastructure, one click", href: "/product/deployment", color: "#50FA7B" },
                ].map((item, j) => (
                  <a key={j} href={item.href} style={{
                    display: "block", padding: "10px 14px", borderRadius: 7,
                    textDecoration: "none", transition: "background 0.1s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(54,50,72,0.4)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#F0E0DB" }}>{item.label}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(240,224,219,0.4)", paddingLeft: 12 }}>{item.sub}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Other nav items */}
          {["Solutions", "Security", "Resources", "Company"].map((label, i) => (
            <button key={i} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 12, fontWeight: 500,
              color: "rgba(240,224,219,0.5)", padding: "4px 0", transition: "color 0.15s",
            }}>{label}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => window.open("https://calendly.com", "_blank")} style={{
            background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none",
            color: "#F0E0DB", padding: "7px 18px", borderRadius: 7,
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>Book a Demo</button>
          <button className="phamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
            display: "none", background: "transparent", border: "none", cursor: "pointer",
            padding: 4, width: 32, height: 32, alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> :
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 25, background: "rgba(13,13,15,0.9)", backdropFilter: "blur(8px)" }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{ padding: "72px 28px 32px", display: "flex", flexDirection: "column", gap: 4 }} onClick={e => e.stopPropagation()}>
            {["Product", "Solutions", "Security", "Resources", "Company"].map(l => (
              <button key={l} onClick={() => setMobileMenuOpen(false)} style={{
                background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit",
                fontSize: 18, fontWeight: 600, color: "#F0E0DB", padding: "14px 0", textAlign: "left",
                borderBottom: "1px solid rgba(66,59,87,0.2)",
              }}>{l}</button>
            ))}
          </div>
        </div>
      )}

      <main style={{ position: "relative", zIndex: 5, maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>

        {/* === SECTION 1: OVERVIEW === */}
        <section style={{ paddingTop: 80, paddingBottom: 60 }}>
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <h1 className="phero-title" style={{
              fontSize: 42, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1,
              color: "rgba(240,224,219,0.97)", margin: "0 0 12px", maxWidth: 560,
            }}>
              The enterprise data layer for AI-built software.
            </h1>
            <p style={{ fontSize: 18, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, maxWidth: 520, margin: "0 0 48px" }}>
              Certified data. Governed access. Deployed to your infrastructure.
            </p>

            {/* 3-step visual flow */}
            <div className="pstep-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 0, alignItems: "center" }}>
              {[
                { step: "01", label: "Connect", sub: "Your data sources, schemas, and certified metrics", icon: "🔍", color: "#8BE9FD" },
                null,
                { step: "02", label: "Govern", sub: "SSO, RBAC, audit trails, design system. by default", icon: "🛡️", color: CRIMSON },
                null,
                { step: "03", label: "Deploy", sub: "One click to your AWS / Azure / GCP", icon: "🚀", color: "#50FA7B" },
              ].map((s, i) => s === null ? (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                  <div style={{ width: 24, height: 1, background: "rgba(66,59,87,0.35)" }} />
                  <div style={{ width: 0, height: 0, borderLeft: "5px solid rgba(66,59,87,0.35)", borderTop: "3px solid transparent", borderBottom: "3px solid transparent" }} />
                </div>
              ) : (
                <div key={i} style={{
                  background: "rgba(54,50,72,0.22)", border: "1px solid rgba(66,59,87,0.28)",
                  borderRadius: 14, padding: "20px 16px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: s.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{s.step}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.5 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === SECTION 2: THE PLATFORM === */}
        <section style={{ paddingTop: 40, paddingBottom: 60 }}>
          <h2 className="psection-title" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5, color: "rgba(240,224,219,0.95)", margin: "0 0 6px" }}>
            Three layers. One integrated platform.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, maxWidth: 480, margin: "0 0 36px" }}>
            Data access, AI orchestration, and deployment. integrated and independently available.
          </p>

          <div className="player-cards" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {LAYERS.map((layer, i) => (
                <div key={layer.id} id={layer.id} style={{
                    background: "rgba(54,50,72,0.2)", border: `1px solid ${layer.tagBorder}`,
                    borderRadius: 16, padding: "24px",
                  }}
                >
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>{layer.icon}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
                      color: layer.tagColor, padding: "3px 8px",
                      background: layer.tagBg, border: `1px solid ${layer.tagBorder}`,
                      borderRadius: 5,
                    }}>{layer.tag}</span>
                    {layer.openSource && (
                      <span style={{
                        fontSize: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase",
                        color: "#50FA7B", padding: "3px 7px",
                        background: "rgba(80,250,123,0.06)", border: "1px solid rgba(80,250,123,0.15)",
                        borderRadius: 5,
                      }}>Open Source</span>
                    )}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 4 }}>{layer.title}</div>
                  <div style={{ fontSize: 15, color: "rgba(240,224,219,0.5)", marginBottom: 16 }}>{layer.subtitle}</div>

                  <div className="pisnot-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
                        {layer.id === "data-layer" ? "Connects to" : layer.id === "agent-orchestration" ? "Works with" : "Deploys to"}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {layer.connects.map(c => (
                          <span key={c} style={{
                            fontSize: 12, padding: "5px 10px", borderRadius: 5,
                            background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.25)",
                            color: "rgba(240,224,219,0.55)",
                          }}>{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>How it works</div>
                      {layer.serves.map((s, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                          <span style={{ color: layer.tagColor, fontSize: 8, marginTop: 5, flexShrink: 0 }}>●</span>
                          <span style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.5 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deep dive link */}
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(66,59,87,0.18)" }}>
                    <a href={layer.deepDive.href} style={{
                      fontSize: 14, fontWeight: 600, color: layer.tagColor,
                      textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5,
                    }}>
                      {layer.deepDive.label} <span style={{ fontSize: 14 }}>→</span>
                    </a>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* === SECTION 3: IN PRODUCTION === */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <h2 className="psection-title" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5, color: "rgba(240,224,219,0.95)", margin: "0 0 32px" }}>
            In production.
          </h2>

          {/* Logos */}
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 28, flexWrap: "wrap", marginBottom: 36, opacity: 0.35 }}>
            {["SIXT", "Cimpress", "Fortescue", "E.ON", "PayPal", "Rohlik"].map(n => (
              <span key={n} style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#F0E0DB" }}>{n}</span>
            ))}
          </div>

          {/* Big numbers */}
          <div className="pproof-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
            {[
              { number: "240+", label: "apps deployed at a single enterprise", sub: "in production, not prototypes" },
              { number: "5 min", label: "from prompt to production", sub: "including governance & deployment" },
              { number: "70+", label: "apps built in the first week", sub: "by non-engineers, on real data" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.28)",
                borderRadius: 14, padding: "28px 20px",
              }}>
                <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: -2, lineHeight: 1, color: "#F0E0DB", marginBottom: 10 }}>{s.number}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(240,224,219,0.55)", marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{
            borderLeft: `3px solid ${CRIMSON}`, paddingLeft: 20, marginBottom: 40,
          }}>
            <div style={{ fontSize: 18, color: "rgba(240,224,219,0.6)", fontStyle: "italic", lineHeight: 1.6 }}>
              "Fantastic timing. this is exactly what we need now."
            </div>
            <div style={{ fontSize: 14, color: "rgba(240,224,219,0.4)", marginTop: 6 }}>VP Technology. Global manufacturer, $2B+ revenue</div>
          </div>
        </section>

        {/* === IS / IS NOT === */}
        <section style={{ paddingBottom: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "rgba(240,224,219,0.85)", margin: "0 0 20px" }}>
            What Canyon is. and is not
          </h3>
          <div className="pisnot-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
            padding: "24px", background: "rgba(54,50,72,0.15)",
            border: "1px solid rgba(66,59,87,0.22)", borderRadius: 14,
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#50FA7B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Canyon is</div>
              {[
                "The governed semantic layer for enterprise AI applications",
                "Certified metrics and business entities that every app reuses",
                "Access control enforcement at the data layer, not the app layer",
                "Stable, versioned APIs for apps, workflows, and agents",
                "Deployment rails to your infrastructure with full auditability",
                "Tool-agnostic. works with Claude Code, Cursor, Lovable, or any AI tool",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 8 }}>
                  <span style={{ color: "#50FA7B", fontSize: 10, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 15, color: "rgba(240,224,219,0.55)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#FFA68A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Canyon is not</div>
              {[
                "Your data warehouse (we don't store or move your data)",
                "Your identity provider (we integrate with Okta, Entra ID, etc.)",
                "A low-code app builder (we complement builders, not replace them)",
                "Your AppSec scanner (we integrate with your security tooling)",
                "A BI tool (we're the layer that makes BI, apps, and agents consistent)",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 8 }}>
                  <span style={{ color: "#FFA68A", fontSize: 10, marginTop: 3 }}>✗</span>
                  <span style={{ fontSize: 15, color: "rgba(240,224,219,0.55)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CTAs === */}
        <section style={{ textAlign: "center", paddingTop: 20, paddingBottom: 80 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 8 }}>See it on your data.</div>
          <div style={{ fontSize: 15, color: "rgba(240,224,219,0.45)", marginBottom: 28 }}>30 minutes. Your stack. A real use case from your team.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => window.open("https://calendly.com", "_blank")} style={{
              background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none",
              borderRadius: 10, padding: "14px 28px", color: "#F0E0DB",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 20px rgba(255,68,68,0.15)",
            }}>Book a Demo</button>
            <button style={{
              background: "transparent", border: "1px solid rgba(66,59,87,0.35)",
              borderRadius: 10, padding: "14px 28px", color: "rgba(240,224,219,0.6)",
              fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>Read the Docs</button>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 24 }}>
            <span style={{ fontSize: 14, color: "rgba(240,224,219,0.4)" }}>→ Security</span>
            <span style={{ fontSize: 14, color: "rgba(240,224,219,0.4)" }}>→ Solutions</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        position: "relative", zIndex: 5, padding: "40px 28px 24px",
        borderTop: "1px solid rgba(66,59,87,0.15)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: 880, margin: "0 auto",
      }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
