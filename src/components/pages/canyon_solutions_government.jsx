"use client";
import { useState } from "react";

const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const GREEN = "#50FA7B";
const ACCENT = "#FFB464"; // government accent - amber

const EXAMPLES = [
  { category: "Service Delivery", items: [
    { app: "Service delivery dashboard", sources: "Case management, operational DB", by: "Service delivery lead", mock: "bar", color: ACCENT, values: [72, 85, 64, 91, 78, 88] },
    { app: "Case load monitor by region", sources: "Case management, HR system", by: "Operations manager", mock: "line", color: GREEN, values: [820, 860, 910, 880, 950, 1020, 1080] },
    { app: "SLA compliance monitor", sources: "Case DB, SLA definitions", by: "Performance analyst", mock: "bar", color: CYAN, values: [18, 22, 15, 28, 12, 25] },
  ]},
  { category: "Performance & Reporting", items: [
    { app: "KPI reporting for ministers", sources: "Operational DBs, finance", by: "Performance team", mock: "gauge", color: GREEN, values: [82.5] },
    { app: "Budget vs. spend tracker", sources: "Finance system, budget DB", by: "Finance controller", mock: "line", color: "#FF6B6B", values: [4, 6, 5, 8, 12, 15, 18] },
    { app: "Programme milestone tracker", sources: "Project management, KPI DB", by: "Transformation lead", mock: "bar", color: ACCENT, values: [35, 28, 42, 20, 38, 31] },
  ]},
  { category: "Compliance & Audit", items: [
    { app: "Data access audit viewer", sources: "Canyon audit log, identity", by: "Data protection officer", mock: "bar", color: CYAN, values: [120, 95, 140, 80, 115, 105] },
    { app: "FOI response monitor", sources: "FOI case system, deadline DB", by: "Legal/compliance", mock: "line", color: GREEN, values: [1.8, 2.1, 1.5, 2.4, 2.8, 3.1, 2.9] },
    { app: "Procurement compliance", sources: "Procurement system, contracts", by: "Finance team", mock: "grid", color: ACCENT, values: [1,1,0,1,1,0,0, 0,1,1,0,1,1,0, 1,0,1,1,0,1,1] },
  ]},
  { category: "Prototyping", items: [
    { app: "Policy impact modelling", sources: "Operational DBs, external data", by: "Operations manager", mock: "bar", color: ACCENT, values: [15, 8, 22, 12, 18, 5] },
    { app: "Inter-agency data sharing", sources: "Federated sources, identity", by: "Service delivery lead", mock: "gauge", color: "#FF6B6B", values: [67.3] },
    { app: "Benefits eligibility checker", sources: "Benefits DB, rules engine", by: "Service delivery lead", mock: "grid", color: CYAN, values: [1,0,1,1,0,0,1, 1,1,0,1,1,0,0, 0,1,1,0,1,1,0] },
  ]},
];

function MockScreenshot({ mock, color, values }) {
  const h = 80, w = 200;
  if (mock === "line") {
    const max = Math.max(...values), min = Math.min(...values), range = max - min || 1;
    const points = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`).join(" ");
    return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}><polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" /><polyline points={`0,${h} ${points} ${w},${h}`} fill={color} opacity="0.08" /></svg>);
  }
  if (mock === "bar") {
    const max = Math.max(...values.map(Math.abs)), barW = w / values.length - 4;
    return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>{values.map((v, i) => (<rect key={i} x={i * (w / values.length) + 2} y={h - (Math.abs(v) / max) * (h - 10)} width={barW} height={(Math.abs(v) / max) * (h - 10)} rx="3" fill={color} opacity="0.5" />))}</svg>);
  }
  if (mock === "gauge") {
    const pct = values[0] / 100;
    return (<svg viewBox="0 0 100 60" style={{ width: "100%", height: 70 }}><path d="M15 55 A35 35 0 0 1 85 55" fill="none" stroke="rgba(240,224,219,0.08)" strokeWidth="6" strokeLinecap="round" /><path d={`M15 55 A35 35 0 0 1 ${15 + 70 * pct} ${55 - Math.sin(Math.PI * pct) * 35}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.7" /><text x="50" y="50" textAnchor="middle" fill="rgba(240,224,219,0.7)" fontSize="14" fontWeight="700" fontFamily="Outfit">{values[0]}%</text></svg>);
  }
  if (mock === "grid") {
    const cols = 7;
    return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>{values.map((v, i) => (<rect key={i} x={(i % cols) * 28 + 4} y={Math.floor(i / cols) * 24 + 4} width="22" height="18" rx="3" fill={v ? color : "rgba(240,224,219,0.05)"} opacity={v ? 0.5 : 1} />))}</svg>);
  }
  return null;
}

const LOGO_B64 = null; // removed, using /logo.png

