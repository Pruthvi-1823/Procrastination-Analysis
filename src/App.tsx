import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from "recharts";

/* ─── LIQUID GLASS THEME ─── warm beige/cream bg, iridescent glass panels */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }

  .app-root {
    min-height: 100vh;
    background: linear-gradient(145deg, #f5efe8 0%, #ede8f0 35%, #e8eef5 65%, #f0ece8 100%);
    display: flex;
    font-family: 'DM Sans', sans-serif;
    color: #2d2040;
    position: relative;
    overflow-x: hidden;
  }
  .orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
    filter: blur(90px);
  }

  /* Glass panel base */
  .glass {
    background: rgba(255,255,255,0.42);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.7);
    box-shadow: 0 4px 24px rgba(160,140,200,0.13), inset 0 1px 0 rgba(255,255,255,0.85);
    border-radius: 20px;
  }
  .glass-deep {
    background: rgba(255,255,255,0.28);
    backdrop-filter: blur(36px) saturate(200%);
    -webkit-backdrop-filter: blur(36px) saturate(200%);
    border: 1px solid rgba(255,255,255,0.55);
    box-shadow: 0 8px 40px rgba(140,120,200,0.16), inset 0 1px 0 rgba(255,255,255,0.8);
    border-radius: 24px;
  }

  /* Pill bar (like reference image) */
  .pill-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .pill-bar-track {
    width: 44px; border-radius: 999px;
    background: rgba(255,255,255,0.35);
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow: inset 0 2px 8px rgba(160,140,200,0.18);
    display: flex; align-items: flex-end; overflow: hidden;
    position: relative;
  }
  .pill-bar-fill {
    width: 100%; border-radius: 999px;
    position: absolute; bottom: 0;
  }

  /* Glassy donut */
  .donut-wrap {
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow: 0 4px 20px rgba(160,140,220,0.18), inset 0 1px 0 rgba(255,255,255,0.7);
    display: flex; align-items: center; justify-content: center;
  }

  /* Sidebar */
  .sidebar {
    width: 210px; flex-shrink: 0; position: sticky; top: 0; height: 100vh;
    background: rgba(255,255,255,0.32);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
    border-right: 1px solid rgba(255,255,255,0.65);
    box-shadow: 2px 0 24px rgba(160,140,200,0.1);
    display: flex; flex-direction: column; padding: 24px 0; z-index: 10;
  }

  /* Nav item */
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 14px; margin: 2px 10px;
    border: none; cursor: pointer; font-size: 13px; font-weight: 500;
    transition: all 0.2s; text-align: left; width: calc(100% - 20px);
    font-family: 'DM Sans', sans-serif;
  }
  .nav-item.active {
    background: rgba(255,255,255,0.65);
    box-shadow: 0 2px 12px rgba(160,120,240,0.18), inset 0 1px 0 rgba(255,255,255,0.9);
    border: 1px solid rgba(255,255,255,0.8);
    color: #6b48d0;
  }
  .nav-item:not(.active) {
    background: transparent; border: 1px solid transparent;
    color: rgba(60,40,100,0.9);
  }
  .nav-item:not(.active):hover {
    background: rgba(255,255,255,0.35);
    color: #6b48d0;
  }

  /* Stat pill card */
  .stat-pill {
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.75);
    box-shadow: 0 3px 16px rgba(160,140,200,0.14), inset 0 1px 0 rgba(255,255,255,0.9);
    border-radius: 18px;
    padding: 18px 20px;
    display: flex; align-items: center; gap: 14px;
  }
  .stat-icon-ring {
    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.85);
    box-shadow: 0 2px 10px rgba(160,120,240,0.12);
    font-size: 20px;
  }

  /* Insight box */
  .insight {
    margin-top: 14px; padding: 11px 14px;
    background: rgba(100,230,180,0.1);
    border: 1px solid rgba(100,200,160,0.25);
    border-radius: 12px; font-size: 12.5px;
    color: rgba(30,80,60,0.85); line-height: 1.6;
  }

  /* Treemap cell */
  .tree-cell {
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.65);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
    display: flex; flex-direction: column;
    padding: 10px 12px; cursor: default;
    transition: transform 0.15s;
  }
  .tree-cell:hover { transform: scale(1.02); }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(160,140,200,0.3); border-radius: 10px; }

  /* Section heading */
  .section-num { font-size: 10.5px; color: rgba(80,60,130,0.8); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
  .section-title { font-size: 16px; font-weight: 700; color: #2d2040; }
  .section-sub { font-size: 11.5px; color: rgba(80,60,130,0.9); margin-top: 2px; }
`;

const TOOLTIP_STYLE = {
  background: "rgba(245,242,255,0.92)",
  border: "1px solid rgba(180,160,240,0.3)",
  borderRadius: 12, color: "#2d2040", fontSize: 12,
  backdropFilter: "blur(12px)",
  boxShadow: "0 4px 16px rgba(160,120,240,0.15)",
};

/* ─── palette: iridescent purple/teal/pink/blue ─── */
const P = {
  purple: { fill: "rgba(148,102,255,0.75)", border: "rgba(180,150,255,0.5)" },
  teal:   { fill: "rgba(80,210,180,0.75)",  border: "rgba(120,230,210,0.5)" },
  pink:   { fill: "rgba(230,100,200,0.75)", border: "rgba(250,150,230,0.5)" },
  blue:   { fill: "rgba(100,170,255,0.75)", border: "rgba(150,200,255,0.5)" },
  amber:  { fill: "rgba(255,180,80,0.75)",  border: "rgba(255,210,120,0.5)" },
  red:    { fill: "rgba(255,100,100,0.75)", border: "rgba(255,150,150,0.5)" },
  green:  { fill: "rgba(80,210,130,0.75)",  border: "rgba(120,240,170,0.5)" },
};

import { surveyData } from "./data";
const freqColors: any = { Never: "#4ade80", Rarely: "#fbbf24", Sometimes: "#fb923c", Often: "#a78bfa", Always: "#f472b6" };

const freqMap: any = { Never: 0, Rarely: 0, Sometimes: 0, Often: 0, Always: 0 };
surveyData.forEach((d: any) => { if (freqMap[d['Procrastination Frequency']] !== undefined) freqMap[d['Procrastination Frequency']]++; });
const freqData = ["Never", "Rarely", "Sometimes", "Often", "Always"].map(k => ({
  name: k, value: freqMap[k] || 0, color: freqColors[k] || "#ccc"
}));

const distMap: any = { "Phone/Social media": 0, "Friends": 0, "Gaming": 0, "Sleep": 0, "TV/Streaming": 0 };
surveyData.forEach((d: any) => { 
  const val = d['Main Distraction'];
  if (val) { distMap[val] = (distMap[val] || 0) + 1; }
});
const distractData = Object.keys(distMap).map(k => ({ name: k.replace(/ media/, ""), value: distMap[k] })).sort((a, b) => b.value - a.value).slice(0, 5);

const excMap: any = {};
surveyData.forEach((d: any) => {
  const reasons = (d['Reasons for Delay'] || "").split(",");
  reasons.forEach((r: string) => {
    const t = r.trim();
    if (t) { excMap[t] = (excMap[t] || 0) + 1; }
  });
});
const excuseData = Object.keys(excMap).map(k => ({ name: k, value: excMap[k] })).sort((a,b) => b.value - a.value).slice(0, 6);

const habitMap: any = {};
surveyData.forEach((d: any) => {
  const t = d['Time of Day'];
  const s = d['Task Start Timing'];
  if (t && s) {
    if (!habitMap[t]) habitMap[t] = { time: t };
    habitMap[t][s] = (habitMap[t][s] || 0) + 1;
  }
});
const habitData = Object.values(habitMap);

const emMap: any = {};
surveyData.forEach((d: any) => {
  const y = d['Year of Study'];
  let f = d['Feeling After'];
  if (f === 'Motivated by last-minute pressure') f = 'Motivated';
  if (y && f) {
    if (!emMap[y]) emMap[y] = { year: y };
    emMap[y][f] = (emMap[y][f] || 0) + 1;
  }
});
const emotionData = Object.values(emMap).sort((a: any, b: any) => a.year.localeCompare(b.year));

const intMap: any = {};
surveyData.forEach((d: any) => {
  const s = d['Self Identified Procrastinator'];
  const f = d['Tried to Fix'];
  if (s && f) {
    if (!intMap[s]) intMap[s] = { group: s };
    intMap[s][f] = (intMap[s][f] || 0) + 1;
  }
});
const intentionData = Object.values(intMap).map((d: any) => ({
  group: d.group,
  Failed: d["Yes, but failed"] || 0,
  Never: d["Never tried"] || 0,
  Success: d["Yes, successfully"] || 0
}));

const taskAreas: any = {};
surveyData.forEach((d: any) => {
  let t = d['Task Procrastinated Most'] || "N/A";
  if (t === "All of the above") t = "All tasks";
  if (t === "Studying for exams") t = "Study";
  if (t === "Assignments") t = "Assign.";
  
  const f = d['Procrastination Frequency'];
  if (t && f) {
    if (!taskAreas[t]) taskAreas[t] = { task: t, Always: 0, Often: 0, Sometimes: 0 };
    if (["Always", "Often", "Sometimes"].includes(f)) taskAreas[t][f]++;
  }
});
const taskDataArea = Object.values(taskAreas);

const totalStudents = surveyData.length;
const chronicCount = surveyData.filter((d: any) => ["Always", "Often"].includes(d['Procrastination Frequency'])).length;
const missedCount = surveyData.filter((d: any) => d['Ever Missed Submission'] === 'Yes').length;
const chronicPct = Math.round((chronicCount / totalStudents) * 100);
const missedPct = Math.round((missedCount / totalStudents) * 100);
const fixedPct = Math.round((surveyData.filter((d: any) => d['Tried to Fix'] === "Yes, successfully").length / totalStudents) * 100);


/* ─── Components ─── */
function GlassPanel({ children, style = {} }) {
  return (
    <div className="glass" style={{ padding: 22, ...style }}>
      {children}
    </div>
  );
}

function SectionHead({ n, title, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {n && <div className="section-num">Chart {n}</div>}
      <div className="section-title">{title}</div>
      {sub && <div className="section-sub">{sub}</div>}
    </div>
  );
}

function Insight({ text }) {
  return (
    <div className="insight">
      <span style={{ color: "#0f7b56", fontWeight: 700 }}>Insight: </span>{text}
    </div>
  );
}

/* Pill-shaped bar like the reference image */
function PillBar({ value, maxVal, color, label, height = 120 }) {
  const fillH = Math.round((value / maxVal) * (height - 12));
  return (
    <div className="pill-bar-wrap">
      <div className="pill-bar-track" style={{ height }}>
        <div className="pill-bar-fill" style={{
          height: fillH,
          background: color,
          boxShadow: `0 0 18px ${color}88, inset 0 2px 0 rgba(255,255,255,0.4)`,
        }} />
      </div>
      <div style={{ fontSize: 11, color: "rgba(60,40,100,0.9)", marginTop: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#2d2040" }}>{value}</div>
    </div>
  );
}

/* Glassy SVG donut */
function GlassDonut({ pct, color, size = 110, label }) {
  const r = 38, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div className="donut-wrap" style={{ width: size, height: size, padding: 8 }}>
        <svg width={size - 16} height={size - 16} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={`dg-${pct}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="10" />
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke={`url(#dg-${pct})`} strokeWidth="10"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#2d2040">{pct}%</text>
        </svg>
      </div>
      {label && <div style={{ fontSize: 11, color: "rgba(60,40,100,0.9)", fontWeight: 500 }}>{label}</div>}
    </div>
  );
}

