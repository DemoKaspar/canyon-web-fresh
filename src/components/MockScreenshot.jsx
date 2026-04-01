export default function MockScreenshot({ mock, color, values }) {
  const h = 80, w = 200;

  if (mock === "line") {
    const max = Math.max(...values), min = Math.min(...values), range = max - min || 1;
    const points = values.map((v, i) =>
      `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`
    ).join(" ");
    return (
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <polyline points={`0,${h} ${points} ${w},${h}`} fill={color} opacity="0.08" />
      </svg>
    );
  }

  if (mock === "bar") {
    const max = Math.max(...values.map(Math.abs)), barW = w / values.length - 4;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>
        {values.map((v, i) => (
          <rect key={i} x={i * (w / values.length) + 2} y={h - (Math.abs(v) / max) * (h - 10)}
            width={barW} height={(Math.abs(v) / max) * (h - 10)} rx="3"
            fill={v < 0 ? "#FF6B6B" : color} opacity="0.5" />
        ))}
      </svg>
    );
  }

  if (mock === "gauge") {
    const pct = values[0] / 100;
    return (
      <svg viewBox="0 0 100 60" style={{ width: "100%", height: 70 }}>
        <path d="M15 55 A35 35 0 0 1 85 55" fill="none" stroke="rgba(240,224,219,0.08)" strokeWidth="6" strokeLinecap="round" />
        <path d={`M15 55 A35 35 0 0 1 ${15 + 70 * pct} ${55 - Math.sin(Math.PI * pct) * 35}`}
          fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.7" />
        <text x="50" y="50" textAnchor="middle" fill="rgba(240,224,219,0.7)"
          fontSize="14" fontWeight="700" fontFamily="Outfit">{values[0]}%</text>
      </svg>
    );
  }

  if (mock === "grid") {
    const cols = 7;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>
        {values.map((v, i) => (
          <rect key={i} x={(i % cols) * 28 + 4} y={Math.floor(i / cols) * 24 + 4}
            width="22" height="18" rx="3"
            fill={v ? color : "rgba(240,224,219,0.05)"} opacity={v ? 0.5 : 1} />
        ))}
      </svg>
    );
  }

  return null;
}