export default function CanyonSolutionsGovt() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(0);

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
          .shero-title{font-size:28px !important}
          .ssection-title{font-size:22px !important}
          .sgrid-2{grid-template-columns:1fr !important}
          .sgrid-3{grid-template-columns:1fr 1fr !important}
          .scat-tabs{flex-direction:column !important;gap:0 !important}
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 120% 50% at 50% -5%, rgba(255,180,100,0.04) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 10% 80%, rgba(66,59,87,0.2) 0%, transparent 45%)`
      }} />

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(66,59,87,0.2)", background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          <img src={"/logo.png"} alt="Canyon" style={{ height: 20, width: "auto" }} />
        </a>
        <nav className="pnav-items" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Product", "Solutions", "Security", "Resources", "Company"].map((label, i) => (
            <button key={i} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: label === "Solutions" ? 700 : 500, color: label === "Solutions" ? "#F0E0DB" : "rgba(240,224,219,0.5)", padding: "4px 0" }}>{label}</button>
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

        <div style={{ paddingTop: 24, display: "flex", alignItems: "center", gap: 6 }}>
          <a href="/solutions" style={{ fontSize: 12, color: "rgba(240,224,219,0.35)", textDecoration: "none" }}>Solutions</a>
          <span style={{ fontSize: 10, color: "rgba(240,224,219,0.2)" }}>/</span>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>Government & Public Sector</span>
        </div>

        {/* HERO */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: ACCENT, padding: "4px 10px", background: "rgba(255,180,100,0.08)", border: "1px solid rgba(255,180,100,0.2)", borderRadius: 5 }}>Government & Public Sector</span>
          </div>
          <h1 className="shero-title" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 12px", maxWidth: 480 }}>
            Same tools enterprises need. Stricter rules.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, maxWidth: 500, margin: 0 }}>
            Canyon deploys entirely within your infrastructure. No data leaves your network. Full audit trail. Air-gapped support.
          </p>
        </section>

        {/* EXAMPLES */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 className="ssection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: 0 }}>
              What government teams build
            </h2>
            <a href="/examples?function=government" style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textDecoration: "none", whiteSpace: "nowrap" }}>View all →</a>
          </div>
          <div className="scat-tabs" style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {EXAMPLES.map((cat, i) => (
              <button key={i} onClick={() => setOpenCategory(i)} style={{ padding: "8px 14px", borderRadius: 7, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", transition: "all 0.15s", background: openCategory === i ? "rgba(255,180,100,0.1)" : "rgba(54,50,72,0.2)", border: `1px solid ${openCategory === i ? "rgba(255,180,100,0.25)" : "rgba(66,59,87,0.25)"}`, color: openCategory === i ? ACCENT : "rgba(240,224,219,0.5)" }}>{cat.category}</button>
            ))}
          </div>
          <div className="sgrid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, animation: "fadeUp 0.2s ease" }}>
            {EXAMPLES[openCategory].items.map((ex, i) => (
              <div key={i} style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "border-color 0.15s, transform 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(66,59,87,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(66,59,87,0.25)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ background: "rgba(13,13,15,0.6)", padding: "12px 12px 0", borderBottom: "1px solid rgba(66,59,87,0.15)" }}>
                  <div style={{ background: "rgba(54,50,72,0.15)", borderRadius: "8px 8px 0 0", padding: "6px 8px 0", overflow: "hidden" }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                    </div>
                    <MockScreenshot mock={ex.mock} color={ex.color} values={ex.values} />
                  </div>
                </div>
                <div style={{ padding: "14px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 6 }}>{ex.app}</div>
                  <div style={{ fontSize: 11, color: CYAN, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>{ex.sources}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,224,219,0.35)" }}>Built by {ex.by}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WALKTHROUGH */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="ssection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 20px" }}>
            Prototype to production, no rebuild
          </h2>
          <div style={{ fontSize: 15, color: "rgba(240,224,219,0.45)", lineHeight: 1.6, marginBottom: 20, maxWidth: 560 }}>
            
          </div>
          <div className="sgrid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ background: "rgba(255,166,138,0.04)", border: "1px solid rgba(255,166,138,0.12)", borderRadius: 12, padding: "18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#FFA68A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Without Canyon</div>
              <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.7 }}>
                A transformation lead builds a demo in Retool for ministerial review. It gets approved. Now it needs to be rebuilt from scratch with data sovereignty compliance.
              </div>
            </div>
            <div style={{ background: "rgba(80,250,123,0.04)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 12, padding: "18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>With Canyon</div>
              <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.7 }}>
                Same prototype runs on real operational data, deploys to your infrastructure, access controls enforced from day one. If approved, it IS the production app. No rebuild.
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section style={{ paddingBottom: 48 }}>
          <div className="sgrid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "No data leaves your network", body: "On-premise, sovereign cloud, or air-gapped. No external processing. Citizen data stays where it belongs.", color: ACCENT },
              { label: "Immutable audit trail", body: "Every deployment, every data access, every action. Exportable for compliance, FOI, or internal audit.", color: GREEN },
              { label: "Works with legacy systems", body: "Government can't always adopt cloud-first. Canyon connects to legacy DBs, document stores, and case systems.", color: CRIMSON },
              { label: "Open source, inspectable", body: "Agent orchestration and deployment frameworks are open source. Code transparency for procurement compliance.", color: CYAN },
            ].map((v, i) => (
              <div key={i} style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 12, padding: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: v.color }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.95)" }}>{v.label}</span>
                </div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.6 }}>{v.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", paddingBottom: 60 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 8 }}>See it for your organisation.</div>
          <div style={{ fontSize: 15, color: "rgba(240,224,219,0.45)", marginBottom: 24 }}>30 minutes. Your infrastructure. A real service delivery use case.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", borderRadius: 10, padding: "14px 28px", color: "#F0E0DB", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(255,68,68,0.15)" }}>Book a Demo</button>
            <a href="/solutions" style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(66,59,87,0.35)", borderRadius: 10, padding: "14px 28px", color: "rgba(240,224,219,0.6)", fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "inherit" }}>All Solutions</a>
          </div>
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
