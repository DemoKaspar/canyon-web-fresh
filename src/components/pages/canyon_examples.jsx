"use client";
import { useState } from "react";
const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const GREEN = "#50FA7B";
const LOGO_B64 = null; // removed, using /logo.png

const FUNCTIONS = ["All", "Operations", "Finance", "Sales", "Customer Success", "People", "Data & IT", "Government"];
const FUNCTION_COLORS = { Operations: "#FFB464", Finance: "#64B4FF", Sales: "#E078F0", "Customer Success": "#50FA7B", People: "#E078F0", "Data & IT": "#8BE9FD", Government: "#FFB464" };

const EXAMPLES = [
  { id: "defect-monitor", name: "Real-time defect rate monitor", desc: "Live defect tracking across 12 production lines with threshold alerts and shift-by-shift comparison.", fn: "Operations", sources: ["SAP HANA", "IoT sensors", "MES"], outcome: "Replaced weeks of manual reconciliation across 12 factories", customer: "Global manufacturer", featured: true, mock: "line", color: "#FF6B6B", values: [3.2, 2.8, 3.5, 2.1, 1.8, 2.4, 1.9], detail: "A shift lead described the tool in natural language. Canyon identified SAP HANA and IoT sensor feeds as data sources, applied the certified defect rate definition, and scoped access to the lead's plant. Deployed to the plant's AWS environment, SSO-authenticated, in under 10 minutes.", layers: ["Data Layer", "Agent Orchestration", "Deployment"] },
  { id: "shift-planner", name: "Shift planning & capacity tool", desc: "Weekly shift builder with real-time headcount vs production target matching.", fn: "Operations", sources: ["SAP HANA", "BambooHR", "MES"], outcome: "31% less overtime vs manual planning", featured: true, mock: "grid", color: "#FFB464", values: [1,1,0,1,1,0,0, 1,0,1,1,1,0,0, 1,1,1,0,1,1,0], detail: "Operations manager needed to match headcount to production targets weekly. Canyon pulls from HR system for availability, MES for production schedule, and applies labor compliance rules per region. Drag-and-drop shift assignment with real-time capacity validation.", layers: ["Data Layer", "Agent Orchestration", "Deployment"] },
  { id: "partner-onboarding", name: "Partner onboarding tracker", desc: "40-step onboarding workflow with status tracking and compliance checklists per country.", fn: "Operations", sources: ["Salesforce", "DocuSign", "SAP"], outcome: "Onboarding time from 23 days to 8 days", featured: true, mock: "bar", color: CYAN, values: [40, 28, 35, 22, 15, 8], detail: "Partner ops team managed onboarding across 3 countries with different compliance requirements. Canyon maps Salesforce for partner data, DocuSign for document status, and applies country-specific checklist rules. Regional ops managers see only their partners.", layers: ["Data Layer", "Deployment"] },
  { id: "sla-monitor", name: "Delivery SLA monitor", desc: "Carrier performance tracking by region with breach escalation.", fn: "Operations", sources: ["Fleet API", "Salesforce"], featured: true, mock: "gauge", color: GREEN, values: [97.8], detail: "Carrier ops manager needs real-time SLA compliance across carriers and regions. Canyon connects to fleet telemetry API and Salesforce contracts, applies certified SLA definitions, and triggers escalation alerts when thresholds breach.", layers: ["Data Layer", "Deployment"] },
  { id: "maintenance-scheduler", name: "Preventive maintenance scheduler", desc: "IoT-driven predictive maintenance scheduling integrated with SAP.", fn: "Operations", sources: ["SAP PM", "IoT data"], featured: true, mock: "grid", color: CRIMSON, values: [0,1,0,0,1,0,0, 0,0,1,0,0,0,1, 1,0,0,1,0,0,0], detail: "Maintenance lead needed to schedule preventive work based on IoT sensor predictions rather than fixed intervals. Canyon maps SAP PM work orders with IoT predictive signals and visualizes upcoming maintenance windows.", layers: ["Data Layer", "Deployment"] },
  { id: "board-pnl", name: "Board P&L report generator", desc: "Automated board-ready P&L from multiple ERPs and data sources.", fn: "Finance", sources: ["SAP", "Snowflake", "Legacy ERP"], outcome: "3-day reconciliation cycle eliminated", featured: true, mock: "bar", color: "#64B4FF", values: [82, 91, 78, 95, 88, 102], detail: "FP&A lead needed a single board-ready P&L that reconciles across 3 ERPs and a data warehouse. Canyon's semantic layer ensures revenue, COGS, and margin use one certified definition each. Report generates automatically with one click.", layers: ["Data Layer", "Agent Orchestration"] },
  { id: "budget-variance", name: "Budget variance monitor", desc: "Real-time budget vs actual by cost center with threshold alerts.", fn: "Finance", sources: ["ERP", "Budget DB"], featured: true, mock: "bar", color: "#FF6B6B", values: [5, -3, 8, -2, 12, -1], detail: "Finance controller needed real-time variance visibility instead of monthly reports. Canyon connects to ERP actuals and approved budget database, applies certified cost center definitions, and alerts when variance exceeds thresholds.", layers: ["Data Layer", "Deployment"] },
  { id: "metric-reconciliation", name: "Cross-system metric reconciliation", desc: "Identify and resolve metric definition conflicts across systems.", fn: "Finance", sources: ["Multiple sources", "Semantic layer"], featured: true, mock: "grid", color: GREEN, values: [1,1,1,0,1,1,0, 1,0,1,1,1,1,0, 1,1,0,1,1,1,1], detail: "Data analyst needed to find where different systems define the same metric differently. Canyon's semantic layer surfaces conflicting definitions and lets the data team resolve them into one certified version.", layers: ["Data Layer"] },
  { id: "pipeline-health", name: "Pipeline health dashboard", desc: "Pipeline coverage, velocity, and conversion by rep and region.", fn: "Sales", sources: ["Salesforce", "Snowflake"], featured: true, mock: "bar", color: "#E078F0", values: [72, 85, 64, 91, 78, 88], detail: "Sales ops needed pipeline visibility that updates in real time, not weekly CRM exports. Canyon queries Salesforce and Snowflake for historical trends, applies certified pipeline and conversion definitions. Regional managers see their territory only.", layers: ["Data Layer", "Deployment"] },
  { id: "partner-incentive", name: "Partner incentive calculator", desc: "Performance-based bonus calculation from ops data and contracts.", fn: "Sales", sources: ["Operations DB", "Contracts"], featured: true, mock: "line", color: "#FFB464", values: [4.2, 4.5, 4.1, 4.7, 4.3, 4.6, 4.8], detail: "Partner manager needed automated incentive calculations instead of quarterly spreadsheet exercises. Canyon maps performance metrics from ops data against contract terms and calculates bonuses per partner.", layers: ["Data Layer", "Agent Orchestration", "Deployment"] },
  { id: "campaign-roi", name: "Campaign ROI tracker", desc: "Marketing spend vs revenue attribution across channels.", fn: "Sales", sources: ["Marketing DB", "Revenue DB"], featured: true, mock: "line", color: GREEN, values: [1.8, 2.1, 1.5, 2.4, 2.8, 3.1, 2.9], detail: "Commercial team needed to see ROI by channel in real time. Canyon connects marketing spend data with revenue attribution, applies certified revenue definitions so the numbers match what Finance reports.", layers: ["Data Layer", "Deployment"] },
  { id: "account-health", name: "Account health scorecard", desc: "Composite health score from CRM, usage, and support signals.", fn: "Customer Success", sources: ["CRM", "Product usage", "Support DB"], featured: true, mock: "gauge", color: GREEN, values: [82.5], detail: "CS lead needed a single health score per account instead of checking 3 systems. Canyon computes a composite score from CRM engagement, product usage trends, and support ticket velocity. Account managers see only their book of business.", layers: ["Data Layer", "Deployment"] },
  { id: "churn-risk", name: "Churn risk monitor", desc: "Early warning system for at-risk accounts based on usage decline.", fn: "Customer Success", sources: ["CRM", "Usage DB", "NPS"], featured: true, mock: "line", color: "#FF6B6B", values: [4, 6, 5, 8, 12, 15, 18], detail: "CS ops needed to detect churn risk before customers self-report. Canyon tracks usage decline, NPS trends, and support volume against certified thresholds and surfaces at-risk accounts automatically.", layers: ["Data Layer", "Deployment"] },
  { id: "headcount-tracker", name: "Headcount vs plan tracker", desc: "Live headcount compared to approved plan by department.", fn: "People", sources: ["HR system", "Finance DB"], featured: true, mock: "line", color: "#E078F0", values: [180, 182, 185, 183, 190, 188, 192], detail: "People ops needed real-time headcount vs approved plan visibility. Canyon connects HR system with finance-approved headcount plan. HRBP sees their unit. Finance sees aggregates. No compensation data exposed.", layers: ["Data Layer", "Deployment"] },
  { id: "attrition-monitor", name: "Attrition monitor", desc: "Attrition trends by department, tenure, and seniority.", fn: "People", sources: ["HR system", "Exit data"], featured: true, mock: "bar", color: "#FF6B6B", values: [8, 12, 10, 15, 11, 14], detail: "People analytics needed to surface attrition patterns before they become visible in quarterly reports. Canyon maps HR data with exit records and surfaces trends by department, tenure band, and seniority.", layers: ["Data Layer", "Deployment"] },
  { id: "app-inventory", name: "Central app inventory", desc: "Every Canyon-deployed app with owner, data access, and status.", fn: "Data & IT", sources: ["Canyon audit log"], featured: true, mock: "grid", color: CYAN, values: [1,1,0,1,1,1,0, 1,0,1,1,1,0,1, 1,1,1,0,1,1,0], detail: "IT ops needed a single pane of glass for everything deployed through Canyon. Shows every app, who built it, what data it accesses, deployment status, and last activity. The governance dashboard for the platform team.", layers: ["Data Layer"] },
  { id: "shadow-ai", name: "Shadow AI elimination", desc: "Track and govern ungoverned AI tool usage across the org.", fn: "Data & IT", sources: ["Canyon logs", "Network data"], featured: true, mock: "bar", color: CRIMSON, values: [45, 38, 28, 22, 15, 8], detail: "CISO needed visibility into where teams were using AI tools on enterprise data outside of governed channels. Canyon surfaces ungoverned usage patterns and provides a migration path to the governed platform.", layers: ["Data Layer", "Deployment"] },
  { id: "service-delivery", name: "Service delivery dashboard", desc: "Case load, SLA compliance, and performance by region.", fn: "Government", sources: ["Case management", "Operational DB"], featured: true, mock: "bar", color: "#FFB464", values: [85, 78, 92, 81, 88, 95], detail: "Service delivery lead needed real-time visibility for ministerial reporting. Canyon connects case management and operational data, applies certified KPI definitions, and deploys entirely within the government's own infrastructure.", layers: ["Data Layer", "Deployment"] },
  { id: "audit-viewer", name: "Data access audit viewer", desc: "Immutable audit trail for FOI compliance and internal review.", fn: "Government", sources: ["Canyon audit log", "Identity system"], featured: true, mock: "line", color: "#FFB464", values: [320, 345, 310, 368, 355, 378, 390], detail: "Data protection officer needed a queryable audit trail for FOI requests and compliance reviews. Canyon's immutable audit log surfaces every data access with user, app, metric, and timestamp. Exportable for regulatory submissions.", layers: ["Data Layer"] },
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
    return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>{values.map((v, i) => (<rect key={i} x={i * (w / values.length) + 2} y={h - (Math.abs(v) / max) * (h - 10)} width={barW} height={(Math.abs(v) / max) * (h - 10)} rx="3" fill={v < 0 ? "#FF6B6B" : color} opacity="0.5" />))}</svg>);
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

