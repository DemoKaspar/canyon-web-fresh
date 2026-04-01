"use client";
import { useState } from "react";

const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const LOGO_B64 = null; // removed, using /logo.png

export default function CanyonAgentOrchestrationPage() {
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
          .ahero-title{font-size:28px !important}
          .asection-title{font-size:22px !important}
          .agrid-2{grid-template-columns:1fr !important}
          .aagent-grid{grid-template-columns:1fr 1fr !important}
          .acompat-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 120% 50% at 50% -5%, rgba(255,68,68,0.06) 0%, transparent 50%),
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
                  { label: "Data Layer", sub: "Certified data & access controls", href: "/product/semantic-data-layer", color: CYAN },
                  { label: "Agent Orchestration", sub: "Model-agnostic context injection", href: "/product/agent-orchestration", color: CRIMSON, active: true },
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
          <span style={{ fontSize: 12, color: CRIMSON, fontWeight: 600 }}>Agent Orchestration</span>
        </div>

        {/* ============================================ */}
        {/* 1. HERO                                     */}
        {/* ============================================ */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: CRIMSON, padding: "4px 10px", background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.2)", borderRadius: 5 }}>Agent Orchestration</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: "#50FA7B", padding: "3px 7px", background: "rgba(80,250,123,0.06)", border: "1px solid rgba(80,250,123,0.15)", borderRadius: 5 }}>Open Source</span>
          </div>
          <h1 className="ahero-title" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 12px", maxWidth: 520 }}>
            From request to deployed app. Orchestrated.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, maxWidth: 500, margin: 0 }}>
            A planner decomposes the task. Specialized agents build in parallel, each with full enterprise context. What ships is already compliant.
          </p>
        </section>

        {/* ============================================ */}
        {/* 2. THE FLOW                                     */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 16, padding: "24px", overflow: "hidden" }}>

            {/* Step 1: Request → Planner */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.3)", fontSize: 14, color: "rgba(240,224,219,0.6)", fontStyle: "italic" }}>
                "Build a shift planning tool"
              </div>
              <div style={{ width: 16, height: 1, background: "rgba(255,68,68,0.25)" }} />
              <div style={{ width: 0, height: 0, borderLeft: "5px solid rgba(255,68,68,0.3)", borderTop: "3px solid transparent", borderBottom: "3px solid transparent" }} />
              <div style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,68,68,0.06)", border: "1px solid rgba(255,68,68,0.15)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 0.5 }}>PLANNER</div>
                <div style={{ fontSize: 12, color: "rgba(240,224,219,0.45)", marginTop: 2 }}>Decomposes into tasks</div>
              </div>
            </div>

            {/* Step 2: Specialized agents */}
            <div className="aagent-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[
                { label: "Data Agent", task: "Queries semantic layer, resolves schemas, enforces access", color: CYAN },
                { label: "UI Agent", task: "Generates frontend with your design system components", color: "#50FA7B" },
                { label: "Backend Agent", task: "Builds API integrations, business logic, auth patterns", color: "#FFB464" },
                { label: "Deploy Agent", task: "Provisions infra, injects identity, wires CI/CD", color: "#FF4478" },
              ].map((a, i) => (
                <div key={i} style={{
                  padding: "14px 12px", borderRadius: 10, textAlign: "center",
                  background: `linear-gradient(135deg, ${a.color}0F, ${a.color}05)`,
                  border: `1px solid ${a.color}30`,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 4 }}>{a.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,224,219,0.45)", lineHeight: 1.4 }}>{a.task}</div>
                </div>
              ))}
            </div>

            {/* Context note */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
                Each agent pulls certified context from Canyon's semantic layer via MCP
              </div>
            </div>

            {/* Step 3: Converge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(80,250,123,0.15)" }} />
              <div style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(80,250,123,0.04)", border: "1px solid rgba(80,250,123,0.12)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#50FA7B" }}>Assembled, governed, deployed</div>
                <div style={{ fontSize: 10, color: "rgba(240,224,219,0.35)", fontFamily: "'JetBrains Mono', monospace", marginTop: 2, textAlign: "center" }}>correct schemas · your UI · your infra · full audit trail</div>
              </div>
              <div style={{ flex: 1, height: 1, background: "rgba(80,250,123,0.15)" }} />
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 3. WHAT EACH AGENT RECEIVES                 */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="asection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 8px" }}>
            Every agent gets full enterprise context.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", margin: "0 0 24px", maxWidth: 500 }}>
            Via MCP, each agent pulls live context from Canyon's semantic layer, not a static config loaded at startup.
          </p>
          <div className="agrid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Certified data", body: "Entity definitions, metric logic, schema structure. The AI asks for gross_margin; Canyon tells it exactly where that lives.", color: CYAN },
              { label: "Governance rules", body: "Auth patterns, logging, secret handling, architectural standards. The golden path becomes the default path.", color: CRIMSON },
              { label: "Design system", body: "UI tokens and component library. Generated apps render in your visual identity, not model defaults.", color: "#50FA7B" },
              { label: "API catalog", body: "Internal endpoints surfaced semantically. 'Update customer address' resolves to your real API.", color: "#FFB464" },
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
        {/* 4. WORKS WITH ANYTHING                      */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="asection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 8px" }}>
            Any tool. Any model. Your context stays.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", margin: "0 0 24px", maxWidth: 460 }}>
            Switch models when better ones ship. The governance layer doesn't restart from zero.
          </p>
          <div className="acompat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.2)", borderRadius: 12, padding: "18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Model Providers</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["OpenAI", "Anthropic", "Google", "Mistral", "Custom / self-hosted"].map(m => (
                  <span key={m} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 5, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.25)", color: "rgba(240,224,219,0.6)" }}>{m}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.2)", borderRadius: 12, padding: "18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>AI Coding Tools</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Claude Code", "Cursor", "Lovable", "GitHub Copilot", "VS Code", "Your own tooling"].map(m => (
                  <span key={m} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 5, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.25)", color: "rgba(240,224,219,0.6)" }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 5. HUMAN IN THE LOOP + OPEN SOURCE          */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <div className="agrid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Human controls */}
            <div style={{ background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.2)", borderRadius: 14, padding: "20px" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 14 }}>Human-in-the-loop</div>
              {[
                { label: "Approval gates", body: "Pause high-stakes operations for review before execution." },
                { label: "Rollback", body: "Revert agent sessions to a prior state." },
                { label: "Session replay", body: "Full audit of agent actions, inputs, and outputs." },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: CRIMSON, flexShrink: 0, marginTop: 7 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.85)", marginBottom: 1 }}>{s.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(240,224,219,0.45)", lineHeight: 1.5 }}>{s.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Open source */}
            <div style={{ background: "rgba(80,250,123,0.03)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 14, padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(240,224,219,0.9)" }}>Open source</div>
              </div>
              <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, marginBottom: 16 }}>
                The agent orchestration framework is open source. Enterprise features available through Canyon's commercial platform.
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(240,224,219,0.35)" }}>GitHub → coming soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section style={{ paddingBottom: 60, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <a href="/product/semantic-data-layer" style={{ fontSize: 14, color: "rgba(240,224,219,0.4)", textDecoration: "none" }}>← Data Layer</a>
          <a href="/product/deployment" style={{ fontSize: 14, fontWeight: 600, color: "#50FA7B", textDecoration: "none" }}>Next: Deployment →</a>
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
