"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CRIMSON = "#FF4444";

const TEMPLATES = [
  {
    id: "onboarding", label: "Partner onboarding tracker across Salesforce + APIs", icon: "🤝",
    prompt: "Our operations team manages partner onboarding across 3 countries with a 40-step spreadsheet. we need a real app that tracks status, documents, and approvals",
    sources: ["Salesforce", "DocuSign API", "Custom API"], solutionName: "Partner Onboarding Tracker", solutionType: "Application",
    features: ["40-step onboarding workflow with status tracking per partner", "Document collection and approval routing via DocuSign", "Regional compliance checklists auto-applied per country", "SSO-authenticated with role-based views for ops managers"],
    metrics: [{ label: "Active Partners", value: "127", sub: "across 3 countries", negative: false }, { label: "Avg Onboarding", value: "8 days", sub: "was 23 days manual", negative: false }, { label: "Completion Rate", value: "94%", sub: "+18% vs spreadsheet", negative: false }],
    chartData: [{ month: "Sep", score: 72, churn: 12 }, { month: "Oct", score: 78, churn: 9 }, { month: "Nov", score: 81, churn: 7 }, { month: "Dec", score: 85, churn: 5 }, { month: "Jan", score: 89, churn: 4 }, { month: "Feb", score: 91, churn: 3 }, { month: "Mar", score: 94, churn: 2 }],
    governance: "Partner PII scoped to regional ops managers · Document access logged · Audit trail enabled",
  },
  {
    id: "manufacturing", label: "Manufacturing defect monitoring from SAP + IoT", icon: "🏭",
    prompt: "Build a quality monitoring tool for our manufacturing plants that tracks defect rates across production lines in real-time",
    sources: ["SAP HANA", "IoT Sensor API", "MES Database"], solutionName: "Plant Quality Monitor", solutionType: "Application",
    features: ["Live defect rate tracking across 12 production lines", "Threshold-based alerting with Slack integration", "Shift-by-shift comparison and trend analysis", "Deployed on-premise. data never leaves your network"],
    metrics: [{ label: "Defect Rate", value: "2.1%", sub: "↓ 0.4% vs last week", negative: false }, { label: "Lines Active", value: "12/12", sub: "all lines reporting", negative: false }, { label: "Open Alerts", value: "3", sub: "2 resolved, 1 open", negative: true }],
    chartData: [{ month: "06:00", score: 2.4, churn: 1 }, { month: "08:00", score: 2.1, churn: 2 }, { month: "10:00", score: 1.8, churn: 0 }, { month: "12:00", score: 3.2, churn: 3 }, { month: "14:00", score: 2.5, churn: 1 }, { month: "16:00", score: 2.0, churn: 0 }, { month: "18:00", score: 2.1, churn: 1 }],
    governance: "Connected to plant-local SAP instance · No cloud egress · RBAC inherited from Active Directory",
  },
  {
    id: "shifts", label: "Shift planning tool from SAP HR + production forecasts", icon: "📅",
    prompt: "Our plant managers need to build weekly shift plans against production targets, pulling headcount from SAP HR and production forecasts from our MES",
    sources: ["SAP HANA", "BambooHR", "MES Database"], solutionName: "Shift Planning & Capacity Tool", solutionType: "Application",
    features: ["Weekly shift builder with drag-and-drop assignment", "Real-time headcount vs. production target matching", "Overtime and compliance alerts per labor regulation", "Plant manager self-service. no IT ticket required"],
    metrics: [{ label: "Overtime", value: "↓31%", sub: "vs. manual planning", negative: false }, { label: "Coverage", value: "98.5%", sub: "shift fill rate", negative: false }, { label: "Plans / Week", value: "12", sub: "across 4 plants", negative: false }],
    chartData: [{ month: "Mon", score: 96, churn: 3 }, { month: "Tue", score: 98, churn: 2 }, { month: "Wed", score: 97, churn: 2 }, { month: "Thu", score: 99, churn: 1 }, { month: "Fri", score: 95, churn: 4 }, { month: "Sat", score: 92, churn: 5 }, { month: "Sun", score: 94, churn: 3 }],
    governance: "HR data scoped to plant managers' own teams · No cross-plant visibility · Audit trail on all assignments",
  },
  {
    id: "reporting", label: "Automated board reports from 5 systems in one click", icon: "📊",
    prompt: "Our finance team spends 3 days every month manually pulling data from 5 different systems to create board-ready reports",
    sources: ["Snowflake", "NetSuite API", "Salesforce", "JIRA", "BambooHR"], solutionName: "Executive Report Generator", solutionType: "Automation",
    features: ["One-click generation from 5 connected data sources", "Board-ready PDF with branded templates", "Variance commentary auto-generated with AI", "Scheduled delivery. reports land Monday 8 AM"],
    metrics: [{ label: "Report Time", value: "< 5m", sub: "was 3 days manual", negative: false }, { label: "Sources", value: "5", sub: "all automated", negative: false }, { label: "Monthly Runs", value: "12", sub: "zero manual effort", negative: false }],
    chartData: [{ month: "Q1 '25", score: 12.4, churn: 14 }, { month: "Q2", score: 13.8, churn: 12 }, { month: "Q3", score: 15.2, churn: 11 }, { month: "Q4", score: 14.1, churn: 13 }, { month: "Q1 '26", score: 16.3, churn: 9 }],
    governance: "Finance data scoped to authorized cost centers · Export controls enforced · SOC 2 audit trail",
  },
];

const AWS_ACCOUNT = "938372841";
const REGION = "eu-central-1";

const BUILD_STEPS_FOR = (sources) => [
  { text: `Connecting to ${sources[0]}`, detail: "Authenticating via service account" },
  { text: "Mapping data schema", detail: `${Math.floor(Math.random() * 80 + 40)} tables across ${sources.length} sources` },
  { text: "Applying governance", detail: "Certified metrics · enforced access controls · audit trail" },
  { text: "Generating solution", detail: "Using your design system + architectural standards" },
  { text: "Containerizing", detail: "OCI image · workload identity · observable by default" },
  { text: `Deploying to AWS ${AWS_ACCOUNT}`, detail: `${REGION} · ECS Fargate · consistent metrics across every app · health check passed` },
];

const CUSTOM_STEPS = [
  { text: "Analyzing request", detail: "Identifying data sources and solution type" },
  { text: "Mapping enterprise data", detail: "Discovering schemas · resolving certified definitions" },
  { text: "Applying governance", detail: "Certified metrics · enforced access controls · audit trail" },
  { text: "Generating solution", detail: "Enterprise architectural standards applied" },
  { text: "Containerizing", detail: "OCI image · workload identity · observable by default" },
  { text: `Deploying to AWS ${AWS_ACCOUNT}`, detail: `${REGION} · ECS Fargate · consistent metrics across every app · health check passed` },
];