/* Treemap-style card */
function TreeCard({ label, value, style = {} }) {
  return (
    <div className="tree-cell" style={style}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{value}</div>
    </div>
  );
}

/* Stat card at the top */
function StatCard({ icon, label, value, sub, gradient }) {
  return (
    <div className="stat-pill">
      <div className="stat-icon-ring" style={{ background: gradient || "rgba(255,255,255,0.7)" }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "rgba(80,60,130,0.9)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#2d2040", lineHeight: 1.1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: "rgba(80,60,130,0.85)", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

const NAV = [
  { id: "overview",    icon: "⊞", label: "Overview" },
  { id: "patterns",   icon: "◎", label: "Behavioral Patterns" },
  { id: "intervention",icon: "✓", label: "Intervention Tools" },
  { id: "dataset",    icon: "⬡", label: "Dataset Explorer" },
];

export default function App() {
  const [theme, setTheme] = useState("light");
  const [active, setActive] = useState("overview");
  const [distraction, setDistraction] = useState("");
  const [proximity, setProximity] = useState(50);
  const [riskLevel, setRiskLevel] = useState(null);
  const [studentFilter, setStudentFilter] = useState("ALL");
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const [datasetSearch, setDatasetSearch] = useState("");

  const students: any[] = surveyData.map((d: any, i: number) => {
    const f: string = d['Procrastination Frequency'];
    const colors: any = { Always: "#f472b6", Often: "#a78bfa", Sometimes: "#fb923c", Rarely: "#fbbf24", Never: "#4ade80" };
    return { id: i + 1, freq: f, color: colors[f] || "#ccc", originalData: d };
  });

  function generateRisk() {
    if (!distraction) return;
    const score = (proximity / 100) * 60 + (distraction === "Phone/Social Media" ? 30 : distraction === "Gaming" ? 25 : 15);
    setRiskLevel(score > 70 ? "HIGH" : score > 40 ? "MEDIUM" : "LOW");
  }

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  return (
    <>
      <style>
        {CSS}
        {`
        body.theme-dark {
          filter: invert(0.92) hue-rotate(180deg) brightness(1.05);
          background-color: #111;
          color-scheme: dark;
        }
        body {
          transition: filter 0.4s ease, background-color 0.4s ease;
          min-height: 100vh;
        }
        body.theme-dark img, body.theme-dark video {
          filter: invert(1) hue-rotate(180deg);
        }
        `}
      </style>
      <div className="app-root">
        {/* ambient orbs */}
        <div className="orb" style={{ top:"-8%", left:"-4%", width:420, height:420, background:"rgba(200,160,255,0.18)" }} />
        <div className="orb" style={{ top:"40%", right:"-6%", width:360, height:360, background:"rgba(100,200,255,0.14)" }} />
        <div className="orb" style={{ bottom:"-8%", left:"35%", width:320, height:320, background:"rgba(255,160,200,0.12)" }} />
        <div className="orb" style={{ top:"20%", left:"40%", width:280, height:280, background:"rgba(160,240,200,0.1)" }} />

        {/* ─── SIDEBAR ─── */}
        <aside className="sidebar">
          <div style={{ padding:"0 18px 20px", borderBottom:"1px solid rgba(180,160,240,0.15)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <div style={{
                width:36, height:36, borderRadius:11, flexShrink:0,
                background:"linear-gradient(135deg, #c084fc, #818cf8)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
                boxShadow:"0 3px 12px rgba(160,100,255,0.35)",
              }}>⏳</div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700, color:"#2d2040", lineHeight:1.2 }}>The Procrastinator's</div>
                <div style={{ fontSize:12.5, fontWeight:700, color:"#8b5cf6", lineHeight:1.2 }}>Mirror</div>
              </div>
            </div>
            <div style={{ fontSize:9.5, color:"rgba(80,60,130,0.78)", letterSpacing:"0.1em", marginTop:6 }}>DEEP-DIVE BEHAVIORAL ANALYSIS</div>
          </div>

          <div style={{ padding:"14px 8px 0", flex:1 }}>
            <div style={{ fontSize:9.5, color:"rgba(80,60,130,0.75)", letterSpacing:"0.12em", padding:"0 8px", marginBottom:6 }}>CONTROL CENTER</div>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setActive(n.id)} className={`nav-item ${active===n.id?"active":""}`}>
                <span style={{ fontSize:14 }}>{n.icon}</span>{n.label}
              </button>
            ))}
          </div>

          <div style={{ margin:"0 10px 14px", padding:14, borderRadius:16, background:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.75)", boxShadow:"0 2px 12px rgba(160,140,200,0.1)" }}>
            <div style={{ fontSize:11.5, fontStyle:"italic", color:"rgba(60,40,100,0.95)", lineHeight:1.65 }}>
              "The first step in overcoming procrastination is understanding its patterns."
            </div>
            <div style={{ fontSize:10, color:"rgba(80,60,130,0.75)", marginTop:8 }}>— Behavioral Psychology Research</div>
          </div>
          <div style={{ padding:"0 18px", fontSize:9.5, color:"rgba(80,60,130,0.7)" }}>Data collected from Survey</div>
        </aside>

        {/* ─── MAIN ─── */}
        <main style={{ flex:1, padding:"28px 28px 28px 24px", overflowY:"auto", position:"relative", zIndex:1 }}>
          <button 
            onClick={toggleTheme}
            style={{
              position: "absolute",
              top: 24,
              right: 28,
              background: "rgba(255,255,255,0.6)", border:"1px solid rgba(180,160,240,0.4)", 
              borderRadius:20, padding:"6px 12px", fontSize:13, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", gap: 6,
              boxShadow: "0 4px 12px rgba(160,140,200,0.15)",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s",
              zIndex: 100,
              fontWeight: 600,
              color: "#2d2040"
            }}
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          {/* OVERVIEW */}
          {active === "overview" && (
            <>
              <div style={{ marginBottom:22 }}>
                <h1 style={{ fontSize:26, fontWeight:800, color:"#2d2040" }}>Behavioral Analysis Canvas</h1>
                <p style={{ fontSize:13, color:"rgba(80,60,130,0.85)", marginTop:5 }}>Monitoring peak task procrastination frequencies</p>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:16 }}>
                <StatCard icon="🧠" label="Surveyed" value={String(totalStudents)} sub="TOTAL" gradient="linear-gradient(135deg,#e0d7ff,#c7d7ff)" />
                <StatCard icon="⚠️" label="Delayers" value={`${chronicPct}%`} sub="behavioral loop" gradient="linear-gradient(135deg,#fff0c0,#ffd6a0)" />
                <StatCard icon="⏰" label="Deadline Crashing" value={`${missedPct}%`} sub="missed submissions" gradient="linear-gradient(135deg,#ffd6d6,#ffb3c6)" />
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
                {[
                  { icon:"💡", grad:"linear-gradient(135deg,#ede9fe,#ddd6fe)", title:"The Perfection Trap", desc:"Procrastination is rarely driven by laziness — it's a coping mechanism protecting the ego from fear of failure." },
                  { icon:"🔄", grad:"linear-gradient(135deg,#fef9c3,#fde68a)", title:"Task Paralysis", desc:"When confronted with large projects, the brain triggers deep overwhelm and immediate avoidance behaviors." },
                  { icon:"🔃", grad:"linear-gradient(135deg,#cffafe,#a5f3fc)", title:"The Guilt Cycle", desc:"Delaying a task generates cognitive friction that depletes executive function, making it even harder to start later." },
                ].map((c, i) => (
                  <div key={i} style={{
                    padding:20, borderRadius:18,
                    background:c.grad,
                    border:"1px solid rgba(255,255,255,0.8)",
                    boxShadow:"0 3px 16px rgba(160,140,200,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}>
                    <div style={{ fontSize:26, marginBottom:10 }}>{c.icon}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#2d2040", marginBottom:7 }}>{c.title}</div>
                    <div style={{ fontSize:12, color:"rgba(60,40,100,0.95)", lineHeight:1.65 }}>{c.desc}</div>
                  </div>
                ))}
              </div>

              {/* The Procrastinator's Journey Timeline */}
              <div style={{ marginTop: 24 }}>
                <GlassPanel>
                  <SectionHead title="The Procrastinator's Journey" sub="A psychological map from task assignment to completion based on survey behavioral patterns" />
                  
                  <div style={{ position: "relative", marginTop: 20, paddingBottom: 10 }}>
                    {/* Connecting Line */}
                    <div style={{ position: "absolute", top: 24, left: 40, right: 40, height: 4, background: "rgba(180,160,240,0.2)", borderRadius: 4, zIndex: 0 }} />
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, position: "relative", zIndex: 1 }}>
                      {[
                        { title: "1. The Trigger", desc: "Task assigned. Initial anxiety or fear of imperfection kicks in.", icon: "🎯", color: "#a855f7" },
                        { title: "2. Avoidance", desc: "Seeking quick dopamine via social media or trivial tasks.", icon: "📱", color: "#3b82f6" },
                        { title: "3. Guilt Phase", desc: "Awareness of dwindling time causes underlying stress and guilt.", icon: "💭", color: "#f59e0b" },
                        { title: "4. The Crisis", desc: "Deadline approaches. Adrenaline-fueled panic mode activates.", icon: "⚡", color: "#ef4444" },
                        { title: "5. Aftermath", desc: "Submission followed by a vow to 'never do this again'.", icon: "🤝", color: "#10b981" }
                      ].map((step, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", zIndex: 1 }}>
                          <div style={{ 
                            width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.95)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                            boxShadow: `0 4px 16px ${step.color}33`, border: `2px solid ${step.color}aa`,
                            marginBottom: 12
                          }}>
                            {step.icon}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#2d2040", marginBottom: 4 }}>{step.title}</div>
                          <div style={{ fontSize: 11, color: "rgba(60,40,100,0.9)", lineHeight: 1.4, padding: "0 8px" }}>{step.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassPanel>
              </div>
            </>
          )}

          {/* BEHAVIORAL PATTERNS */}
          {active === "patterns" && (
            <>
              <div style={{ marginBottom:22 }}>
                <h1 style={{ fontSize:26, fontWeight:800, color:"#2d2040" }}>Behavioral Patterns</h1>
                <p style={{ fontSize:13, color:"rgba(80,60,130,0.85)", marginTop:5 }}>Monitoring peak task procrastination frequencies</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>

                {/* 1. Gender */}
                {(() => {
                  const m = surveyData.filter((d: any) => d['Gender'] === "Male").length;
                  const f = surveyData.filter((d: any) => d['Gender'] === "Female").length;
                  const mPct = Math.round((m/totalStudents)*100);
                  const fPct = Math.round((f/totalStudents)*100);
                  return (
                    <GlassPanel>
                      <SectionHead n={1} title="Gender Distribution" sub="Horizontal ratio bar" />
                      <div style={{ marginTop:12 }}>
                        <div style={{ display:"flex", borderRadius:999, overflow:"hidden", height:22 }}>
                          <div style={{ width:`${fPct}%`, background:"linear-gradient(90deg,#d946ef,#a855f7)", boxShadow:"inset 0 2px 0 rgba(255,255,255,0.35)" }} />
                          <div style={{ flex:1, background:"linear-gradient(90deg,#60a5fa,#818cf8)", boxShadow:"inset 0 2px 0 rgba(255,255,255,0.2)" }} />
                        </div>
                        <div style={{ display:"flex", gap:18, marginTop:10, fontSize:12 }}>
                          {[["#d946ef","Female",f],["#60a5fa","Male",m]].map(([c,l,v]) => (
                            <div key={l as string} style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <div style={{ width:9, height:9, borderRadius:3, background:c as string }} />
                              <span style={{ color:"rgba(60,40,100,0.9)" }}>{l as string}</span>
                              <span style={{ fontWeight:700, color:"#2d2040" }}>{v as number}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:20 }}>
                        <PillBar value={f} maxVal={totalStudents} color="linear-gradient(180deg,#d946ef,#a855f7)" label="Female" height={110} />
                        <PillBar value={m} maxVal={totalStudents} color="linear-gradient(180deg,#60a5fa,#818cf8)" label="Male" height={110} />
                      </div>
                    </GlassPanel>
                  );
                })()}

                {/* 2. Overall Frequency */}
                <GlassPanel>
                  <SectionHead n={2} title="Overall Frequency" sub="Sequential delay severity" />
                  <div style={{ display:"flex", gap:10, alignItems:"flex-end", justifyContent:"center", marginTop:12 }}>
                    {freqData.map((d, i) => (
                      <PillBar key={i} value={d.value as number} maxVal={Math.max(...freqData.map((x: any) => x.value as number))} color={d.color as string} label={(d.name as string).slice(0,5)} height={130} />
                    ))}
                  </div>
                </GlassPanel>

                {/* 3. Primary Distractions */}
                <GlassPanel>
                  <SectionHead n={3} title="Primary Distractions" sub="Wide-Hollow Donut" />
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:8 }}>
                    <PieChart width={170} height={170}>
                      <Pie data={distractData} cx={82} cy={82} innerRadius={52} outerRadius={82} dataKey="value" strokeWidth={0}>
                        {["#a78bfa","#22d3ee","#f472b6","#4ade80","#fb923c"].map((c,i) => (
                          <Cell key={i} fill={c} fillOpacity={0.82} />
                        ))}
                      </Pie>
                      <text x={82} y={78} textAnchor="middle" fontSize={9} fill="rgba(60,40,100,0.9)" fontWeight={500}>TOP</text>
                      <text x={82} y={92} textAnchor="middle" fontSize={9} fill="#2d2040" fontWeight={700}>Phone/Social</text>
                    </PieChart>
                    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                      {distractData.map((d, i) => (
                        <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12 }}>
                          <div style={{ width:8, height:8, borderRadius:2, background:["#a78bfa","#22d3ee","#f472b6","#4ade80","#fb923c"][i] }} />
                          <span style={{ color:"rgba(60,40,100,0.9)" }}>{d.name}</span>
                          <span style={{ fontWeight:700, color:"#2d2040", marginLeft:"auto", paddingLeft:8 }}>{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Insight text="Smartphones remain the dominant distraction, overriding social media and gaming combined." />
                </GlassPanel>

                {/* 4. Excuses */}
                <GlassPanel>
                  <SectionHead n={4} title="Anatomy of Excuses" sub="Ranked horizontal bar" />
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:8 }}>
                    {excuseData.map((d, i) => (
                      <div key={i}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11.5, color:"rgba(60,40,100,0.9)", marginBottom:4 }}>
                          <span>{d.name as string}</span><span style={{ fontWeight:700, color:"#2d2040" }}>{d.value as number}</span>
                        </div>
                        <div style={{ height:9, borderRadius:999, background:"rgba(180,160,240,0.15)", overflow:"hidden" }}>
                          <div style={{
                            height:"100%", borderRadius:999,
                            width:`${((d.value as number)/Math.max(...excuseData.map((x: any) => x.value as number)))*100}%`,
                            background:"linear-gradient(90deg,#c084fc,#818cf8)",
                            boxShadow:"0 0 8px rgba(160,120,255,0.35)",
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Insight text="Poor time management and laziness represent core self-reported barriers, dwarfing external challenges." />
                </GlassPanel>

                {/* 5. Habit Clustering */}
                <GlassPanel>
                  <SectionHead n={5} title="Habit Clustering Grid" sub="Timing vs time of day" />
                  <ResponsiveContainer width="100%" height={190}>
                    <BarChart data={habitData} barCategoryGap="25%" barGap={2}>
                      <XAxis dataKey="time" tick={{ fill:"rgba(60,40,100,0.9)", fontSize:11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:"rgba(60,40,100,0.8)", fontSize:10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill:"rgba(180,160,240,0.08)" }} />
                      <Bar dataKey="Day before" stackId="a" fill="#f472b6" fillOpacity={0.8} />
                      <Bar dataKey="2-3 days before" stackId="a" fill="#a78bfa" fillOpacity={0.8} />
                      <Bar dataKey="Starts early but delays" stackId="a" fill="#22d3ee" fillOpacity={0.8} />
                      <Bar dataKey="Well in advance" stackId="a" fill="#4ade80" fillOpacity={0.8} radius={[5,5,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <Insight text="Most students procrastinate before exams, particularly those reporting 'Everyday' or 'Often' delays." />
                </GlassPanel>

                {/* 6. Grade Impact */}
                <GlassPanel>
                  <SectionHead n={6} title="Grade Impact Proportion" sub="100% stacked by severity" />
                  {["Never","Rarely","Sometimes","Often","Always"].map((label, i) => {
                    const group = surveyData.filter((d: any) => d['Procrastination Frequency'] === label);
                    const total = group.length || 1; // prevent div/0
                    const y = group.filter((d: any) => d['Affects Grades'] === 'Yes').length;
                    const c = group.filter((d: any) => d['Affects Grades'] === 'Sometimes' || d['Affects Grades'] === 'Maybe').length;
                    const n = group.filter((d: any) => d['Affects Grades'] === 'No').length;
                    const segs = [Math.round((y/total)*100), Math.round((c/total)*100), Math.round((n/total)*100)];
                    return (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ width:64, fontSize:11.5, color:"rgba(60,40,100,0.9)", textAlign:"right" }}>{label}</div>
                        <div style={{ flex:1, height:20, display:"flex", borderRadius:999, overflow:"hidden" }}>
                          {segs[0] > 0 && <div style={{ width:`${segs[0]}%`, background:"#f472b6", opacity:0.8 }} title={`Impacts Grades: ${segs[0]}%`} />}
                          {segs[1] > 0 && <div style={{ width:`${segs[1]}%`, background:"#fbbf24", opacity:0.8 }} title={`Variable: ${segs[1]}%`} />}
                          {segs[2] > 0 && <div style={{ width:`${segs[2]}%`, background:"#4ade80", opacity:0.8 }} title={`No Impact: ${segs[2]}%`} />}
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ display:"flex", gap:14, marginTop:8, fontSize:11 }}>
                    {[["#f472b6","Impacts Grades"],["#fbbf24","Variable"],["#4ade80","No Impact"]].map(([c,l]) => (
                      <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <div style={{ width:8, height:8, borderRadius:2, background:c }} />
                        <span style={{ color:"rgba(60,40,100,0.9)" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                  <Insight text="Chronic procrastination directly correlates with severe academic impact, shifting grades downward significantly." />
                </GlassPanel>

                {/* 7. Submission Crash — glassy donut */}
                <GlassPanel>
                  <SectionHead n={7} title="Submission Crash Rate" sub="Dual-slice showing missed deadlines" />
                  <div style={{ display:"flex", justifyContent:"space-around", alignItems:"center", paddingTop:10 }}>
                    <GlassDonut pct={missedPct} color="#f472b6" size={130} label="Missed deadline" />
                    <GlassDonut pct={100 - missedPct} color="#a78bfa" size={130} label="Submitted on time" />
                  </div>
                  <Insight text="Almost a third of the population forces last-minute submissions, risking incomplete work and severe anxiety." />
                </GlassPanel>

                {/* 8. Task Avoidance */}
                <GlassPanel>
                  <SectionHead n={8} title="Task Avoidance Density" sub="Stacked area by task type" />
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={taskDataArea}>
                      <XAxis dataKey="task" tick={{ fill:"rgba(60,40,100,0.85)", fontSize:10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:"rgba(60,40,100,0.75)", fontSize:10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                      <Area type="monotone" dataKey="Always"    stackId="1" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.25} />
                      <Area type="monotone" dataKey="Often"     stackId="1" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.25} />
                      <Area type="monotone" dataKey="Sometimes" stackId="1" stroke="#f472b6" fill="#f472b6" fillOpacity={0.25} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <Insight text="High-frequency procrastination dense in specific task clusters reveals systemic avoidance patterns." />
                </GlassPanel>

                {/* 9 & 10 full width */}
                <GlassPanel style={{ gridColumn:"1 / -1" }}>
                  <SectionHead n={9} title="Intention vs Action" sub="Grouped column: attempts to fix habits by self-awareness" />
                  <ResponsiveContainer width="100%" height={210}>
                    <BarChart data={intentionData} barCategoryGap="35%" barGap={4}>
                      <XAxis dataKey="group" tick={{ fill:"rgba(60,40,100,0.9)", fontSize:12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:"rgba(60,40,100,0.8)", fontSize:11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill:"rgba(180,160,240,0.08)" }} />
                      <Legend wrapperStyle={{ fontSize:12, color:"rgba(60,40,100,0.9)", paddingTop:6 }} />
                      <Bar dataKey="Failed"  fill="#f472b6" fillOpacity={0.8} radius={[5,5,0,0]} />
                      <Bar dataKey="Never"   fill="#94a3b8" fillOpacity={0.7} radius={[5,5,0,0]} />
                      <Bar dataKey="Success" fill="#4ade80" fillOpacity={0.8} radius={[5,5,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <Insight text="Highly self-aware students have an 86% success rate in breaking procrastination habits." />
                </GlassPanel>

                <GlassPanel style={{ gridColumn:"1 / -1" }}>
                  <SectionHead n={10} title="Emotional Sentiment Timeline" sub="Line chart tracking feelings across study years" />
                  <ResponsiveContainer width="100%" height={210}>
                    <LineChart data={emotionData}>
                      <XAxis dataKey="year" tick={{ fill:"rgba(60,40,100,0.9)", fontSize:12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:"rgba(60,40,100,0.8)", fontSize:11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                      <Legend wrapperStyle={{ fontSize:12, color:"rgba(60,40,100,0.9)" }} />
                      <Line type="monotone" dataKey="Guilty"    stroke="#f472b6" strokeWidth={2.5} dot={{ fill:"#f472b6", r:4, strokeWidth:0 }} />
                      <Line type="monotone" dataKey="Motivated" stroke="#22d3ee" strokeWidth={2.5} dot={{ fill:"#22d3ee", r:4, strokeWidth:0 }} />
                      <Line type="monotone" dataKey="Stressed"  stroke="#a78bfa" strokeWidth={2.5} dot={{ fill:"#a78bfa", r:4, strokeWidth:0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <Insight text="Guilt and stress peak around late sophomore / junior year, signaling the breaking point of poor habits." />
                </GlassPanel>
              </div>
            </>
          )}

          {/* INTERVENTION TOOLS */}
          {active === "intervention" && (
            <>
              <div style={{ marginBottom:22 }}>
                <h1 style={{ fontSize:26, fontWeight:800, color:"#2d2040" }}>Intervention Tools</h1>
                <p style={{ fontSize:13, color:"rgba(80,60,130,0.85)", marginTop:5 }}>Personalized risk assessment and resources</p>
              </div>

              {/* Delay Threshold */}
              <GlassPanel style={{ marginBottom:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                  <div style={{ width:44, height:44, borderRadius:13, background:"linear-gradient(135deg,#fecdd3,#fda4af)", border:"1px solid rgba(255,255,255,0.85)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🛡️</div>
                  <div>
                    <div style={{ fontSize:17, fontWeight:700, color:"#2d2040" }}>Test Your Delay Threshold</div>
                    <div style={{ fontSize:12, color:"rgba(80,60,130,0.85)", marginTop:2 }}>Configure your typical behavioral inputs to generate a personalized risk index.</div>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
                  <div>
                    <label style={{ display:"block", fontSize:10.5, letterSpacing:"0.1em", color:"rgba(80,60,130,0.85)", marginBottom:8, textTransform:"uppercase" }}>Primary Distraction Source</label>
                    <select value={distraction} onChange={e => setDistraction(e.target.value)} style={{
                      width:"100%", padding:"11px 14px", borderRadius:12,
                      background:"rgba(255,255,255,0.55)", border:"1px solid rgba(180,160,240,0.3)",
                      color: distraction ? "#2d2040" : "rgba(80,60,130,0.8)",
                      fontSize:13, backdropFilter:"blur(8px)", outline:"none", cursor:"pointer",
                      fontFamily:"'DM Sans', sans-serif",
                    }}>
                      <option value="" disabled>Select your main distraction...</option>
                      {["Phone/Social Media","Gaming","Friends","TV/Streaming","Sleep"].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>

                    <label style={{ display:"block", fontSize:10.5, letterSpacing:"0.1em", color:"rgba(80,60,130,0.85)", margin:"18px 0 8px", textTransform:"uppercase" }}>
                      Typical Deadline Proximity
                      <span style={{ float:"right", color:"#2d2040", fontWeight:700, letterSpacing:0 }}>{proximity}%</span>
                    </label>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:9.5, color:"rgba(80,60,130,0.75)", marginBottom:5 }}>
                      <span>DAYS BEFORE</span><span>MINUTES BEFORE</span>
                    </div>
                    <input type="range" min={0} max={100} step={1} value={proximity} onChange={e => setProximity(+e.target.value)} style={{ width:"100%", accentColor:"#a855f7" }} />

                    <button onClick={generateRisk} style={{
                      marginTop:18, width:"100%", padding:"13px 0",
                      borderRadius:12, border:"none", cursor:"pointer",
                      background: distraction ? "linear-gradient(135deg,#a855f7,#ec4899)" : "rgba(180,160,240,0.3)",
                      color: distraction ? "#fff" : "rgba(80,60,130,0.8)",
                      fontSize:14, fontWeight:700, fontFamily:"'DM Sans', sans-serif",
                      boxShadow: distraction ? "0 4px 20px rgba(168,85,247,0.35)" : "none",
                      transition:"all 0.2s",
                    }}>⚡ Generate</button>
                  </div>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                    border: riskLevel ? "none" : "1.5px dashed rgba(180,160,240,0.3)", borderRadius:16, minHeight:180 }}>
                    {riskLevel ? (
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:12, color:"rgba(80,60,130,0.85)", marginBottom:8 }}>Your Procrastination Risk</div>
                        <div style={{
                          fontSize:52, fontWeight:900, letterSpacing:"-0.02em",
                          color: riskLevel==="HIGH" ? "#f43f5e" : riskLevel==="MEDIUM" ? "#f59e0b" : "#22c55e",
                          textShadow: `0 0 40px ${riskLevel==="HIGH" ? "#f43f5e" : riskLevel==="MEDIUM" ? "#f59e0b" : "#22c55e"}44`,
                        }}>{riskLevel}</div>
                        <div style={{ fontSize:12, color:"rgba(80,60,130,0.85)", marginTop:8, maxWidth:180 }}>
                          {riskLevel==="HIGH" ? "Critical pattern. Immediate intervention recommended." : riskLevel==="MEDIUM" ? "Moderate risk. Consider time management strategies." : "Low risk! Keep up the great habits."}
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign:"center", color:"rgba(80,60,130,0.75)", fontSize:12.5 }}>
                        Complete the form and click the button<br />to reveal your procrastination profile
                      </div>
                    )}
                  </div>
                </div>
              </GlassPanel>

              {/* {totalStudents} Minds Landscape */}
              <GlassPanel style={{ marginBottom:18 }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                  <div>
                    <div style={{ fontSize:17, fontWeight:700, color:"#2d2040" }}>👥 The {totalStudents} Minds Landscape</div>
                    <div style={{ fontSize:12, color:"rgba(80,60,130,0.85)", marginTop:3 }}>Every icon represents one student. Hover to see their story.</div>
                  </div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"flex-end" }}>
                    {["ALL","ALWAYS","OFTEN","SOMETIMES","RARELY","NEVER"].map(f => (
                      <button key={f} onClick={() => setStudentFilter(f)} style={{
                        padding:"4px 11px", borderRadius:20, border:"none", cursor:"pointer",
                        fontSize:10.5, fontWeight:600, fontFamily:"'DM Sans', sans-serif",
                        background: studentFilter===f ? "linear-gradient(135deg,#a855f7,#818cf8)" : "rgba(255,255,255,0.55)",
                        color: studentFilter===f ? "#fff" : "rgba(80,60,130,0.9)",
                        border: studentFilter===f ? "none" : "1px solid rgba(180,160,240,0.2)",
                        boxShadow: studentFilter===f ? "0 2px 10px rgba(160,100,255,0.25)" : "none",
                        transition:"all 0.15s",
                      }}>{f}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display:"flex", flexWrap:"wrap", gap:7, padding:14, background:"rgba(255,255,255,0.25)", borderRadius:14 }}>
                  {students.map(s => {
                    const show = studentFilter==="ALL" || studentFilter===s.freq.toUpperCase();
                    return (
                      <div key={s.id} onMouseEnter={() => setHoveredStudent(s)} onMouseLeave={() => setHoveredStudent(null)}
                        style={{
                          width:34, height:34, borderRadius:10,
                          background: show ? `${s.color}20` : "rgba(180,160,240,0.06)",
                          border:`1px solid ${show ? s.color+"55" : "rgba(180,160,240,0.12)"}`,
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
                          cursor:"pointer", transition:"all 0.15s",
                          opacity: show ? 1 : 0.25,
                          transform: hoveredStudent?.id===s.id ? "scale(1.2)" : "scale(1)",
                          boxShadow: hoveredStudent?.id===s.id ? `0 0 12px ${s.color}55` : "none",
                        }}>
                        <span>👤</span>
                      </div>
                    );
                  })}
                </div>

                {hoveredStudent && (
                  <div style={{ marginTop:8, padding:"7px 13px", background:`${hoveredStudent.color}15`, border:`1px solid ${hoveredStudent.color}33`, borderRadius:8, fontSize:12, color:"rgba(60,40,100,0.7)" }}>
                    Student R{String(hoveredStudent.id).padStart(3,"0")} — Procrastinates: <span style={{ color:hoveredStudent.color, fontWeight:700 }}>{hoveredStudent.freq}</span>
                  </div>
                )}

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:14 }}>
                  {[
                    { icon:"⏰", grad:"linear-gradient(135deg,#fecdd3,#fda4af)", v:`${missedPct}%`, l:"MISSED DEADLINES" },
                    { icon:"💭", grad:"linear-gradient(135deg,#fef9c3,#fde68a)", v:`${Math.round((surveyData.filter((d: any) => d['Feeling After'] === 'Guilty').length / totalStudents) * 100)}%`, l:"FELT GUILTY AFTER" },
                    { icon:"✅", grad:"linear-gradient(135deg,#d1fae5,#6ee7b7)", v:`${fixedPct}%`, l:"FIXED HABITS" },
                  ].map((s,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", borderRadius:16, background:"rgba(255,255,255,0.5)", border:"1px solid rgba(255,255,255,0.8)", boxShadow:"0 2px 12px rgba(160,140,200,0.1)" }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:s.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{s.icon}</div>
                      <div>
                        <div style={{ fontSize:22, fontWeight:800, color:"#2d2040" }}>{s.v}</div>
                        <div style={{ fontSize:9.5, color:"rgba(80,60,130,0.8)", letterSpacing:"0.07em" }}>{s.l}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              {/* Resources */}
              <GlassPanel>
                <div style={{ fontSize:16, fontWeight:700, color:"#2d2040", marginBottom:14 }}>Resources for Breaking the Cycle</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>
                  {[
                    { grad:"linear-gradient(135deg,#ede9fe,#ddd6fe)", c:"#7c3aed", title:"Time Management", desc:"Learn Pomodoro, time blocking, and priority matrices." },
                    { grad:"linear-gradient(135deg,#dbeafe,#bfdbfe)", c:"#2563eb", title:"Counseling Support", desc:"Free one-on-one sessions with academic counselors and psychologists." },
                    { grad:"linear-gradient(135deg,#fef3c7,#fde68a)", c:"#d97706", title:"Peer Accountability", desc:"Join study groups and accountability partnerships for mutual support." },
                  ].map((r,i) => (
                    <div key={i} style={{ padding:16, borderRadius:16, background:r.grad, border:"1px solid rgba(255,255,255,0.85)", boxShadow:"0 2px 12px rgba(160,140,200,0.1)" }}>
                      <div style={{ fontSize:13.5, fontWeight:700, color:r.c, marginBottom:7 }}>{r.title}</div>
                      <div style={{ fontSize:11.5, color:"rgba(60,40,100,0.9)", lineHeight:1.6 }}>{r.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:15, fontWeight:700, color:"#2d2040", marginBottom:14 }}>Evidence-Based Action Steps</div>
                {[
                  { n:1, title:"Set Implementation Intentions", desc:'Replace "I\'ll study later" with specific plans: "I will study in the library at 3pm for 90 minutes".' },
                  { n:2, title:"Break Down Large Tasks", desc:"Divide overwhelming projects into 25-minute focused sessions with clear micro-goals." },
                  { n:3, title:"Create Environmental Friction", desc:"Remove phone from study space, use website blockers, establish phone-free zones." },
                ].map((s,i) => (
                  <div key={i} style={{ display:"flex", gap:12, marginBottom:13, alignItems:"flex-start" }}>
                    <div style={{ width:28, height:28, borderRadius:9, flexShrink:0, background:"linear-gradient(135deg,#c084fc,#818cf8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", boxShadow:"0 2px 10px rgba(160,100,255,0.3)" }}>{s.n}</div>
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:"#7c3aed", marginBottom:3 }}>{s.title}</div>
                      <div style={{ fontSize:12, color:"rgba(60,40,100,0.9)", lineHeight:1.65 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </GlassPanel>
            </>
          )}

          {/* DATASET EXPLORER */}
          {active === "dataset" && (
            <>
              <div style={{ marginBottom:22 }}>
                <h1 style={{ fontSize:26, fontWeight:800, color:"#2d2040" }}>Behavioral Analysis Canvas</h1>
                <p style={{ fontSize:13, color:"rgba(80,60,130,0.85)", marginTop:5 }}>Monitoring peak task procrastination frequencies</p>
              </div>
              <GlassPanel>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                  <div>
                    <div style={{ fontSize:16, fontWeight:700, color:"#2d2040" }}>⬡ Raw Dataset Explorer</div>
                    <div style={{ fontSize:12, color:"rgba(80,60,130,0.85)", marginTop:3 }}>Browse, filter, and analyze the {totalStudents} responses directly.</div>
                  </div>
                  <input 
                    placeholder="Search dataset..." 
                    value={datasetSearch}
                    onChange={(e) => setDatasetSearch(e.target.value)}
                    style={{
                    padding:"8px 14px", borderRadius:10, fontSize:12,
                    background:"rgba(255,255,255,0.55)", border:"1px solid rgba(180,160,240,0.25)",
                    color:"#2d2040", outline:"none", width:190,
                    fontFamily:"'DM Sans', sans-serif",
                  }} />
                </div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:"0 5px", fontSize:12.5 }}>
                    <thead>
                      <tr>
                        {["Respondent ID","Gender","Year","Stream","Frequency","Task Most","Main Distraction"].map(h => (
                          <th key={h} style={{ textAlign:"left", padding:"7px 12px", fontSize:10, letterSpacing:"0.08em", color:"rgba(80,60,130,0.78)", textTransform:"uppercase", fontWeight:600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {surveyData
                        .filter((d: any) => JSON.stringify(Object.values(d)).toLowerCase().includes(datasetSearch.toLowerCase()))
                        .map((dataRow: any, i) => {
                        const row = [
                          dataRow['Respondent ID'],
                          dataRow['Gender'],
                          dataRow['Year of Study'],
                          dataRow['Stream/Course'],
                          dataRow['Procrastination Frequency'],
                          dataRow['Task Procrastinated Most'],
                          dataRow['Main Distraction']
                        ];
                        const fc: any = { Always:"#f472b6", Often:"#a78bfa", Sometimes:"#fb923c", Rarely:"#fbbf24", Never:"#4ade80" };
                        const bg = fc[row[4] as string] || "#ccc";
                        return (
                          <tr key={i}>
                            <td style={{ padding:"10px 12px", borderRadius:"12px 0 0 12px", background:"rgba(255,255,255,0.5)", color:"#7c3aed", fontWeight:700, border:"1px solid rgba(255,255,255,0.75)", borderRight:"none" }}>{row[0]}</td>
                            {[1,2,3].map(j => (
                              <td key={j} style={{ padding:"10px 12px", background:"rgba(255,255,255,0.5)", color:"rgba(60,40,100,0.95)", border:"1px solid rgba(255,255,255,0.75)", borderLeft:"none", borderRight:"none" }}>{row[j]}</td>
                            ))}
                            <td style={{ padding:"10px 12px", background:"rgba(255,255,255,0.5)", border:"1px solid rgba(255,255,255,0.75)", borderLeft:"none", borderRight:"none" }}>
                              <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, background:`${bg}18`, color:bg, border:`1px solid ${bg}44` }}>{row[4]}</span>
                            </td>
                            {[5,6].map((j,k) => (
                              <td key={j} style={{
                                padding:"10px 12px", background:"rgba(255,255,255,0.5)",
                                color:"rgba(60,40,100,0.9)",
                                border:"1px solid rgba(255,255,255,0.75)", borderLeft:"none",
                                borderRight: k===1 ? "1px solid rgba(255,255,255,0.75)" : "none",
                                borderRadius: k===1 ? "0 12px 12px 0" : 0,
                              }}>{row[j]}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </GlassPanel>
            </>
          )}
        </main>
      </div>
    </>
  );
}
