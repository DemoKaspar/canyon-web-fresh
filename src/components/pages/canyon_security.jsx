"use client";
import { useState } from "react";
const CRIMSON = "#FF4444";
const GREEN = "#50FA7B";
const LOGO_B64 = null; // removed, using /logo.png

const CHECKLIST = [
  "SSO/IdP integration (Okta, Entra ID). No separate user management.",
  "Role-based and attribute-based access control. Enforced at the data layer.",
  "Row and column-level permissions. Every query, every app.",
  "Immutable audit trails. Every access, every deployment, every action.",
  "Your infrastructure. We never host your apps or data.",
  "No data movement. Canyon queries your sources in place.",
];

const SECTIONS_NAV = ["Identity", "Authorization", "Auditability", "Data Handling", "Integrations", "Compliance"];

export default function CanyonSecurity() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          .sec-hero-title{font-size:28px !important}
          .sec-grid-2{grid-template-columns:1fr !important}
          .sec-sidebar{display:none !important}
          .sec-badges{flex-direction:column !important}
        }
      `}</style>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(66,59,87,0.2)", background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}><img src={"/logo.png"} alt="Canyon" style={{ height: 20 }} /></a>
        <nav className="pnav-items" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Product", "Solutions", "Security", "Resources", "Company"].map((l, i) => (
            <button key={i} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: l === "Security" ? 700 : 500, color: l === "Security" ? "#F0E0DB" : "rgba(240,224,219,0.5)", padding: "4px 0" }}>{l}</button>
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

      <div style={{ display: "flex", maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
        {/* Sidebar */}
        <nav className="sec-sidebar" style={{ position: "sticky", top: 80, width: 180, flexShrink: 0, paddingTop: 60, paddingRight: 24, alignSelf: "flex-start" }}>
          {SECTIONS_NAV.map((s, i) => (
            <a key={i} href={`#sec-${i}`} style={{ display: "block", fontSize: 13, color: "rgba(240,224,219,0.35)", textDecoration: "none", padding: "6px 0", borderLeft: "2px solid rgba(66,59,87,0.15)", paddingLeft: 12, marginBottom: 2 }}>{s}</a>
          ))}
        </nav>

        <main style={{ flex: 1, maxWidth: 760 }}>
          {/* Hero */}
          <section style={{ paddingTop: 60, paddingBottom: 48 }}>
            <h1 className="sec-hero-title" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 12px" }}>
              Security is not a feature. It's how Canyon works.
            </h1>
            <p style={{ fontSize: 16, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, maxWidth: 560, margin: "0 0 28px" }}>
              Every deployment enforces access control, audit logging, and data governance by default. There is no "turn security on" step.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {CHECKLIST.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: GREEN, fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 15, color: "rgba(240,224,219,0.6)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", borderRadius: 10, padding: "12px 24px", color: "#F0E0DB", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Book a security deep dive</button>
              <button style={{ background: "transparent", border: "1px solid rgba(66,59,87,0.35)", borderRadius: 10, padding: "12px 24px", color: "rgba(240,224,219,0.5)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Read security docs</button>
            </div>
          </section>

          {/* Section 1: Identity */}
          <section id="sec-0" style={{ paddingBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Identity & Authentication</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 16px" }}>Your IdP. Your users. No separate identity layer.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "SSO via SAML 2.0 / OIDC. Okta, Entra ID, or compatible providers.",
                "User attributes inherited. Roles, groups, departments, regions flow from your IdP.",
                "No Canyon-specific user accounts. Deprovisioning in your IdP revokes Canyon access immediately.",
                "MFA enforced by your IdP. Canyon respects your authentication policies.",
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: GREEN, fontSize: 10, marginTop: 6, flexShrink: 0 }}>●</span>
                  <span style={{ fontSize: 15, color: "rgba(240,224,219,0.55)", lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Authorization */}
          <section id="sec-1" style={{ paddingBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Authorization</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 16px" }}>Governance at the data layer, not the application layer.</h2>
            <div className="sec-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              <div style={{ background: "rgba(255,166,138,0.04)", border: "1px solid rgba(255,166,138,0.12)", borderRadius: 12, padding: "18px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#FFA68A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Traditional</div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.7 }}>Each app implements its own access controls. Some get it right. Many don't. Nobody can audit the whole picture.</div>
              </div>
              <div style={{ background: "rgba(80,250,123,0.04)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 12, padding: "18px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Canyon</div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.7 }}>Access controls enforced once, at the semantic layer, before any app can access data. Every app inherits the same rules.</div>
              </div>
            </div>
            {[
              { label: "RBAC", body: "Roles map to your IdP groups. Permissions define which metrics, entities, and data scopes each role can access." },
              { label: "ABAC", body: "Fine-grained rules based on user attributes: region, department, seniority. Example: marketing staff see campaign metrics but not individual customer PII." },
              { label: "Row and column-level", body: "Applied at the query layer. Not filterable by the app, not bypassable by the AI tool. A regional manager queries revenue and only sees their region." },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.85)", marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 15, color: "rgba(240,224,219,0.5)", lineHeight: 1.6 }}>{s.body}</div>
              </div>
            ))}
          </section>

          {/* Section 3: Auditability */}
          <section id="sec-2" style={{ paddingBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Auditability</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 16px" }}>Every action. Every access. Logged.</h2>
            <div className="sec-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.7)", marginBottom: 10 }}>What's logged</div>
                {["Data access: app, user, metric, source, timestamp", "Deployments: who triggered, what changed, rules applied", "Governance events: access denied, violations, deprecated metrics", "Code generation: context injected, guardrails enforced"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                    <span style={{ color: GREEN, fontSize: 8, marginTop: 7, flexShrink: 0 }}>●</span>
                    <span style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.7)", marginBottom: 10 }}>Where logs go</div>
                {["Datadog, Grafana, Splunk, or your SIEM", "Canyon's built-in audit interface", "Retention follows your organizational policies"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                    <span style={{ color: GREEN, fontSize: 8, marginTop: 7, flexShrink: 0 }}>●</span>
                    <span style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.4)", marginTop: 10 }}>Audit logs are immutable. Nothing is left untracked.</div>
              </div>
            </div>
          </section>

          {/* Section 4: Data Handling */}
          <section id="sec-3" style={{ paddingBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Data Handling</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 16px" }}>We don't store your data. We don't move your data.</h2>
            <div className="sec-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.2)", borderRadius: 12, padding: "18px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.7)", marginBottom: 10 }}>What Canyon stores</div>
                {["Semantic layer definitions (metric formulas, schemas, policies)", "Deployment metadata (what, when, who)", "Audit logs (access events, governance actions)"].map((b, i) => (
                  <div key={i} style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.5, marginBottom: 4 }}>• {b}</div>
                ))}
              </div>
              <div style={{ background: "rgba(54,50,72,0.15)", borderLeft: "3px solid rgba(255,68,68,0.3)", borderRadius: "0 12px 12px 0", padding: "18px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.7)", marginBottom: 10 }}>What Canyon does NOT store</div>
                {["Your enterprise data (queries run against your sources)", "User credentials or passwords (your IdP handles this)", "Application state or user content (lives in your infra)"].map((b, i) => (
                  <div key={i} style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.5, marginBottom: 4 }}>• {b}</div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 16, padding: "16px 18px", background: "rgba(80,250,123,0.03)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.85)", marginBottom: 4 }}>European data sovereignty by default</div>
              <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", lineHeight: 1.6 }}>Canyon deploys in your region (EU, US, APAC). No cross-border data transfer unless you configure it. Entirely self-hostable.</div>
            </div>
          </section>

          {/* Section 5: Integrations */}
          <section id="sec-4" style={{ paddingBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Secure Integrations</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 16px" }}>Connections that don't create risk.</h2>
            {[
              { label: "Data source connectors", items: ["Read-only by default. Write access requires explicit configuration.", "Connections authenticated via service accounts or federated identity.", "Each connector scoped to specific schemas/tables.", "No stored passwords."] },
              { label: "API security", items: ["All Canyon APIs require authentication.", "Rate limiting and quota enforcement per app, per user.", "API versioning with deprecation notices."] },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.7)", marginBottom: 8 }}>{s.label}</div>
                {s.items.map((b, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
                    <span style={{ color: GREEN, fontSize: 8, marginTop: 7, flexShrink: 0 }}>●</span>
                    <span style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(240,224,219,0.6)", marginBottom: 8 }}>Code scanning in every pipeline</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Semgrep", "GitLeaks", "Trivy", "Tenable", "Syft (SBOM)"].map(t => (
                  <span key={t} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 5, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.25)", color: "rgba(240,224,219,0.55)", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                ))}
              </div>
            </div>
            <a href="/integrations" style={{ display: "inline-block", marginTop: 16, fontSize: 14, fontWeight: 600, color: "#8BE9FD", textDecoration: "none" }}>Full integration catalog →</a>
          </section>

          {/* Section 6: Compliance */}
          <section id="sec-5" style={{ paddingBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Compliance</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 20px" }}>Audit trail supports SOC 2, ISO 27001, and GDPR.</h2>
            <div className="sec-badges" style={{ display: "flex", gap: 12 }}>
              {[
                { label: "SOC 2", body: "Audit logs support Type II review requirements. Immutable, exportable." },
                { label: "ISO 27001", body: "Access control and incident management documentation. Full traceability." },
                { label: "GDPR", body: "Data residency, access logging, right-to-erasure support. EU-first deployment." },
              ].map((c, i) => (
                <div key={i} style={{ flex: 1, background: "rgba(54,50,72,0.15)", border: "1px solid rgba(66,59,87,0.2)", borderRadius: 12, padding: "18px" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", lineHeight: 1.6 }}>{c.body}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", borderRadius: 10, padding: "14px 28px", color: "#F0E0DB", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Book a security deep dive</button>
            </div>
          </section>
        </main>
      </div>

      <footer style={{ padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1000, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
