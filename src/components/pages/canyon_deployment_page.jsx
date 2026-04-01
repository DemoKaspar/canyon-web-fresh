"use client";
import { useState } from "react";

const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const GREEN = "#50FA7B";
const LOGO_B64 = null; // removed, using /logo.png

export default function CanyonDeploymentPage() {
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
          .dgrid-2{grid-template-columns:1fr !important}
          .dstep-grid{grid-template-columns:1fr 1fr !important}
          .denv-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 120% 50% at 50% -5%, rgba(80,250,123,0.05) 0%, transparent 50%),
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
                  { label: "Agent Orchestration", sub: "Model-agnostic context injection", href: "/product/agent-orchestration", color: CRIMSON },
                  { label: "Deployment", sub: "Your infrastructure, one click", href: "/product/deployment", color: GREEN, active: true },
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
          <span style={{ fontSize: 12, color: GREEN, fontWeight: 600 }}>Deployment</span>
        </div>

        {/* ============================================ */}
        {/* 1. HERO                                     */}
        {/* ============================================ */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: GREEN, padding: "4px 10px", background: "rgba(80,250,123,0.08)", border: "1px solid rgba(80,250,123,0.2)", borderRadius: 5 }}>Deployment</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: GREEN, padding: "3px 7px", background: "rgba(80,250,123,0.06)", border: "1px solid rgba(80,250,123,0.15)", borderRadius: 5 }}>Open Source</span>
          </div>
          <h1 className="dhero-title" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 12px", maxWidth: 480 }}>
            Your infrastructure. We never host your apps.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.5)", lineHeight: 1.6, maxWidth: 460, margin: 0 }}>
            Canyon deploys to your cloud as containerized workloads. Your data stays in your perimeter. Full operational ownership.
          </p>
        </section>

        {/* ============================================ */}
        {/* 2. THE PIPELINE                             */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="dsection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 20px" }}>
            From generated code to production
          </h2>
          <div className="dstep-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { step: "01", label: "Analyze", body: "Scans generated code for infra dependencies. Detects drift between code and manifest. Corrects automatically.", color: "rgba(240,224,219,0.4)" },
              { step: "02", label: "Containerize", body: "Zero-config OCI image via Nixpacks. No Dockerfile required. Reproducible, deterministic.", color: "rgba(240,224,219,0.5)" },
              { step: "03", label: "Identity", body: "Workload identity injected via OIDC/SPIFFE. Short-lived tokens, not static credentials.", color: CYAN },
              { step: "04", label: "Provision", body: "Platform Orchestrator provisions compute, storage, routing. Environment variables injected automatically.", color: GREEN },
              { step: "05", label: "Deploy", body: "Container deployed to your VPC. Service discovery configured. No manual infra work.", color: GREEN },
              { step: "06", label: "Live", body: "Secure URL. SSO-authenticated. Audit trail active. Observable via your existing stack.", color: GREEN },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)",
                borderRadius: 12, padding: "16px", textAlign: "center",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: 1, marginBottom: 6 }}>{s.step}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: "rgba(240,224,219,0.45)", lineHeight: 1.5 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* 3. SUPPORTED ENVIRONMENTS                   */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="dsection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 20px" }}>
            Supported environments
          </h2>
          <div className="denv-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { provider: "AWS", services: ["EKS", "ECS Fargate", "RDS", "Aurora", "S3", "DynamoDB", "and more"] },
              { provider: "Azure", services: ["AKS", "Container Apps", "Azure SQL", "Cosmos DB", "Blob Storage", "and more"] },
              { provider: "GCP", services: ["GKE", "Cloud Run", "Cloud SQL", "Firestore", "Cloud Storage", "and more"] },
            ].map((p, i) => (
              <div key={i} style={{
                background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)",
                borderRadius: 12, padding: "18px",
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 10 }}>{p.provider}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.services.map(s => (
                    <span key={s} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 5, background: s === "and more" ? "transparent" : "rgba(80,250,123,0.06)", border: s === "and more" ? "1px dashed rgba(66,59,87,0.3)" : "1px solid rgba(80,250,123,0.12)", color: s === "and more" ? "rgba(240,224,219,0.35)" : "rgba(240,224,219,0.6)", fontStyle: s === "and more" ? "italic" : "normal" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Self-hosting callout */}
          <div style={{
            marginTop: 14, padding: "16px 20px", borderRadius: 12,
            background: "rgba(80,250,123,0.03)", border: "1px solid rgba(80,250,123,0.12)",
            display: "flex", alignItems: "flex-start", gap: 10,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🏢</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 3 }}>Entirely self-hostable</div>
              <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", lineHeight: 1.6 }}>
                Canyon can run fully on your own infrastructure. No data leaves your network. No dependency on Canyon-hosted services. The entire platform, including the data layer, agent orchestration, and deployment engine, can be operated within your environment.
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 4. SELF-HEALING                             */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <h2 className="dsection-title" style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 8px" }}>
            Self-healing applications.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", margin: "0 0 20px", maxWidth: 480 }}>
            Canyon doesn't just deploy and walk away. It watches, detects, and fixes.
          </p>
          <div className="dstep-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "🔍", label: "Vulnerability detected", body: "Security scan flags a CVE in a dependency. Canyon regenerates the affected component with a patched version and redeploys. No human ticket.", color: CRIMSON },
              { icon: "⚠️", label: "Incident warning", body: "Logs show error rate spiking. Canyon identifies the root cause, generates a fix, and deploys a remediated version before the alert escalates.", color: "#FFB464" },
              { icon: "🔄", label: "Infra drift", body: "A new feature needs persistent storage the manifest didn't declare. Canyon detects the gap, provisions the resource, and updates permissions automatically.", color: CYAN },
              { icon: "📦", label: "Dependency update", body: "A breaking change in an upstream API. Canyon detects the schema mismatch, adapts the integration code, and redeploys with zero downtime.", color: GREEN },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(54,50,72,0.2)", border: `1px solid ${s.color}20`,
                borderRadius: 12, padding: "18px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(240,224,219,0.95)" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", lineHeight: 1.6 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* 5. IDENTITY + SECURITY + OBSERVABILITY      */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <div className="dgrid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {/* Identity */}
            <div style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 12, padding: "18px" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 10 }}>Identity</div>
              {[
                { label: "SSO", body: "Okta, Entra ID. Inherited by every app." },
                { label: "Workload identity", body: "Short-lived tokens, automatic rotation." },
                { label: "RBAC", body: "Roles from your IdP enforced at the data layer." },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(240,224,219,0.7)" }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "rgba(240,224,219,0.45)", lineHeight: 1.5 }}>{s.body}</div>
                </div>
              ))}
            </div>

            {/* Security */}
            <div style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 12, padding: "18px" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 10 }}>Security baseline</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {["Semgrep", "GitLeaks", "Trivy", "Tenable", "Syft (SBOM)"].map(t => (
                  <span key={t} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 5, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.25)", color: "rgba(240,224,219,0.55)" }}>{t}</span>
                ))}
              </div>
              <div style={{ fontSize: 13, color: "rgba(240,224,219,0.4)", marginTop: 10, lineHeight: 1.5 }}>
                Issues detected trigger AI-assisted regeneration and redeploy.
              </div>
            </div>

            {/* Observability */}
            <div style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.25)", borderRadius: 12, padding: "18px" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 10 }}>Observability</div>
              <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", lineHeight: 1.6, marginBottom: 10 }}>
                Every deployment, every data access, every governance rule. Logged and immutable.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {["Datadog", "Grafana", "Splunk"].map(t => (
                  <span key={t} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 5, background: "rgba(54,50,72,0.3)", border: "1px solid rgba(66,59,87,0.25)", color: "rgba(240,224,219,0.55)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 6. OPEN SOURCE                              */}
        {/* ============================================ */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ background: "rgba(80,250,123,0.03)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 14, padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 4 }}>Open source</div>
              <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)" }}>The deployment framework is open source. Enterprise features available through Canyon's commercial platform.</div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(240,224,219,0.35)" }}>GitHub → coming soon</span>
          </div>
        </section>

        {/* Navigation */}
        <section style={{ paddingBottom: 60, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <a href="/product/agent-orchestration" style={{ fontSize: 14, color: "rgba(240,224,219,0.4)", textDecoration: "none" }}>← Agent Orchestration</a>
          <a href="/security" style={{ fontSize: 14, fontWeight: 600, color: CRIMSON, textDecoration: "none" }}>Next: Security →</a>
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
