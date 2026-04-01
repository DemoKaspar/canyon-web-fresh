"use client";
import { useState } from "react";
const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const LOGO_B64 = null; // removed, using /logo.png

const POSTS = [
  { date: "Mar 28, 2026", title: "Why the semantic layer is the real AI moat", tag: "Product", desc: "AI models are commoditizing. The differentiator is certified enterprise data. Here's why.", read: "6 min" },
  { date: "Mar 21, 2026", title: "70 apps in 10 days: what we learned at SIXT", tag: "Customer", desc: "How 240+ production apps were deployed by non-engineers on real enterprise data.", read: "8 min" },
  { date: "Mar 14, 2026", title: "Vibe coding is real. Enterprise governance for it isn't.", tag: "Industry", desc: "Every team is building with AI. Almost none of it is governed. This is the gap Canyon fills.", read: "5 min" },
  { date: "Mar 7, 2026", title: "Canyon agent orchestration is now open source", tag: "Engineering", desc: "Inspect it, extend it, run it yourself. Here's what's in the repo and how to get started.", read: "4 min" },
  { date: "Feb 28, 2026", title: "Query once, share everywhere: how Canyon caches certified metrics", tag: "Product", desc: "The same pre-computed, governed result shared across every app. No fresh warehouse scan per request.", read: "7 min" },
  { date: "Feb 20, 2026", title: "Self-healing deployments: when agents fix their own apps", tag: "Engineering", desc: "CVE detected? Canyon regenerates and redeploys. Error rate spiking? Canyon finds the root cause.", read: "6 min" },
];

const TAG_COLORS = { Product: CYAN, Customer: "#50FA7B", Industry: "#FFB464", Engineering: "#E078F0" };

export default function CanyonBlog() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box}
        @media(max-width:768px){.pnav-items{display:none !important}.phamburger{display:flex !important}.blog-grid{grid-template-columns:1fr !important}}
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

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
        <section style={{ paddingTop: 48, paddingBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 8px" }}>Blog</h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.45)", margin: "0 0 32px" }}>Product updates, customer stories, and thinking on enterprise AI.</p>
        </section>

        {/* Featured post */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 14, padding: "32px", cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#532E25"} onMouseLeave={e => e.currentTarget.style.borderColor = "#2A1F1C"}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(139,233,253,0.08)", color: CYAN }}>{POSTS[0].tag}</span>
              <span style={{ fontSize: 12, color: "rgba(240,224,219,0.3)" }}>{POSTS[0].date}</span>
              <span style={{ fontSize: 12, color: "rgba(240,224,219,0.25)" }}>{POSTS[0].read} read</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "rgba(240,224,219,0.95)", margin: "0 0 8px" }}>{POSTS[0].title}</h2>
            <p style={{ fontSize: 16, color: "rgba(240,224,219,0.5)", margin: 0, lineHeight: 1.6 }}>{POSTS[0].desc}</p>
          </div>
        </section>

        {/* Post grid */}
        <section style={{ paddingBottom: 60 }}>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {POSTS.slice(1).map((post, i) => (
              <div key={i} style={{ background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 12, padding: "20px", cursor: "pointer", transition: "border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#532E25"} onMouseLeave={e => e.currentTarget.style.borderColor = "#2A1F1C"}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: `${TAG_COLORS[post.tag]}12`, color: TAG_COLORS[post.tag] }}>{post.tag}</span>
                  <span style={{ fontSize: 12, color: "rgba(240,224,219,0.25)" }}>{post.read}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 6, lineHeight: 1.3 }}>{post.title}</div>
                <div style={{ fontSize: 14, color: "rgba(240,224,219,0.45)", lineHeight: 1.5 }}>{post.desc}</div>
                <div style={{ fontSize: 12, color: "rgba(240,224,219,0.3)", marginTop: 10 }}>{post.date}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 880, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