function BeforeAfterToggle() {
  const [showAfter, setShowAfter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const nodeStyle = (bg, border) => ({
    padding: "8px 12px", borderRadius: 8, fontSize: 10, fontWeight: 500,
    background: bg, border: `1px solid ${border}`, textAlign: "center", lineHeight: 1.3,
  });

  const problemItems = [
    "Direct access to raw tables",
    "No authentication",
    "No access controls",
    "Inconsistent metrics",
    "Deployed... somewhere?",
    "No audit trail",
  ];

  const canyonFeatures = [
    { icon: "🔍", label: "Semantic Layer", detail: "Certified metrics" },
    { icon: "🔐", label: "SSO + RBAC", detail: "Row-level access" },
    { icon: "🎨", label: "Design System", detail: "Your UI standards" },
    { icon: "📋", label: "Audit Trail", detail: "Every action logged" },
    { icon: "🚀", label: "Deploy Engine", detail: "Your infra, one click" },
    { icon: "👁️", label: "Observability", detail: "Full visibility" },
  ];

  return (
    <div className="canyon-section" style={{ marginTop: 64, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
      <h2 className="canyon-section-title" style={{ textAlign: "center", fontSize: 32, fontWeight: 700, letterSpacing: -0.5, color: "rgba(240,224,219,0.95)", margin: "0 0 6px" }}>
        What changes with Canyon
      </h2>
      <p style={{ textAlign: "center", fontSize: 13, color: "rgba(240,224,219,0.55)", margin: "0 0 28px" }}>
        Toggle to see the difference.
      </p>

      {/* Toggle buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 24 }}>
        <button
          onClick={() => setShowAfter(false)}
          style={{
            padding: isMobile ? "10px 16px" : "10px 20px", fontSize: 13, fontWeight: 600, fontFamily: "inherit",
            background: !showAfter ? "rgba(255,166,138,0.1)" : "rgba(54,50,72,0.2)",
            border: `1px solid ${!showAfter ? "rgba(255,166,138,0.25)" : "rgba(66,59,87,0.3)"}`,
            borderRadius: "10px 0 0 10px", cursor: "pointer",
            color: !showAfter ? "#FFA68A" : "rgba(240,224,219,0.55)",
            transition: "all 0.2s",
          }}
        >Without Canyon</button>
        <button
          onClick={() => setShowAfter(true)}
          style={{
            padding: isMobile ? "10px 16px" : "10px 20px", fontSize: 13, fontWeight: 600, fontFamily: "inherit",
            background: showAfter ? "rgba(80,250,123,0.1)" : "rgba(54,50,72,0.2)",
            border: `1px solid ${showAfter ? "rgba(80,250,123,0.25)" : "rgba(66,59,87,0.3)"}`,
            borderRadius: "0 10px 10px 0", cursor: "pointer",
            color: showAfter ? "#50FA7B" : "rgba(240,224,219,0.55)",
            transition: "all 0.2s",
          }}
        >With Canyon</button>
      </div>

      {/* Visual container */}
      <div style={{
        background: "rgba(54,50,72,0.22)", border: "1px solid rgba(66,59,87,0.3)",
        borderRadius: 16, padding: isMobile ? "20px 16px" : "32px",
        transition: "all 0.3s", overflow: "hidden",
      }}>
        {!showAfter ? (
          /* === WITHOUT CANYON === */
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            {isMobile ? (
              /* Mobile: vertical stack */
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Lovable", "Claude Code", "Cursor", "ChatGPT"].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(54,50,72,0.25)", border: "1px solid rgba(66,59,87,0.3)", color: "rgba(240,224,219,0.5)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "rgba(240,224,219,0.6)", textAlign: "center", padding: "4px 0" }}>↓ connect directly to ↓</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Snowflake", "SAP HANA", "Salesforce", "PostgreSQL"].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(255,166,138,0.04)", border: "1px solid rgba(255,166,138,0.12)", color: "rgba(255,166,138,0.6)" }}>{t} ⚠</span>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {problemItems.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 6, background: "rgba(255,166,138,0.04)", border: "1px dashed rgba(255,166,138,0.12)" }}>
                      <span style={{ color: "#FFA68A", fontSize: 10 }}>✗</span>
                      <span style={{ fontSize: 10, color: "rgba(255,166,138,0.6)" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop: 3-column */
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
                <div style={{ flex: "0 0 140px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(240,224,219,0.6)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>AI Tools</div>
                  {["Lovable", "Claude Code", "Cursor", "ChatGPT"].map(t => (
                    <div key={t} style={nodeStyle("rgba(54,50,72,0.2)", "rgba(66,59,87,0.3)")}>
                      <span style={{ color: "rgba(240,224,219,0.5)" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "10px 0" }}>
                  {problemItems.map((problem, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 6, background: "rgba(255,166,138,0.04)", border: "1px dashed rgba(255,166,138,0.15)", transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 1.5}deg)` }}>
                      <span style={{ color: "#FFA68A", fontSize: 10 }}>✗</span>
                      <span style={{ fontSize: 10, color: "rgba(255,166,138,0.6)" }}>{problem}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: "0 0 140px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(240,224,219,0.6)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Enterprise Data</div>
                  {["Snowflake", "SAP HANA", "Salesforce", "PostgreSQL"].map(t => (
                    <div key={t} style={nodeStyle("rgba(255,166,138,0.03)", "rgba(255,166,138,0.1)")}>
                      <span style={{ color: "rgba(255,166,138,0.6)" }}>{t}</span>
                      <div style={{ fontSize: 8, color: "rgba(255,166,138,0.35)", marginTop: 2 }}>⚠ exposed</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: 20, paddingTop: 14, borderTop: "1px solid rgba(255,166,138,0.08)" }}>
              <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 600, color: "rgba(255,166,138,0.7)" }}>Shadow IT, unmanaged risk, inconsistent data</div>
              <div style={{ fontSize: isMobile ? 10 : 11, color: "rgba(240,224,219,0.6)", marginTop: 4 }}>Every AI tool accesses raw tables directly. No governance. No visibility.</div>
            </div>
          </div>
        ) : (
          /* === WITH CANYON === */
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            {isMobile ? (
              /* Mobile: vertical flow */
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Lovable", "Claude Code", "Cursor", "Canyon UI"].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(54,50,72,0.25)", border: "1px solid rgba(66,59,87,0.3)", color: "rgba(240,224,219,0.5)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "rgba(240,224,219,0.6)", textAlign: "center", padding: "2px 0" }}>↓ routed through ↓</div>
                <div style={{
                  background: "linear-gradient(135deg, rgba(255,68,68,0.06), rgba(255,68,68,0.02))",
                  border: "1px solid rgba(255,68,68,0.15)", borderRadius: 12, padding: "12px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, marginBottom: 8, letterSpacing: 0.5, textAlign: "center" }}>CANYON</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                    {canyonFeatures.map((c, i) => (
                      <div key={i} style={{ padding: "5px 7px", background: "rgba(13,13,15,0.5)", borderRadius: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <span style={{ fontSize: 9 }}>{c.icon}</span>
                          <span style={{ fontSize: 8, fontWeight: 600, color: "rgba(240,224,219,0.6)" }}>{c.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: "rgba(240,224,219,0.6)", textAlign: "center", padding: "2px 0" }}>↓ deployed to ↓</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {[{ label: "Snowflake", status: "governed" }, { label: "SAP HANA", status: "governed" }, { label: "Salesforce", status: "governed" }, { label: "AWS", status: "deployed" }].map((t, i) => (
                    <span key={i} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(80,250,123,0.03)", border: "1px solid rgba(80,250,123,0.12)", color: "rgba(80,250,123,0.7)" }}>✓ {t.label}</span>
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop: 3-column with arrows */
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <div style={{ flex: "0 0 130px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(240,224,219,0.6)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Any AI Tool</div>
                  {["Lovable", "Claude Code", "Cursor", "Canyon UI"].map(t => (
                    <div key={t} style={nodeStyle("rgba(54,50,72,0.2)", "rgba(66,59,87,0.3)")}>
                      <span style={{ color: "rgba(240,224,219,0.5)" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: "0 0 24px", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                  <div style={{ width: 14, height: 1, background: "rgba(240,224,219,0.3)" }} />
                  <div style={{ width: 0, height: 0, borderLeft: "5px solid rgba(240,224,219,0.3)", borderTop: "3px solid transparent", borderBottom: "3px solid transparent" }} />
                </div>
                <div style={{ flex: 1, background: "linear-gradient(135deg, rgba(255,68,68,0.06), rgba(255,68,68,0.02))", border: "1px solid rgba(255,68,68,0.15)", borderRadius: 12, padding: "14px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: CRIMSON, marginBottom: 10, letterSpacing: 0.5, textAlign: "center" }}>CANYON</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {canyonFeatures.map((c, i) => (
                      <div key={i} style={{ padding: "6px 8px", background: "rgba(13,13,15,0.5)", borderRadius: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 10 }}>{c.icon}</span>
                          <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(240,224,219,0.6)" }}>{c.label}</span>
                        </div>
                        <div style={{ fontSize: 8, color: "rgba(240,224,219,0.6)", fontFamily: "'JetBrains Mono', monospace", marginTop: 1 }}>{c.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flex: "0 0 24px", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                  <div style={{ width: 14, height: 1, background: "rgba(240,224,219,0.3)" }} />
                  <div style={{ width: 0, height: 0, borderLeft: "5px solid rgba(240,224,219,0.3)", borderTop: "3px solid transparent", borderBottom: "3px solid transparent" }} />
                </div>
                <div style={{ flex: "0 0 130px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(240,224,219,0.6)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Your Stack</div>
                  {[{ label: "Snowflake", status: "governed" }, { label: "SAP HANA", status: "governed" }, { label: "Salesforce", status: "governed" }, { label: "AWS", status: "deployed" }].map((t, i) => (
                    <div key={i} style={nodeStyle("rgba(80,250,123,0.03)", "rgba(80,250,123,0.1)")}>
                      <span style={{ color: "rgba(80,250,123,0.7)" }}>{t.label}</span>
                      <div style={{ fontSize: 8, color: "rgba(80,250,123,0.4)", marginTop: 2 }}>✓ {t.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: 20, paddingTop: 14, borderTop: "1px solid rgba(80,250,123,0.08)" }}>
              <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 600, color: "rgba(80,250,123,0.8)" }}>Governed, deployed, production-ready</div>
              <div style={{ fontSize: isMobile ? 10 : 11, color: "rgba(240,224,219,0.6)", marginTop: 4 }}>Certified metrics. Enforced access controls. Deployed to your infrastructure.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function MeetCanyonSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "Describe your problem",
      title: "Start with what you need",
      sub: "Any team member describes a business problem in plain language. Canyon identifies data sources, maps schemas, and connects automatically.",
      visual: (
        <div style={{ background: "rgba(54,50,72,0.22)", borderRadius: 12, border: "1px solid rgba(66,59,87,0.3)", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(54,50,72,0.25)" }}>
            <div style={{ fontSize: 13, color: "rgba(240,224,219,0.5)", fontStyle: "italic", lineHeight: 1.7 }}>
              "I need a dashboard showing defect rates across all 12 production lines, pulling from our SAP HANA and the IoT sensor feeds..."
            </div>
          </div>
          <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 10, color: "rgba(240,224,219,0.6)", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>Detected sources</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["SAP HANA", "IoT Sensor API", "MES Database"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 9px", background: "rgba(255,68,68,0.06)", border: "1px solid rgba(255,68,68,0.12)", borderRadius: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#50FA7B" }} />
                  <span style={{ fontSize: 10, color: "rgba(240,224,219,0.6)", fontWeight: 500 }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: "rgba(240,224,219,0.55)", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
              147 tables discovered · 3 sources connected · schema mapped
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Governance by default",
      title: "Certified metrics, not raw tables",
      sub: "Without Canyon, every AI app reinvents your metrics. With Canyon, every app reuses certified definitions. with SSO, access controls, design system, and audit trails injected by default.",
      visual: (
        <div style={{ background: "rgba(54,50,72,0.22)", borderRadius: 12, border: "1px solid rgba(66,59,87,0.3)", padding: "14px 16px" }}>
          {[
            { icon: "🔐", text: "SSO inherited from Okta", detail: "SAML 2.0 · auto-provisioned", done: true },
            { icon: "👥", text: "RBAC applied: Plant Manager, Shift Lead, Analyst", detail: "3 roles · attribute-based", done: true },
            { icon: "🎨", text: "Design system v4.2 injected", detail: "React components · brand tokens", done: true },
            { icon: "📋", text: "Audit trail enabled", detail: "Immutable · SOC 2 compliant", done: true },
            { icon: "🔒", text: "Data access scoped to approved views", detail: "PII masked by default", done: true },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(54,50,72,0.2)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13 }}>{r.icon}</span>
                <div>
                  <span style={{ fontSize: 12, color: "rgba(240,224,219,0.6)" }}>{r.text}</span>
                  <div style={{ fontSize: 9, color: "rgba(240,224,219,0.55)", fontFamily: "'JetBrains Mono', monospace", marginTop: 1 }}>{r.detail}</div>
                </div>
              </div>
              <span style={{ fontSize: 11, color: "#50FA7B", fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>✓</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Deployed to production",
      title: "Running on your infrastructure in one click",
      sub: "Containerized, identity-injected, deployed to your AWS/Azure/GCP. Shareable URL, full observability, audit trails.",
      visual: (
        <div style={{ background: "rgba(54,50,72,0.22)", borderRadius: 12, border: "1px solid rgba(66,59,87,0.3)", overflow: "hidden" }}>
          {/* Browser chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderBottom: "1px solid rgba(54,50,72,0.25)", background: "rgba(54,50,72,0.22)" }}>
            <div style={{ display: "flex", gap: 3 }}>{["#ff5f57","#ffbd2e","#28c840"].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c, opacity: 0.5 }} />)}</div>
            <div style={{ flex: 1, textAlign: "center", fontSize: 9, color: "rgba(240,224,219,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>app.internal.company.com/plant-quality-monitor</div>
            <span style={{ fontSize: 8, color: "rgba(240,224,219,0.5)" }}>🔒 SSO</span>
          </div>
          {/* App preview */}
          <div style={{ padding: "12px" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              {[{ v: "2.1%", l: "Defect Rate" }, { v: "12/12", l: "Lines Active" }, { v: "3", l: "Alerts" }].map((m, i) => (
                <div key={i} style={{ flex: 1, background: "rgba(54,50,72,0.22)", borderRadius: 6, padding: "8px" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#F0E0DB", letterSpacing: -0.5, lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontSize: 7, color: "rgba(240,224,219,0.6)", textTransform: "uppercase", marginTop: 2, letterSpacing: 0.3 }}>{m.l}</div>
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40, marginBottom: 8, padding: "0 2px" }}>
              {[40, 65, 35, 80, 50, 30, 55, 70, 45, 60].map((h, j) => (
                <div key={j} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: `linear-gradient(to top, rgba(215,136,109,0.3), rgba(255,68,68,0.05))` }} />
              ))}
            </div>
            {/* Deploy info */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", background: "rgba(80,250,123,0.03)", borderRadius: 4, border: "1px solid rgba(80,250,123,0.08)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#50FA7B" }} />
              <span style={{ fontSize: 9, color: "rgba(240,224,219,0.55)", fontFamily: "'JetBrains Mono', monospace" }}>
                AWS 938372841 · eu-central-1 · ECS Fargate · health check passed
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="canyon-section" style={{ marginTop: 120, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
      <h2 className="canyon-section-title" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5, marginBottom: 32, color: "rgba(240,224,219,0.95)" }}>
        Meet Canyon
      </h2>

      {/* Tabs */}
      <div className="canyon-tabs" style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid rgba(66,59,87,0.3)" }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              flex: 1, padding: "12px 16px", background: "transparent", border: "none",
              borderBottom: activeTab === i ? `2px solid ${CRIMSON}` : "2px solid transparent",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span style={{
              width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
              background: activeTab === i ? "rgba(255,68,68,0.12)" : "rgba(54,50,72,0.25)",
              color: activeTab === i ? CRIMSON : "rgba(240,224,219,0.5)",
              transition: "all 0.2s",
            }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{
              fontSize: 13, fontWeight: activeTab === i ? 600 : 400,
              color: activeTab === i ? "rgba(240,224,219,0.95)" : "rgba(240,224,219,0.55)",
              transition: "all 0.2s", textAlign: "left",
            }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="canyon-tab-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "start" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(240,224,219,0.97)", marginBottom: 10, lineHeight: 1.2 }}>
            {tabs[activeTab].title}
          </div>
          <div style={{ fontSize: 13, color: "rgba(240,224,219,0.6)", lineHeight: 1.7 }}>
            {tabs[activeTab].sub}
          </div>
        </div>
        <div>{tabs[activeTab].visual}</div>
      </div>
    </div>
  );
}

export default function CanyonDemo() {
  const [phase, setPhase] = useState("idle"); // idle | email_gate | building | result
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [buildStep, setBuildStep] = useState(-1);
  const [buildSteps, setBuildSteps] = useState([]);
  const [displayResult, setDisplayResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const taRef = useRef(null);
  const resultRef = useRef(null);

  const runBuild = useCallback((steps, onDone) => {
    setPhase("building"); setBuildSteps(steps); setBuildStep(-1);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= steps.length) { clearInterval(iv); setTimeout(onDone, 500); return; }
      setBuildStep(i); i++;
    }, 750);
  }, []);

  const handleTemplate = useCallback((t) => {
    setInput(t.prompt); setDisplayResult(t);
    runBuild(BUILD_STEPS_FOR(t.sources), () => { setPhase("result"); setShowResult(true); });
  }, [runBuild]);

  // Step 1: User types custom input and hits submit → show email gate
  const handleSubmitStart = useCallback(() => {
    if (!input.trim()) return;
    setPhase("email_gate");
  }, [input]);

  // Step 2: User provides email → run the actual build
  const handleEmailSubmit = useCallback(async () => {
    if (!email.trim()) return;
    // In production: POST to HubSpot Forms API here
    // { email, company, custom_prompt: input }
    console.log("Lead captured:", { email, company, prompt: input });

    setDisplayResult(null);
    let stepI = 0;
    setPhase("building"); setBuildSteps(CUSTOM_STEPS); setBuildStep(-1);
    const iv = setInterval(() => { if (stepI >= CUSTOM_STEPS.length) { clearInterval(iv); return; } setBuildStep(stepI); stepI++; }, 1100);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are Canyon. User describes a business problem. Respond ONLY with JSON (no markdown):
{"solutionName":"short name","solutionType":"Dashboard|Application|Automation|Analytics","sources":["2-4 enterprise data sources"],"features":["4 capabilities mentioning SSO, RBAC, audit"],"metrics":[{"label":"name","value":"short","sub":"context","negative":false},{"label":"...","value":"...","sub":"...","negative":false},{"label":"...","value":"...","sub":"...","negative":false}],"governance":"1 sentence","chartData":[{"month":"label","score":number,"churn":number},...6-7 points]}`,
          messages: [{ role: "user", content: input }],
        }),
      });
      const data = await res.json();
      const parsed = JSON.parse((data.content?.map(c => c.text || "").join("") || "").replace(/```json|```/g, "").trim());
      clearInterval(iv); setBuildStep(CUSTOM_STEPS.length - 1); setDisplayResult(parsed);
      setTimeout(() => { setPhase("result"); setShowResult(true); }, 600);
    } catch {
      clearInterval(iv); setBuildStep(CUSTOM_STEPS.length - 1);
      setDisplayResult({
        solutionName: "Custom Solution", solutionType: "Application", sources: ["Snowflake", "Internal APIs"],
        features: ["Connected to enterprise data", "SSO and RBAC enforced", "Deployed to your infrastructure", "Full audit trail"],
        metrics: [{ label: "Deploy Time", value: "< 5m", sub: "prompt to production", negative: false }, { label: "Data Sources", value: "Live", sub: "schema mapped", negative: false }, { label: "Governance", value: "Active", sub: "SSO + RBAC", negative: false }],
        governance: "All data access governed by existing enterprise policies.",
        chartData: [{ month: "W1", score: 40, churn: 8 }, { month: "W2", score: 55, churn: 6 }, { month: "W3", score: 68, churn: 4 }, { month: "W4", score: 72, churn: 3 }],
      });
      setTimeout(() => { setPhase("result"); setShowResult(true); }, 600);
    }
  }, [input, email, company]);

  const handleReset = () => { setPhase("idle"); setInput(""); setEmail(""); setCompany(""); setBuildStep(-1); setDisplayResult(null); setShowResult(false); };

  useEffect(() => { if (showResult && resultRef.current) resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); }, [showResult]);
  useEffect(() => { if (taRef.current) { taRef.current.style.height = "auto"; taRef.current.style.height = Math.min(taRef.current.scrollHeight, 140) + "px"; } }, [input]);

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap');
        @keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}
        @keyframes checkPop{0%{transform:scale(0)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
        @keyframes breathe{0%,100%{opacity:.7}50%{opacity:1}}
        @keyframes floatNode{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        *{box-sizing:border-box}
        textarea::placeholder{color:rgba(240,224,219,0.3)}
        textarea:focus{outline:none}
        input::placeholder{color:rgba(240,224,219,0.3)}
        input:focus{outline:none}
        ::-webkit-scrollbar{width:0px}
        ::-webkit-scrollbar-thumb{background:transparent}

        /* Mobile responsive */
        @media(max-width:768px){
          .canyon-nav{display:none !important}
          .canyon-hamburger{display:flex !important}
          .canyon-hero-title{font-size:28px !important;letter-spacing:-0.3px !important}
          .canyon-section{margin-top:60px !important;padding-left:4px !important;padding-right:4px !important}
          .canyon-section-title{font-size:24px !important}
          .canyon-grid-2{grid-template-columns:1fr !important}
          .canyon-grid-3{grid-template-columns:1fr !important}
          .canyon-grid-2-auto{display:flex !important;flex-direction:column !important;gap:16px !important}
          .canyon-toggle-diagram{flex-direction:column !important;gap:16px !important}
          .canyon-toggle-diagram>div:nth-child(2){display:none !important}
          .canyon-toggle-diagram>div:nth-child(4){display:none !important}
          .canyon-tabs{flex-direction:column !important;gap:0 !important}
          .canyon-tabs button{border-bottom:1px solid rgba(66,59,87,0.28) !important;border-right:none !important}
          .canyon-tab-content{grid-template-columns:1fr !important;gap:20px !important}
          .canyon-big-number{font-size:36px !important}
          .canyon-case-study{grid-template-columns:1fr !important;gap:20px !important;padding:20px !important}
          .canyon-template-chips{flex-direction:column !important}
          .canyon-template-chips button{max-width:100% !important;flex:1 1 100% !important}
          .canyon-metric-row{grid-template-columns:1fr 1fr !important}
          .canyon-feature-grid{grid-template-columns:1fr !important}
          .canyon-logo-row{gap:20px !important}
          .canyon-logo-row span{font-size:11px !important}
          .canyon-footer{flex-direction:column !important;gap:12px !important;text-align:center !important}
          .canyon-input-card{border-radius:14px !important}
          .canyon-bottom-cta-title{font-size:22px !important}
          .canyon-hero-pad{padding-top:8vh !important}
        }
        @media(max-width:480px){
          .canyon-hero-title{font-size:24px !important}
          .canyon-metric-row{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* Atmospheric gradient background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 140% 60% at 50% -5%, rgba(83,46,37,0.3) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 10% 80%, rgba(66,59,87,0.32) 0%, transparent 45%),
          radial-gradient(ellipse 60% 40% at 95% 70%, rgba(255,68,68,0.05) 0%, transparent 40%),
          radial-gradient(ellipse 40% 30% at 50% 50%, rgba(54,50,72,0.2) 0%, transparent 50%)
        `,
      }} />

      {/* Topographic mesh lines. SVG pattern overlay */}
      <svg style={{ position: "fixed", inset: 0, zIndex: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.04 }}>
        <defs>
          <pattern id="topoLines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M0 80 Q50 40 100 80 T200 80" stroke="#DDBAB1" strokeWidth="0.8" fill="none"/>
            <path d="M0 100 Q60 55 120 100 T240 100" stroke="#DDBAB1" strokeWidth="0.6" fill="none"/>
            <path d="M0 120 Q40 90 100 120 T200 120" stroke="#DDBAB1" strokeWidth="0.5" fill="none"/>
            <path d="M0 140 Q70 110 140 140 T280 140" stroke="#DDBAB1" strokeWidth="0.4" fill="none"/>
            <path d="M0 160 Q50 135 100 160 T200 160" stroke="#DDBAB1" strokeWidth="0.3" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topoLines)"/>
      </svg>

      {/* Floating node/connection network. bottom area */}
      <svg style={{ position: "fixed", bottom: 0, left: 0, width: "100%", height: "50%", zIndex: 0, pointerEvents: "none", opacity: 0.06 }}>
        {/* Connection lines */}
        <line x1="10%" y1="30%" x2="25%" y2="60%" stroke="#DDBAB1" strokeWidth="0.5"/>
        <line x1="25%" y1="60%" x2="45%" y2="40%" stroke="#DDBAB1" strokeWidth="0.5"/>
        <line x1="45%" y1="40%" x2="65%" y2="70%" stroke="#DDBAB1" strokeWidth="0.5"/>
        <line x1="65%" y1="70%" x2="80%" y2="35%" stroke="#DDBAB1" strokeWidth="0.5"/>
        <line x1="80%" y1="35%" x2="95%" y2="55%" stroke="#DDBAB1" strokeWidth="0.5"/>
        <line x1="25%" y1="60%" x2="65%" y2="70%" stroke="#DDBAB1" strokeWidth="0.3"/>
        <line x1="10%" y1="30%" x2="45%" y2="40%" stroke="#DDBAB1" strokeWidth="0.3"/>
        <line x1="45%" y1="40%" x2="80%" y2="35%" stroke="#DDBAB1" strokeWidth="0.3"/>
        {/* Nodes */}
        <circle cx="10%" cy="30%" r="4" fill="#4D4767" stroke="#6272A4" strokeWidth="0.5"/>
        <circle cx="25%" cy="60%" r="5" fill="#4D4767" stroke="#6272A4" strokeWidth="0.5"/>
        <circle cx="45%" cy="40%" r="6" fill="#FF4444" opacity="0.6"/>
        <circle cx="65%" cy="70%" r="4" fill="#4D4767" stroke="#6272A4" strokeWidth="0.5"/>
        <circle cx="80%" cy="35%" r="5" fill="#4D4767" stroke="#6272A4" strokeWidth="0.5"/>
        <circle cx="95%" cy="55%" r="4" fill="#FF4444" opacity="0.4"/>
      </svg>

      {/* Header */}
      <header style={{
        position: "relative", zIndex: 20, padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(66,59,87,0.28)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img src={"data:image/png;base64,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"} alt="Canyon" style={{ height: 20, width: "auto" }} />
        </div>

        {/* Nav */}
        <nav className="canyon-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {[
            { label: "Product", hasDropdown: true },
            { label: "Solutions" },
            { label: "Security" },
            { label: "Resources", hasDropdown: true },
            { label: "Company" },
          ].map((item, i) => (
            <button key={i} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 12, fontWeight: 500,
              color: "rgba(240,224,219,0.5)", padding: "4px 0",
              display: "flex", alignItems: "center", gap: 3,
              transition: "color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#F0E0DB"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(240,224,219,0.5)"}
            >
              {item.label}
              {item.hasDropdown && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              )}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {phase !== "idle" ? (
            <button onClick={handleReset} style={{
              background: "rgba(54,50,72,0.25)", border: "1px solid rgba(66,59,87,0.35)",
              color: "rgba(240,224,219,0.5)", padding: "6px 14px", borderRadius: 7,
              fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
            }}>← Start over</button>
          ) : (
            <button onClick={() => window.open("https://calendly.com", "_blank")} style={{
              background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`,
              border: "none",
              color: "#F0E0DB", padding: "7px 18px", borderRadius: 7,
              fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.2s",
            }}>Book a Demo</button>
          )}

          {/* Hamburger. hidden on desktop, visible on mobile */}
          <button
            className="canyon-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none", background: "transparent", border: "none",
              cursor: "pointer", padding: 4, flexDirection: "column", gap: 4,
              alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
            }}
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 19, background: "rgba(13,13,15,0.85)",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          animation: "fadeUp 0.2s ease",
        }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{
            padding: "72px 28px 32px",
            display: "flex", flexDirection: "column", gap: 4,
          }} onClick={e => e.stopPropagation()}>
            {["Product", "Solutions", "Security", "Resources", "Company"].map(label => (
              <button
                key={label}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "inherit", fontSize: 18, fontWeight: 600,
                  color: "#F0E0DB", padding: "14px 0",
                  textAlign: "left",
                  borderBottom: "1px solid rgba(66,59,87,0.28)",
                }}
              >{label}</button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); window.open("https://calendly.com", "_blank"); }}
              style={{
                marginTop: 16,
                background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`,
                border: "none", borderRadius: 10, padding: "14px",
                color: "#F0E0DB", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                textAlign: "center",
              }}
            >Book a Demo</button>
          </div>
        </div>
      )}

      <main style={{ position: "relative", zIndex: 5, maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>

        {/* === IDLE === */}
        {phase === "idle" && (
          <div className="canyon-hero-pad" style={{ paddingTop: "14vh", animation: "fadeUp 0.6s ease" }}>
            <h1 className="canyon-hero-title" style={{
              textAlign: "center", margin: "0 0 10px",
              fontSize: 42, fontWeight: 700, lineHeight: 1.12, letterSpacing: -0.8,
              color: "rgba(240,224,219,0.95)",
            }}>
              Just build it.
            </h1>
            <p style={{
              textAlign: "center", margin: "0 auto 10px",
              fontSize: 16, color: "rgba(240,224,219,0.55)", fontWeight: 400,
            }}>
              <span style={{
                background: `linear-gradient(90deg, ${CRIMSON}, #FFA68A)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontWeight: 600,
              }}>On your data and infrastructure.</span>
            </p>
            <p style={{
              textAlign: "center", margin: "0 auto 44px",
              fontSize: 14, color: "rgba(240,224,219,0.5)", fontWeight: 400, maxWidth: 420,
            }}>
              Create apps, reports and tools across your enterprise securely.
            </p>

            {/* Input card */}
            <div className="canyon-input-card" style={{
              background: inputFocused ? "rgba(54,50,72,0.35)" : "rgba(54,50,72,0.2)",
              border: `1px solid ${inputFocused ? "rgba(215,136,109,0.3)" : "rgba(66,59,87,0.35)"}`,
              borderRadius: 18, padding: "18px 18px 12px",
              maxWidth: 640, margin: "0 auto",
              boxShadow: inputFocused
                ? "0 0 60px rgba(215,136,109,0.06), 0 4px 40px rgba(0,0,0,0.25)"
                : "0 2px 30px rgba(13,13,15,0.6)",
              transition: "all 0.3s ease",
            }}>
              <textarea
                ref={taRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmitStart(); } }}
                placeholder="Describe what your team needs to build..."
                rows={2}
                style={{
                  width: "100%", background: "transparent", border: "none", resize: "none",
                  color: "#F0E0DB", fontSize: 15, fontFamily: "inherit", fontWeight: 400,
                  lineHeight: 1.6, padding: 0, minHeight: 52,
                }}
              />
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(54,50,72,0.2)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* Attach file */}
                  <button style={{
                    width: 32, height: 32, borderRadius: 8, background: "transparent",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }} onMouseEnter={e => e.currentTarget.style.background = "rgba(66,59,87,0.32)"}
                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,224,219,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  {/* Connect data source */}
                  <button style={{
                    width: 32, height: 32, borderRadius: 8, background: "transparent",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }} onMouseEnter={e => e.currentTarget.style.background = "rgba(66,59,87,0.32)"}
                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,224,219,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </button>
                  {/* Mic / voice */}
                  <button style={{
                    width: 32, height: 32, borderRadius: 8, background: "transparent",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }} onMouseEnter={e => e.currentTarget.style.background = "rgba(66,59,87,0.32)"}
                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,224,219,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleSubmitStart}
                  disabled={!input.trim()}
                  style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: input.trim() ? `linear-gradient(135deg, ${CRIMSON}, #532E25)` : "rgba(66,59,87,0.32)",
                    border: "none", cursor: input.trim() ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", opacity: input.trim() ? 1 : 0.35,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F0E0DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Templates as subtle chips */}
            <div className="canyon-template-chips" style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", maxWidth: 640, margin: "18px auto 0" }}>
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => handleTemplate(t)} style={{
                  background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.32)",
                  borderRadius: 9, padding: "8px 12px", cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
                  flex: "1 1 calc(50% - 4px)", minWidth: 200,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(215,136,109,0.3)"; e.currentTarget.style.background = "rgba(255,68,68,0.03)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(66,59,87,0.32)"; e.currentTarget.style.background = "rgba(54,50,72,0.2)"; }}
                >
                  <span style={{ fontSize: 13 }}>{t.icon}</span>
                  <span style={{ fontSize: 11, color: "rgba(240,224,219,0.6)", fontWeight: 400, textAlign: "left", lineHeight: 1.4 }}>{t.label}</span>
                </button>
              ))}
            </div>


            {/* === CUSTOMER LOGOS === */}
            <div style={{ marginTop: 80, textAlign: "center" }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,224,219,0.55)", marginBottom: 20 }}>
                Trusted by enterprise teams
              </p>
              <div className="canyon-logo-row" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 36, flexWrap: "wrap", opacity: 0.3 }}>
                {["SIXT", "Cimpress", "Fortescue", "E.ON", "PayPal", "Rohlik"].map(n => (
                  <span key={n} style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#F0E0DB" }}>{n}</span>
                ))}
              </div>
            </div>

            {/* === BEFORE / AFTER TOGGLE === */}
            <BeforeAfterToggle />

            {/* === MEET CANYON. TABBED 3-STEP === */}
            <MeetCanyonSection />

            {/* === TEMPLATE GALLERY === */}
            <div className="canyon-section" style={{ marginTop: 120, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <h2 className="canyon-section-title" style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5, margin: "0 0 4px", color: "rgba(240,224,219,0.95)" }}>What teams are building</h2>
                  <p style={{ fontSize: 13, color: "rgba(240,224,219,0.5)", margin: 0 }}>The tools that fall between BI and engineering</p>
                </div>
                <button style={{
                  background: "rgba(54,50,72,0.25)", border: "1px solid rgba(66,59,87,0.4)",
                  borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontFamily: "inherit",
                  fontSize: 12, fontWeight: 500, color: "rgba(240,224,219,0.5)",
                  transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(240,224,219,0.5)"; e.currentTarget.style.color = "rgba(240,224,219,0.9)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(66,59,87,0.4)"; e.currentTarget.style.color = "rgba(240,224,219,0.5)"; }}
                >View all</button>
              </div>
              <div className="canyon-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { title: "Plant Quality Monitor", tag: "Manufacturing", tech: "SAP HANA + IoT", outcome: "Replaced weeks of manual reconciliation across 12 factories",
                    metrics: [{ v: "2.1%", l: "Defect Rate" }, { v: "12/12", l: "Lines" }],
                    chartBars: [40, 65, 35, 80, 50, 30, 45] },
                  { title: "Executive Report Generator", tag: "Finance", tech: "Snowflake + NetSuite + 3 more", outcome: "Finance went from 3 days to 5 minutes per report cycle",
                    metrics: [{ v: "< 5m", l: "Report Time" }, { v: "5", l: "Sources" }],
                    chartBars: [30, 45, 60, 55, 70, 50, 65] },
                  { title: "Partner Onboarding Tracker", tag: "Operations", tech: "Salesforce + DocuSign + Custom API", outcome: "Replaced a 40-step spreadsheet. onboarding time dropped from 23 to 8 days",
                    metrics: [{ v: "8 days", l: "Avg Onboard" }, { v: "94%", l: "Completion" }],
                    chartBars: [40, 52, 60, 68, 75, 82, 94] },
                  { title: "Shift Planning & Capacity Tool", tag: "Manufacturing", tech: "SAP HANA + BambooHR + MES", outcome: "Plant managers build weekly shift plans themselves. 31% less overtime",
                    metrics: [{ v: "↓31%", l: "Overtime" }, { v: "98.5%", l: "Coverage" }],
                    chartBars: [88, 92, 95, 97, 96, 90, 93] },
                ].map((tile, i) => (
                  <div key={i} style={{
                    background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.32)",
                    borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s, transform 0.2s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(215,136,109,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(66,59,87,0.32)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {/* Mock app screenshot */}
                    <div style={{ padding: "12px 12px 8px", background: "rgba(13,13,15,0.6)" }}>
                      {/* Mini browser bar */}
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 3 }}>{["#ff5f57","#ffbd2e","#28c840"].map(c => <div key={c} style={{ width: 5, height: 5, borderRadius: "50%", background: c, opacity: 0.4 }} />)}</div>
                        <div style={{ flex: 1, background: "rgba(54,50,72,0.25)", borderRadius: 3, padding: "2px 6px", fontSize: 7, color: "rgba(240,224,219,0.5)", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
                          app.internal.company.com/{tile.title.toLowerCase().replace(/\s+/g, "-")}
                        </div>
                      </div>
                      {/* Metric cards */}
                      <div style={{ display: "flex", gap: 5, marginBottom: 6 }}>
                        {tile.metrics.map((m, j) => (
                          <div key={j} style={{ flex: 1, background: "rgba(54,50,72,0.2)", borderRadius: 5, padding: "7px 8px" }}>
                            <div style={{ fontSize: 16, fontWeight: 800, color: "#F0E0DB", letterSpacing: -0.5, lineHeight: 1 }}>{m.v}</div>
                            <div style={{ fontSize: 7, color: "rgba(240,224,219,0.6)", textTransform: "uppercase", marginTop: 2, letterSpacing: 0.3 }}>{m.l}</div>
                          </div>
                        ))}
                      </div>
                      {/* Mini chart bars */}
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36, padding: "0 2px" }}>
                        {tile.chartBars.map((h, j) => (
                          <div key={j} style={{
                            flex: 1, height: `${h}%`, borderRadius: 2,
                            background: `linear-gradient(to top, rgba(255,68,68,0.15), rgba(255,68,68,0.05))`,
                          }} />
                        ))}
                      </div>
                    </div>
                    {/* Info */}
                    <div style={{ padding: "10px 12px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: CRIMSON, padding: "2px 5px", background: "rgba(255,68,68,0.08)", borderRadius: 3, textTransform: "uppercase", letterSpacing: 0.3 }}>{tile.tag}</span>
                        <span style={{ fontSize: 9, color: "rgba(240,224,219,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>{tile.tech}</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(240,224,219,0.95)", marginBottom: 3, lineHeight: 1.3 }}>{tile.title}</div>
                      <div style={{ fontSize: 11, color: "rgba(240,224,219,0.5)", lineHeight: 1.5 }}>{tile.outcome}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* === BIG NUMBERS === */}
            <div style={{ marginTop: 100, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
              <div className="canyon-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { number: "240+", label: "apps deployed at a single enterprise", sub: "in production, not prototypes" },
                  { number: "5 min", label: "from prompt to production", sub: "including governance & deployment" },
                  { number: "70+", label: "apps built in the first week", sub: "by non-engineers, on real data" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(54,50,72,0.2)", border: "1px solid rgba(66,59,87,0.32)", borderRadius: 14, padding: "32px 24px" }}>
                    <div className="canyon-big-number" style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, lineHeight: 1, color: "#F0E0DB", marginBottom: 12 }}>{s.number}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(240,224,219,0.55)", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(240,224,219,0.55)" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* === CASE STUDY + CTA === */}
            <div style={{ marginTop: 100, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
              {/* EU sovereignty */}
              <div style={{
                marginBottom: 20, padding: "10px 16px", borderRadius: 8,
                background: "rgba(54,50,72,0.22)", border: "1px solid rgba(54,50,72,0.25)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: 14 }}>🇪🇺</span>
                <span style={{ fontSize: 11, color: "rgba(240,224,219,0.55)" }}>European data sovereignty by default. Canyon runs in your region, on your infrastructure.</span>
              </div>

              <div className="canyon-case-study" style={{
                background: "rgba(54,50,72,0.22)", border: "1px solid rgba(66,59,87,0.3)",
                borderRadius: 16, padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36,
              }}>
                <div>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: CRIMSON, padding: "3px 8px", background: "rgba(255,68,68,0.08)", borderRadius: 4 }}>Case Study</span>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(240,224,219,0.97)", marginTop: 16, marginBottom: 8 }}>Global manufacturer · $2B+ revenue</div>
                  <div style={{ fontSize: 12, color: "rgba(240,224,219,0.55)", lineHeight: 1.7, marginBottom: 20 }}>
                    100 engineers were building simple internal apps. Plants waited months for every request. No standard way to access production data securely.
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(240,224,219,0.6)", fontStyle: "italic", borderLeft: `2px solid ${CRIMSON}`, paddingLeft: 14 }}>
                    "Fantastic timing. this is exactly what we need now."
                    <div style={{ marginTop: 4, fontStyle: "normal", fontSize: 11, color: "rgba(240,224,219,0.6)" }}>VP Technology</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(240,224,219,0.6)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>After Canyon</div>
                  {[
                    { metric: "Hours, not months", detail: "Plant managers build their own tools" },
                    { metric: "Governed by default", detail: "Certified metrics, access rules, audit trails" },
                    { metric: "Their infrastructure", detail: "Deployed to existing AWS environment" },
                    { metric: "70+ apps, week one", detail: "CEO to analyst, zero coding experience" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                      <span style={{ color: "#50FA7B", fontSize: 14, marginTop: 0 }}>✓</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>{item.metric}</div>
                        <div style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* === BOTTOM CTA === */}
            <div style={{ textAlign: "center", marginTop: 80, paddingBottom: 80 }}>
              <div className="canyon-bottom-cta-title" style={{ fontSize: 28, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 8, letterSpacing: -0.3 }}>Ready to see it on your data?</div>
              <div style={{ fontSize: 13, color: "rgba(240,224,219,0.55)", marginBottom: 28 }}>30 minutes. Your stack. A real use case from your team.</div>
              <button
                onClick={() => window.open("https://calendly.com", "_blank")}
                style={{
                  background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`,
                  border: "none", borderRadius: 10, padding: "14px 32px",
                  color: "#F0E0DB", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  fontFamily: "inherit", boxShadow: "0 4px 20px rgba(215,136,109,0.3)",
                  transition: "transform 0.15s",
                }}
                onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
              >
                Book a Demo →
              </button>
            </div>

          </div>
        )}

        {/* === EMAIL GATE === */}
        {phase === "email_gate" && (
          <div style={{ paddingTop: "12vh", animation: "fadeUp 0.4s ease" }}>
            {/* What they typed */}
            <div style={{
              background: "rgba(54,50,72,0.22)", borderRadius: 12, padding: "12px 16px",
              maxWidth: 480, margin: "0 auto 28px", border: "1px solid rgba(66,59,87,0.32)",
            }}>
              <p style={{ fontSize: 13, color: "rgba(240,224,219,0.5)", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
                "{input.length > 120 ? input.slice(0, 120) + "..." : input}"
              </p>
            </div>

            {/* Email capture card */}
            <div style={{
              maxWidth: 420, margin: "0 auto",
              background: "rgba(54,50,72,0.22)", border: "1px solid rgba(66,59,87,0.35)",
              borderRadius: 16, padding: "28px 24px",
            }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(240,224,219,0.97)", marginBottom: 6 }}>
                  Run this on your use case
                </div>
                <div style={{ fontSize: 12, color: "rgba(240,224,219,0.55)", lineHeight: 1.5 }}>
                  We'll generate a tailored solution for your problem. Enter your work email to continue.
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleEmailSubmit(); }}
                  placeholder="Work email"
                  autoFocus
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 10,
                    background: "rgba(54,50,72,0.25)", border: "1px solid rgba(66,59,87,0.4)",
                    color: "#F0E0DB", fontSize: 14, fontFamily: "inherit", outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(255,68,68,0.25)"}
                  onBlur={e => e.target.style.borderColor = "rgba(66,59,87,0.4)"}
                />
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleEmailSubmit(); }}
                  placeholder="Company name (optional)"
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 10,
                    background: "rgba(54,50,72,0.25)", border: "1px solid rgba(66,59,87,0.4)",
                    color: "#F0E0DB", fontSize: 14, fontFamily: "inherit", outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(255,68,68,0.25)"}
                  onBlur={e => e.target.style.borderColor = "rgba(66,59,87,0.4)"}
                />

                <button
                  onClick={handleEmailSubmit}
                  disabled={!email.trim()}
                  style={{
                    width: "100%", padding: "12px", borderRadius: 10, border: "none",
                    background: email.trim()
                      ? `linear-gradient(135deg, ${CRIMSON}, #532E25)`
                      : "rgba(66,59,87,0.3)",
                    color: "#F0E0DB", fontSize: 14, fontWeight: 600, cursor: email.trim() ? "pointer" : "default",
                    fontFamily: "inherit", transition: "all 0.2s",
                    opacity: email.trim() ? 1 : 0.4,
                  }}
                >
                  Generate my solution →
                </button>
              </div>

              <div style={{ textAlign: "center", marginTop: 14 }}>
                <button
                  onClick={() => setPhase("idle")}
                  style={{
                    background: "transparent", border: "none",
                    color: "rgba(240,224,219,0.6)", fontSize: 11, cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  or browse example use cases instead
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === BUILDING === */}
        {phase === "building" && (
          <div style={{ paddingTop: "10vh", animation: "fadeUp 0.4s ease" }}>
            <div style={{
              background: "rgba(54,50,72,0.22)", borderRadius: 12, padding: "12px 16px",
              maxWidth: 540, margin: "0 auto 24px", border: "1px solid rgba(66,59,87,0.32)",
            }}>
              <p style={{ fontSize: 13, color: "rgba(240,224,219,0.5)", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
                "{input.length > 120 ? input.slice(0, 120) + "..." : input}"
              </p>
            </div>
            <div style={{
              maxWidth: 400, margin: "0 auto", background: "rgba(54,50,72,0.22)",
              border: "1px solid rgba(54,50,72,0.25)", borderRadius: 14, padding: "20px",
            }}>
              {buildSteps.map((step, i) => {
                const done = i < buildStep, active = i === buildStep, pending = i > buildStep;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0",
                    opacity: pending ? 0.12 : 1, transition: "opacity 0.3s",
                    animation: active ? "slideIn 0.3s ease" : "none",
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: done ? "rgba(80,250,123,0.1)" : active ? "rgba(255,68,68,0.1)" : "transparent",
                      border: `1px solid ${done ? "rgba(80,250,123,0.2)" : active ? "rgba(215,136,109,0.3)" : "rgba(54,50,72,0.25)"}`,
                    }}>
                      {done && <span style={{ color: "#50FA7B", fontSize: 10, animation: "checkPop 0.3s" }}>✓</span>}
                      {active && <span style={{ display: "inline-flex", gap: 2 }}>{[0,1,2].map(j => <span key={j} style={{ width: 3, height: 3, borderRadius: "50%", background: CRIMSON, animation: `pulse 1s ease ${j*0.15}s infinite` }} />)}</span>}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: done ? "rgba(240,224,219,0.6)" : active ? "#F0E0DB" : "rgba(240,224,219,0.6)" }}>{step.text}</div>
                      {(active || done) && <div style={{ fontSize: 10, color: "rgba(240,224,219,0.6)", marginTop: 1, fontFamily: "'JetBrains Mono', monospace" }}>{step.detail}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === RESULT === */}
        {phase === "result" && displayResult && (
          <div ref={resultRef} style={{ paddingTop: "4vh", paddingBottom: 80, animation: "fadeUp 0.5s ease" }}>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: "rgba(80,250,123,0.07)", border: "1px solid rgba(80,250,123,0.12)",
                borderRadius: 16, padding: "4px 12px",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#50FA7B", animation: "breathe 2s ease infinite" }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: "#50FA7B", letterSpacing: 0.5 }}>Deployed to production</span>
                <span style={{ fontSize: 10, fontWeight: 400, color: "rgba(80,250,123,0.5)", marginLeft: 4 }}>AWS {AWS_ACCOUNT} · {REGION}</span>
              </span>
            </div>
            <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, margin: "0 0 3px", letterSpacing: -0.3 }}>{displayResult.solutionName}</h2>
            <p style={{ textAlign: "center", fontSize: 11, color: "rgba(240,224,219,0.55)", margin: "0 0 22px" }}>
              {displayResult.solutionType} · {displayResult.sources?.join(" + ")}
            </p>

            {/* Mock app */}
            <div style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(66,59,87,0.3)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", background: "rgba(54,50,72,0.2)", borderBottom: "1px solid rgba(54,50,72,0.25)" }}>
                <div style={{ display: "flex", gap: 4 }}>{["#ff5f57","#ffbd2e","#28c840"].map(c => <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.5 }} />)}</div>
                <div style={{ flex: 1, background: "rgba(54,50,72,0.2)", borderRadius: 4, padding: "3px 8px", fontSize: 9, color: "rgba(240,224,219,0.6)", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
                  app.internal.company.com/{displayResult.solutionName?.toLowerCase().replace(/\s+/g, "-")}
                </div>
                <span style={{ fontSize: 8, color: "rgba(240,224,219,0.55)" }}>🔒 SSO</span>
              </div>

              <div style={{ padding: "18px" }}>
                <div className="canyon-metric-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {displayResult.metrics?.map((m, i) => (
                    <div key={i} style={{ background: "rgba(54,50,72,0.2)", borderRadius: 8, padding: "12px", border: "1px solid rgba(54,50,72,0.2)" }}>
                      <div style={{ fontSize: 9, color: "rgba(240,224,219,0.55)", fontWeight: 600, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{m.label}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1, lineHeight: 1, color: m.negative ? "#FFA68A" : "#F0E0DB" }}>{m.value}</div>
                      <div style={{ fontSize: 9, color: m.negative ? "rgba(255,166,138,0.45)" : "rgba(240,224,219,0.3)", marginTop: 4 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {displayResult.chartData && (
                  <div style={{ background: "rgba(54,50,72,0.1)", borderRadius: 8, padding: "12px 4px 4px 0", border: "1px solid rgba(54,50,72,0.2)", marginBottom: 16 }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <AreaChart data={displayResult.chartData}>
                        <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CRIMSON} stopOpacity={0.2} /><stop offset="100%" stopColor={CRIMSON} stopOpacity={0} /></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(54,50,72,0.22)" />
                        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "rgba(240,224,219,0.6)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9, fill: "rgba(240,224,219,0.6)" }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#1A1722", border: "1px solid rgba(66,59,87,0.35)", borderRadius: 6, fontSize: 10, color: "#F0E0DB" }} />
                        <Area type="monotone" dataKey="score" stroke={CRIMSON} strokeWidth={1.5} fill="url(#cg)" />
                        <Bar dataKey="churn" fill="rgba(66,59,87,0.32)" radius={[2,2,0,0]} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="canyon-feature-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 12 }}>
                  {displayResult.features?.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "7px 9px", borderRadius: 5, background: "rgba(54,50,72,0.1)" }}>
                      <span style={{ color: CRIMSON, fontSize: 7, marginTop: 4.5, flexShrink: 0 }}>●</span>
                      <span style={{ fontSize: 10, color: "rgba(240,224,219,0.55)", lineHeight: 1.45 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", borderRadius: 5, background: "rgba(80,250,123,0.025)", border: "1px solid rgba(80,250,123,0.06)" }}>
                  <span style={{ fontSize: 10 }}>🛡️</span>
                  <span style={{ fontSize: 9, color: "rgba(240,224,219,0.55)", fontFamily: "'JetBrains Mono', monospace" }}>{displayResult.governance}</span>
                </div>
              </div>
            </div>

            <p style={{ textAlign: "center", fontSize: 11, color: "rgba(240,224,219,0.6)", marginTop: 22, fontStyle: "italic" }}>
              Apps, dashboards, automations, or agents. Canyon adapts to the problem.
            </p>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button onClick={() => window.open("https://calendly.com", "_blank")} style={{
                background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`,
                border: "none", borderRadius: 10, padding: "13px 28px",
                color: "#F0E0DB", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 20px rgba(215,136,109,0.3)", transition: "transform 0.15s",
              }}
                onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
              >See it on your data →</button>
              <button onClick={handleReset} style={{
                display: "block", margin: "12px auto 0", background: "transparent",
                border: "none", color: "rgba(240,224,219,0.6)", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
              }}>Try another use case</button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="canyon-footer" style={{
        position: "relative", zIndex: 5, padding: "40px 28px 24px",
        borderTop: "1px solid rgba(66,59,87,0.15)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: 860, margin: "0 auto",
      }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.55)" }}>
          © 2026 PlatCo Group
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