export default function CanyonExamples() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fnFilter, setFnFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = EXAMPLES.filter(e => fnFilter === "All" || e.fn === fnFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:0px}
        @media(max-width:768px){
          .pnav-items{display:none !important}
          .phamburger{display:flex !important}
          .ex-grid{grid-template-columns:1fr 1fr !important}
          .ex-filters{overflow-x:auto !important;flex-wrap:nowrap !important}
          .ex-detail-inner{flex-direction:column !important}
        }
        @media(max-width:480px){
          .ex-grid{grid-template-columns:1fr !important}
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

      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 25, background: "rgba(13,13,15,0.9)", backdropFilter: "blur(8px)" }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{ padding: "72px 28px 32px", display: "flex", flexDirection: "column", gap: 4 }} onClick={e => e.stopPropagation()}>
            {["Product", "Solutions", "Security", "Resources", "Company"].map(l => (
              <button key={l} onClick={() => setMobileMenuOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 18, fontWeight: 600, color: "#F0E0DB", padding: "14px 0", textAlign: "left", borderBottom: "1px solid rgba(66,59,87,0.2)" }}>{l}</button>
            ))}
          </div>
        </div>
      )}

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <section style={{ paddingTop: 48, paddingBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 8px" }}>What teams are building with Canyon.</h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.45)", margin: "0 0 24px" }}>Real apps. Real data. Deployed to production.</p>

          {/* Function filter only */}
          <div className="ex-filters" style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            {FUNCTIONS.map(f => (
              <button key={f} onClick={() => { setFnFilter(f); setSelected(null); }} style={{ padding: "7px 14px", borderRadius: 7, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap", background: fnFilter === f ? CRIMSON : "#18181B", border: `1px solid ${fnFilter === f ? CRIMSON : "#2A1F1C"}`, color: fnFilter === f ? "#fff" : "#DDBAB1", transition: "all 0.1s" }}>{f}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "rgba(240,224,219,0.3)", marginBottom: 20 }}>Showing {filtered.length} examples</div>
        </section>

        {/* Tile grid */}
        <div className="ex-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, paddingBottom: 32 }}>
          {filtered.map((ex, i) => (
            <div key={ex.id} onClick={() => setSelected(ex)} style={{ background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "border-color 0.15s, transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#532E25"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2A1F1C"; e.currentTarget.style.transform = "translateY(0)"; }}>
              {/* Mock screenshot */}
              <div style={{ background: "rgba(13,13,15,0.6)", padding: "12px 12px 0", borderBottom: "1px solid rgba(42,31,28,0.3)" }}>
                <div style={{ background: "rgba(54,50,72,0.15)", borderRadius: "8px 8px 0 0", padding: "6px 8px 0", overflow: "hidden" }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                  </div>
                  <MockScreenshot mock={ex.mock} color={ex.color} values={ex.values} />
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "14px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(54,50,72,0.3)", color: FUNCTION_COLORS[ex.fn] || "#DDBAB1" }}>{ex.fn}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 4 }}>{ex.name}</div>
                <div style={{ fontSize: 13, color: "rgba(240,224,219,0.4)", lineHeight: 1.5, marginBottom: 8 }}>{ex.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {ex.sources.slice(0, 3).map(s => (
                    <span key={s} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "#0D0D0F", border: "1px solid #2A1F1C", color: "rgba(240,224,219,0.45)", fontFamily: "'JetBrains Mono', monospace" }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail overlay */}
        {selected && (
          <div style={{ position: "fixed", inset: 0, zIndex: 30, background: "rgba(13,13,15,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setSelected(null)}>
            <div style={{ background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 16, maxWidth: 720, width: "100%", maxHeight: "85vh", overflow: "auto", animation: "fadeUp 0.2s ease" }} onClick={e => e.stopPropagation()}>
              {/* Detail header with screenshot */}
              <div style={{ background: "rgba(13,13,15,0.6)", padding: "20px 20px 0", borderBottom: "1px solid rgba(42,31,28,0.3)" }}>
                <div style={{ background: "rgba(54,50,72,0.15)", borderRadius: "10px 10px 0 0", padding: "8px 12px 0", overflow: "hidden" }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(240,224,219,0.12)" }} />
                  </div>
                  <div style={{ maxHeight: 120 }}>
                    <MockScreenshot mock={selected.mock} color={selected.color} values={selected.values} />
                  </div>
                </div>
              </div>
              {/* Detail content */}
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 5, background: "rgba(54,50,72,0.3)", color: FUNCTION_COLORS[selected.fn] }}>{selected.fn}</span>
                  <button onClick={() => setSelected(null)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18, color: "rgba(240,224,219,0.35)", padding: 4 }}>✕</button>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.97)", margin: "0 0 8px" }}>{selected.name}</h2>
                <p style={{ fontSize: 15, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, margin: "0 0 20px" }}>{selected.detail}</p>

                <div className="ex-detail-inner" style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Data Sources</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {selected.sources.map(s => (
                        <span key={s} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 5, background: "#0D0D0F", border: "1px solid #2A1F1C", color: CYAN, fontFamily: "'JetBrains Mono', monospace" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Canyon Layers Used</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {selected.layers.map(l => (
                        <span key={l} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 5, background: "#0D0D0F", border: "1px solid #2A1F1C", color: "rgba(240,224,219,0.55)" }}>{l}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {selected.outcome && (
                  <div style={{ padding: "14px 16px", background: "rgba(80,250,123,0.04)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 10, marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Outcome</div>
                    <div style={{ fontSize: 14, color: "rgba(240,224,219,0.6)" }}>{selected.outcome}</div>
                    {selected.customer && <div style={{ fontSize: 12, color: "rgba(240,224,219,0.3)", marginTop: 4 }}>↳ {selected.customer}</div>}
                  </div>
                )}

                <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", borderRadius: 10, padding: "12px 24px", color: "#F0E0DB", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>This looks relevant. Book a demo.</button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <section style={{ background: "#18181B", borderRadius: 14, padding: "32px", textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 8 }}>Don't see your exact use case?</div>
          <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", marginBottom: 20 }}>We build from what your teams describe. In natural language, on your data.</div>
          <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", borderRadius: 10, padding: "12px 24px", color: "#F0E0DB", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Book a demo</button>
        </section>
      </main>

      <footer style={{ padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 960, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
