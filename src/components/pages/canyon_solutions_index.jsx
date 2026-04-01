"use client";
import { useState } from "react";
import Link from "next/link";

const CRIMSON = "#FF4444";

const VERTICALS = [
  { label: "Operations", href: "/solutions/operations", accent: "#FFB464", desc: "Shift planners, SLA monitors, maintenance schedulers, partner tools. Built by ops teams on real production data.", examples: "12 examples" },
  { label: "Finance & Analytics", href: "/solutions/finance", accent: "#64B4FF", desc: "Board reporting, budget variance, metric reconciliation. One number, every report, every team.", examples: "15 examples" },
  { label: "Sales & Commercial", href: "/solutions/sales", accent: "#E078F0", desc: "Pipeline dashboards, partner incentives, campaign ROI. No engineering dependency.", examples: "11 examples" },
  { label: "Data & IT", href: "/solutions/data-it", accent: "#8BE9FD", desc: "App inventory, shadow AI elimination, semantic layer management. Say yes to the business without losing control.", examples: "8 examples" },
  { label: "Customer Success", href: "/solutions/customer-success", accent: "#50FA7B", desc: "Account health scorecards, churn monitors, renewal trackers. Churn lives in the data long before it shows up.", examples: "10 examples" },
  { label: "People", href: "/solutions/people", accent: "#E078F0", desc: "Headcount planning, attrition monitoring, onboarding tracking. Privacy enforced by default.", examples: "9 examples" },
  { label: "Government & Public Sector", href: "/solutions/government", accent: "#FFB464", desc: "Service delivery, ministerial reporting, FOI compliance. Air-gapped. On-premise. Full audit trail.", examples: "7 examples" },
];

export default function CanyonSolutionsIndex() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(66,59,87,0.2)", background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          <img src="/logo.png" alt="Canyon" style={{ height: 20 }} />
        </Link>
        <nav className="nav-items" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Product", "Solutions", "Security", "Resources", "Company"].map((l, i) => (
            <Link key={i} href={l === "Solutions" ? "/solutions" : l === "Product" ? "/product" : l === "Security" ? "/security" : "#"} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: l === "Solutions" ? 700 : 500, color: l === "Solutions" ? "#F0E0DB" : "rgba(240,224,219,0.5)", padding: "4px 0", textDecoration: "none" }}>{l}</Link>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"} style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", color: "#F0E0DB", padding: "7px 18px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textDecoration: "none" }}>Book a Demo</Link>
          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "none", background: "transparent", border: "none", cursor: "pointer", padding: 4, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
        <section style={{ paddingTop: 60, paddingBottom: 40 }}>
          <h1 className="hero-title" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 12px" }}>
            Canyon for every team.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.45)", lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
            Business teams describe what they need. Canyon builds it on certified enterprise data with governance enforced by default.
          </p>
        </section>

        <section style={{ paddingBottom: 60 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VERTICALS.map((v, i) => (
              <Link key={i} href={v.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 14,
                  padding: "28px 28px 24px", cursor: "pointer",
                  transition: "border-color 0.15s, transform 0.15s",
                  display: "flex", alignItems: "flex-start", gap: 20,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#532E25"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2A1F1C"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: 4, height: 40, borderRadius: 2, background: v.accent, flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 20, fontWeight: 700, color: "rgba(240,224,219,0.95)" }}>{v.label}</span>
                      <span style={{ fontSize: 12, color: v.accent, fontWeight: 600 }}>{v.examples} →</span>
                    </div>
                    <div style={{ fontSize: 15, color: "rgba(240,224,219,0.45)", lineHeight: 1.6 }}>{v.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ textAlign: "center", paddingBottom: 60 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 8 }}>Don't see your function?</div>
          <div style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", marginBottom: 20 }}>Canyon works for any team with enterprise data and a need for internal tools.</div>
          <Link href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"} style={{
            display: "inline-block", background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`,
            border: "none", borderRadius: 10, padding: "14px 28px", color: "#F0E0DB",
            fontSize: 15, fontWeight: 700, textDecoration: "none",
          }}>Book a Demo</Link>
        </section>
      </main>

      <footer style={{ padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 880, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.25)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", textDecoration: "none" }}>Imprint</Link>
        </div>
      </footer>
    </div>
  );
}
