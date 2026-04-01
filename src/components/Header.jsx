"use client";
import { useState } from "react";
import Link from "next/link";

const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const GREEN = "#50FA7B";

const PRODUCT_ITEMS = [
  { label: "Data Layer", sub: "Certified data & access controls", href: "/product/semantic-data-layer", color: CYAN },
  { label: "Agent Orchestration", sub: "Model-agnostic context injection", href: "/product/agent-orchestration", color: CRIMSON },
  { label: "Deployment", sub: "Your infrastructure, one click", href: "/product/deployment", color: GREEN },
];

const NAV_ITEMS = [
  { label: "Product", href: "/product", hasDropdown: true },
  { label: "Solutions", href: "/solutions/operations" },
  { label: "Security", href: "/security" },
  { label: "Resources", href: "/resources/blog" },
  { label: "Company", href: "#" },
];

export default function Header({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com";

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 20, padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(66,59,87,0.2)",
        background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          <img src="/logo.png" alt="Canyon" style={{ height: 20, width: "auto" }} />
        </Link>

        <nav className="nav-items" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {NAV_ITEMS.map((item, i) => item.hasDropdown ? (
            <div key={i} style={{ position: "relative" }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link href={item.href} style={{
                background: "transparent", border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: 12, textDecoration: "none",
                fontWeight: activeSection === "Product" ? 700 : 500,
                color: activeSection === "Product" ? "#F0E0DB" : "rgba(240,224,219,0.5)",
                padding: "4px 0", display: "flex", alignItems: "center", gap: 3,
              }}>
                {item.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </Link>
              {dropdownOpen && (
                <div style={{
                  position: "absolute", top: "100%", left: -12, paddingTop: 8,
                }}>
                  <div style={{
                    background: "rgba(30,28,42,0.95)", border: "1px solid rgba(66,59,87,0.35)",
                    borderRadius: 10, padding: "8px 4px", minWidth: 200,
                    backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}>
                    {PRODUCT_ITEMS.map((pi, j) => (
                      <Link key={j} href={pi.href} style={{
                        display: "block", padding: "10px 14px", borderRadius: 7, textDecoration: "none",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ width: 6, height: 6, borderRadius: 3, background: pi.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#F0E0DB" }}>{pi.label}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(240,224,219,0.4)", paddingLeft: 12 }}>{pi.sub}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link key={i} href={item.href} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 12, textDecoration: "none",
              fontWeight: activeSection === item.label ? 700 : 500,
              color: activeSection === item.label ? "#F0E0DB" : "rgba(240,224,219,0.5)",
              padding: "4px 0",
            }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href={calendlyUrl} target="_blank" style={{
            background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none",
            color: "#F0E0DB", padding: "7px 18px", borderRadius: 7,
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            textDecoration: "none",
          }}>Book a Demo</Link>
          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
            display: "none", background: "transparent", border: "none", cursor: "pointer",
            padding: 4, width: 32, height: 32, flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 25,
          background: "rgba(13,13,15,0.9)", backdropFilter: "blur(8px)",
        }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{ padding: "72px 28px 32px", display: "flex", flexDirection: "column", gap: 4 }} onClick={e => e.stopPropagation()}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{
                background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit",
                fontSize: 18, fontWeight: 600, color: "#F0E0DB", padding: "14px 0", textAlign: "left",
                borderBottom: "1px solid rgba(66,59,87,0.2)", textDecoration: "none", display: "block",
              }}>{item.label}</Link>
            ))}
            <Link href={calendlyUrl} target="_blank" onClick={() => setMobileMenuOpen(false)} style={{
              marginTop: 16, background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`,
              border: "none", borderRadius: 10, padding: "14px", color: "#F0E0DB",
              fontSize: 15, fontWeight: 700, textAlign: "center", textDecoration: "none", display: "block",
            }}>Book a Demo</Link>
          </div>
        </div>
      )}
    </>
  );
}
