"use client";
import { useState } from "react";

const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const LOGO_B64 = null; // removed, using /logo.png

export default function CanyonDataLayerPage() {
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
          .dhero-title{font-size:28px !important}
          .dsection-title{font-size:22px !important}
          .darch-diagram{grid-template-columns:1fr !important}
          .darch-arrow{display:none !important}
          .darch-values{grid-template-columns:1fr 1fr !important}
          .dgrid-2{grid-template-columns:1fr !important}
          .dcert-grid{grid-template-columns:1fr 1fr !important}
          .dexample-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 120% 50% at 50% -5%, rgba(139,233,253,0.06) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 10% 80%, rgba(66,59,87,0.2) 0%, transparent 45%)`
      }} />

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
          <div style={{ position: "relative" }}
            onMouseEnter={e => e.currentTarget.querySelector('.pdropdown').style.opacity = 1}
            onMouseLeave={e => e.currentTarget.querySelector('.pdropdown').style.opacity = 0}
          >
            <button style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, color: "#F0E0DB", padding: "4px 0", display: "flex", alignItems: "center", gap: 3 }}>
              Product <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="pdropdown" style={{ position: "absolute", top: "100%", left: -12, paddingTop: 8, opacity: 0, transition: "opacity 0.15s", pointerEvents: "auto" }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
              <div style={{ background: "rgba(30,28,42,0.95)", border: "1px solid rgba(66,59,87,0.35)", borderRadius: 10, padding: "8px 4px", minWidth: 200, backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                {[
                  { label: "Data Layer", sub: "Certified data & access controls", href: "/product/semantic-data-layer", color: CYAN, active: true },
                  { label: "Agent Orchestration", sub: "Model-agnostic context injection", href: "/product/agent-orchestration", color: CRIMSON },
                  { label: "Deployment", sub: "Your infrastructure, one click", href: "/product/deployment", color: "#50FA7B" },
                ].map((item, j) => (
                  <a key={j} href={item.href} style={{ display: "block", padding: "10px 14px", borderRadius: 7, textDecoration: "none", background: item.active ? "rgba(54,50,72,0.3)" : "transparent" }}>
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
          {["Solutions", "Security", "Resources", "Company"].map((label, i) => (
            <button key={i} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 500, color: "rgba(240,224,219,0.5)", padding: "4px 0" }}>{label}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", color: "#F0E0DB", padding: "7px 18px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Book a Demo</button>
          <button className="phamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "none", background: "transparent", border: "none", cursor: "pointer", padding: 4, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> :
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 25, background: "rgba(13,13,15,0.9)", backdropFilter: "blur(8px)" }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{ padding: "72px 28px 32px", display: "flex", flexDirection: "column", gap: 4 }} onClick={e => e.stopPropagation()}>
            {["Product", "Solutions", "Security", "Resources", "Company"].map(l => (
              <button key={l} onClick={() => setMobileMenuOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 18, fontWeight: 600, color: "#F0E0DB", padding: "14px 0", textAlign: "left", borderBottom: "1px solid rgba(66,59,87,0.2)" }}>{l}</button>
            ))}
          </div>
        </div>
      )}

      <main style={{ position: "relative", zIndex: 5, maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>

        {/* Breadcrumb */}
        <div style={{ paddingTop: 24, display: "flex", alignItems: "center", gap: 6 }}>
          <a href="/product" style={{ fontSize: 12, color: "rgba(240,224,219,0.35)", textDecoration: "none" }}>Product</a>
          <span style={{ fontSize: 10, color: "rgba(240,224,219,0.2)" }}>/</span>
          <span style={{ fontSize: 12, color: CYAN, fontWeight: 600 }}>Data Layer</span>
        </div>

        {/* ============================================ */}
        {/* 1. HERO. the promise                       */}
        {/* ============================================ */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: CYAN, padding: "4px 10px", background: "rgba(139,233,253,0.08)", border: "1px solid rgba(139,233,253,0.2)", borderRadius: 5 }}>Data Layer</span>
          </div>
          <h1 className="dhero-title" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 12px", maxWidth: 520 }}>
            Your enterprise data, securely accessible for AI.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
            One semantic model. Certified metrics. Governed queries cached and shared across every app.
          </p>
        </section>

        {/* ============================================ */}
        {/* 2. DIAGRAM. how it works architecturally   */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{
            background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.25)",
            borderRadius: 16, padding: "28px 24px", overflow: "hidden",
          }}>
            <div className="darch-diagram" style={{ display: "grid", gridTemplateColumns: "130px auto 1fr auto 130px", gap: 0, alignItems: "center" }}>

              {/* LEFT: Data sources */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>Your Data</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {["Snowflake", "BigQuery", "Redshift", "SAP HANA", "Databricks", "Postgres", "REST APIs"].map(s => (
                    <div key={s} style={{ padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.3)", color: "rgba(240,224,219,0.6)", textAlign: "center" }}>{s}</div>
                  ))}
                </div>
              </div>

              {/* Arrow → */}
              <div className="darch-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                <div style={{ width: 20, height: 1, background: "rgba(139,233,253,0.2)" }} />
                <div style={{ width: 0, height: 0, borderLeft: "5px solid rgba(139,233,253,0.3)", borderTop: "3px solid transparent", borderBottom: "3px solid transparent" }} />
              </div>

              {/* CENTER: Canyon Data Layer */}
              <div style={{
                background: "linear-gradient(135deg, rgba(139,233,253,0.06), rgba(139,233,253,0.02))",
                border: "1px solid rgba(139,233,253,0.15)", borderRadius: 14, padding: "16px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: CYAN, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Canyon Data Layer</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Semantic Model", sub: "Entities, relationships, business glossary", gradient: "linear-gradient(135deg, rgba(139,233,253,0.15), rgba(139,233,253,0.05))", border: "rgba(139,233,253,0.25)" },
                    { label: "Access Control", sub: "SSO, RBAC, row & column-level", gradient: "linear-gradient(135deg, rgba(100,180,255,0.15), rgba(100,180,255,0.05))", border: "rgba(100,180,255,0.25)" },
                    { label: "Query Cache", sub: "Shared pre-computed results across all apps", gradient: "linear-gradient(135deg, rgba(255,180,100,0.15), rgba(255,180,100,0.05))", border: "rgba(255,180,100,0.25)" },
                    { label: "Certified Metrics", sub: "Versioned, owned, one definition per KPI", gradient: "linear-gradient(135deg, rgba(255,68,120,0.15), rgba(255,68,120,0.05))", border: "rgba(255,68,120,0.25)" },
                  ].map((c, i) => (
                    <div key={i} style={{ background: c.gradient, border: `1px solid ${c.border}`, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 3 }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: "rgba(240,224,219,0.45)", lineHeight: 1.4 }}>{c.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "rgba(240,224,219,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
                  Exposes governed, versioned APIs
                </div>
              </div>

              {/* Arrow → */}
              <div className="darch-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                <div style={{ width: 20, height: 1, background: "rgba(139,233,253,0.2)" }} />
                <div style={{ width: 0, height: 0, borderLeft: "5px solid rgba(139,233,253,0.3)", borderTop: "3px solid transparent", borderBottom: "3px solid transparent" }} />
              </div>

              {/* RIGHT: What consumes the APIs */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>Via MCP</div>
                <div style={{
                  background: "linear-gradient(135deg, rgba(255,68,68,0.06), rgba(255,68,68,0.02))",
                  border: "1px solid rgba(255,68,68,0.15)", borderRadius: 10, padding: "10px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, marginBottom: 8, textAlign: "center" }}>Agent Orchestration</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {["OpenAI", "Anthropic", "Custom LLMs", "Claude Code", "Cursor"].map(s => (
                      <div key={s} style={{ padding: "4px 6px", borderRadius: 5, fontSize: 10, background: "rgba(13,13,15,0.5)", color: "rgba(240,224,219,0.5)", textAlign: "center" }}>{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom value props */}
            <div className="darch-values" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(66,59,87,0.18)" }}>
              {[
                { label: "Consistent", sub: "One definition per metric", color: CYAN },
                { label: "Governed", sub: "Access enforced at query time", color: "#64B4FF" },
                { label: "Shared", sub: "Cached results across all apps", color: "#FFB464" },
                { label: "Stable", sub: "Versioned APIs, not raw tables", color: "#FF4478" },
              ].map((v, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: "100%", height: 2, background: v.color, borderRadius: 1, marginBottom: 8 }} />
                  <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.9)" }}>{v.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,224,219,0.45)", marginTop: 2 }}>{v.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 3. HOW QUERIES WORK. the caching story     */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="dsection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 8px" }}>
            Query once. Share everywhere.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", margin: "0 0 24px", maxWidth: 520 }}>
            Certified metrics are pre-computed, cached, and shared. Every app pulls the same governed result.
          </p>

          {/* Visual: query sharing diagram */}
          <div style={{
            background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.2)",
            borderRadius: 14, padding: "24px", marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Warehouse</div>
                <div style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.3)", fontSize: 12, color: "rgba(240,224,219,0.5)" }}>Snowflake</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 20, height: 1, background: "rgba(240,224,219,0.15)" }} />
                <div style={{ fontSize: 10, padding: "2px 8px", background: "rgba(139,233,253,0.08)", border: "1px solid rgba(139,233,253,0.15)", borderRadius: 4, color: CYAN, fontWeight: 600, whiteSpace: "nowrap" }}>query once</div>
                <div style={{ width: 20, height: 1, background: "rgba(240,224,219,0.15)" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: CYAN, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Cache</div>
                <div style={{
                  padding: "10px 18px", borderRadius: 8,
                  background: "linear-gradient(135deg, rgba(139,233,253,0.12), rgba(139,233,253,0.04))",
                  border: "1px solid rgba(139,233,253,0.2)",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(240,224,219,0.9)" }}>gross_margin</div>
                  <div style={{ fontSize: 10, color: "rgba(240,224,219,0.35)", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>certified · cached · governed</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 20, height: 1, background: "rgba(240,224,219,0.15)" }} />
                <div style={{ fontSize: 10, padding: "2px 8px", background: "rgba(80,250,123,0.08)", border: "1px solid rgba(80,250,123,0.15)", borderRadius: 4, color: "#50FA7B", fontWeight: 600, whiteSpace: "nowrap" }}>shared</div>
                <div style={{ width: 20, height: 1, background: "rgba(240,224,219,0.15)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {["Operations Dashboard", "CFO Report", "Sales App", "AI Agent"].map(a => (
                  <div key={a} style={{ padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.3)", color: "rgba(240,224,219,0.6)", textAlign: "center" }}>{a}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Before/after. part of the query story */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(240,224,219,0.7)", marginBottom: 12 }}>In practice: "Gross Margin by Region"</div>
            <div className="dexample-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "rgba(255,166,138,0.04)", border: "1px solid rgba(255,166,138,0.12)", borderRadius: 12, padding: "18px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#FFA68A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Without Canyon</div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.7 }}>
                  App A queries <code style={{ color: "#FFA68A", fontSize: 13 }}>revenue_table</code> directly. App B uses a different table. Finance reports a third number. Three apps, three definitions, three answers.
                </div>
              </div>
              <div style={{ background: "rgba(80,250,123,0.04)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 12, padding: "18px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#50FA7B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>With Canyon</div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.7 }}>
                  All three request <code style={{ color: "#50FA7B", fontSize: 13 }}>gross_margin</code> from Canyon. Same cached result. Access checked per user. One definition. One number. Everywhere.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 4. WHAT THE ONTOLOGY CONTAINS               */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="dsection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 8px" }}>
            What Canyon learns about your data
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", margin: "0 0 24px", maxWidth: 520 }}>
            Canyon builds a living enterprise ontology. not a static dictionary, but a model that evolves as your data estate grows.
          </p>
          <div className="dgrid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Entities", body: "Core business objects. customers, orders, production lines. mapped once, reused everywhere.", color: CYAN },
              { label: "Relationships", body: "How entities connect across systems. Which order belongs to which customer. Mapped once, enforced everywhere.", color: CYAN },
              { label: "Certified Metrics", body: "One definition per KPI. Owned. Versioned. Every app that asks for gross margin gets the same answer.", color: CRIMSON },
              { label: "Business Glossary", body: "Natural language descriptions AI tools consume when generating code. No hallucinated column names.", color: "#50FA7B" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 12, padding: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: item.color }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.95)" }}>{item.label}</span>
                </div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.6 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* 5. CERTIFICATION FLOW                       */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="dsection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 8px" }}>
            From unknown source to certified metric
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", margin: "0 0 24px", maxWidth: 520 }}>
            Canyon doesn't require a perfect data estate to start. Unknown sources get discovered, clarified, and certified collaboratively.
          </p>
          <div className="dcert-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            {[
              { step: "01", label: "Discover", body: "New source connected. Canyon reads schemas, infers relationships.", color: "rgba(240,224,219,0.3)" },
              { step: "02", label: "Clarify", body: "Canyon asks targeted questions. Your team fills gaps and links to existing concepts.", color: "rgba(240,224,219,0.45)" },
              { step: "03", label: "Certify", body: "Definition approved, versioned, published. Available via stable API.", color: CYAN },
              { step: "04", label: "Evolve", body: "Logic changes? Old definitions versioned. Dependent apps flagged automatically.", color: CRIMSON },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: 1, marginBottom: 6 }}>{s.step}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: "rgba(240,224,219,0.45)", lineHeight: 1.5 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* 6. INTEGRATIONS. table + hub link           */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="dsection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 20px" }}>
            What it connects to
          </h2>
          <div style={{ background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.2)", borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
            {[
              { source: "Snowflake / BigQuery / Redshift", how: "Read-only connector. Governance enforced. No data movement." },
              { source: "Databricks / MS Fabric", how: "Delta Lake and Unity Catalog compatible." },
              { source: "Tableau / Looker / Power BI", how: "Ingest existing definitions to bootstrap the ontology." },
              { source: "REST APIs / internal services", how: "Mapped as governed endpoints. Auth handled by Canyon." },
              { source: "S3 / data lakes", how: "Queried in place via Canyon's federation layer." },
              { source: "Postgres / operational DBs", how: "Direct connector for read/write workloads." },
            ].map((row, i, arr) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 16, padding: "14px 18px", borderBottom: i < arr.length - 1 ? "1px solid rgba(66,59,87,0.15)" : "none" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(240,224,219,0.7)" }}>{row.source}</div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)" }}>{row.how}</div>
              </div>
            ))}
          </div>
          <a href="/integrations" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 600, color: CYAN, textDecoration: "none",
          }}>
            See the full integration catalog <span style={{ fontSize: 16 }}>→</span>
          </a>
        </section>

        {/* Navigation */}
        <section style={{ paddingBottom: 60, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <a href="/product" style={{ fontSize: 14, color: "rgba(240,224,219,0.4)", textDecoration: "none" }}>← Back to Product</a>
          <a href="/product/agent-orchestration" style={{ fontSize: 14, fontWeight: 600, color: CRIMSON, textDecoration: "none" }}>Next: Agent Orchestration →</a>
        </section>
      </main>

      <footer style={{ position: "relative", zIndex: 5, padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 880, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
