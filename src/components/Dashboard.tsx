import { 
  Brain, AlertTriangle, ClockAlert, ShieldAlert, Activity, Lightbulb, Workflow, RefreshCw 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, CartesianGrid, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, AreaChart, Area,
  Sankey, Layer, Rectangle, ComposedChart, Scatter,
  Treemap, ScatterChart, ZAxis
} from 'recharts';
import { useState } from 'react';
import { 
  overviewStats, frequencyData, taskData, timingData, timeOfDayData, 
  reasonsData, distractionData, feelingImpactData, fixData, COLORS,
  NEON_COLORS, sankeyData, demographicsData, frequencyOrderedData, timingVsTimeData,
  freqVsGradesData, missedSubmissionData, taskVsFreqData, selfIdVsFixData, feelingByYearData,
  genderData, courseOverviewData
} from '../data';

const tooltipStyles = {
  cursor: { fill: '#2D2640', opacity: 0.3 },
  contentStyle: { backgroundColor: '#13111C', borderRadius: '12px', border: '1px solid #2D2640', color: '#FFF' },
  itemStyle: { color: '#FFF', fontWeight: 600 }
};

const CustomSankeyNode = ({ x, y, width, height, index, payload }: any) => {
  const color = NEON_COLORS[index % NEON_COLORS.length] || '#c084fc';
  if (x == null || y == null) return null; // Defensive check
  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle x={x} y={y} width={width || 10} height={height || 10} fill={color} fillOpacity="1" />
      <text
        textAnchor={x > 200 ? 'end' : 'start'}
        x={x > 200 ? x - 6 : x + (width || 10) + 6}
        y={y + (height || 10) / 2}
        fontSize="11"
        fontWeight="600"
        fill="#E2DDF0"
        dy={4}
      >
        {payload?.name?.replace('Start: ', '')?.replace('Feeling: ', '') || ''}
      </text>
    </Layer>
  );
};

export function InsightsRow() {
  return (
    <div id="insights-row" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Metrics Card 1 */}
      <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6 relative overflow-hidden group hover:border-[#4B4363] transition-colors">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
        <div className="flex items-start justify-between relative z-10">
          <div>
            <h3 className="text-[#8C83A3] text-sm font-medium mb-1">Surveyed</h3>
            <p className="text-4xl font-display font-bold text-white tracking-tight">{overviewStats.total}</p>
            <p className="text-xs text-cyan-400 mt-2 font-medium flex items-center gap-1">
              <span className="bg-cyan-500/20 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">Total</span>
            </p>
          </div>
          <div className="p-3 bg-[#13111C] border border-[#2D2640] rounded-xl text-cyan-400 shadow-inner">
            <Brain className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {/* Metrics Card 2 */}
      <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6 relative overflow-hidden group hover:border-[#4B4363] transition-colors">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
        <div className="flex items-start justify-between relative z-10">
          <div>
            <h3 className="text-[#8C83A3] text-sm font-medium mb-1">Delayers</h3>
            <p className="text-4xl font-display font-bold text-white tracking-tight">{overviewStats.chronic}<span className="text-2xl text-[#8C83A3]">%</span></p>
            <p className="text-xs text-amber-400 mt-2 font-medium flex items-center gap-1">
              behavioral loop
            </p>
          </div>
          <div className="p-3 bg-[#13111C] border border-[#2D2640] rounded-xl text-amber-400 shadow-inner">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Metrics Card 3 */}
      <div className="bg-[#1A1625] border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-[0_0_20px_rgba(244,63,94,0.05)] hover:shadow-[0_0_25px_rgba(244,63,94,0.1)] transition-shadow">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-rose-500/15 rounded-full blur-3xl group-hover:bg-rose-500/25 transition-all duration-500"></div>
        <div className="flex items-start justify-between relative z-10">
          <div>
            <h3 className="text-rose-200/70 text-sm font-medium mb-1">Deadline Crashing Rate</h3>
            <p className="text-4xl font-display font-bold text-white tracking-tight">{overviewStats.missed}<span className="text-2xl text-rose-500/80">%</span></p>
            <p className="text-xs text-rose-400 mt-2 font-medium flex items-center gap-1">
              missed submissions
            </p>
          </div>
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 shadow-inner">
            <ClockAlert className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcrastinationPoints() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
       <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6 hover:border-[#4B4363] transition-colors relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-all duration-500"></div>
          <Lightbulb className="w-8 h-8 text-fuchsia-400 mb-4 relative z-10" />
          <h4 className="font-display font-bold text-white mb-2 relative z-10">The Perfection Trap</h4>
          <p className="text-sm text-[#8C83A3] leading-relaxed relative z-10">Procrastination is rarely driven by laziness; it's predominantly a coping mechanism protecting the ego from the fear of failure.</p>
       </div>
       <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6 hover:border-[#4B4363] transition-colors relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
          <Workflow className="w-8 h-8 text-amber-400 mb-4 relative z-10" />
          <h4 className="font-display font-bold text-white mb-2 relative z-10">Task Paralysis</h4>
          <p className="text-sm text-[#8C83A3] leading-relaxed relative z-10">When confronted with large, unstructured projects, the brain struggles to process the complexity, triggering deep overwhelm and immediate avoidance behaviors.</p>
       </div>
       <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6 hover:border-[#4B4363] transition-colors relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
          <RefreshCw className="w-8 h-8 text-cyan-400 mb-4 relative z-10" />
          <h4 className="font-display font-bold text-white mb-2 relative z-10">The Guilt Cycle</h4>
          <p className="text-sm text-[#8C83A3] leading-relaxed relative z-10">Delaying a task generates cognitive friction and anxiety, which depletes executive function, making it even harder to initiate later.</p>
       </div>
    </div>
  );
}

export function RiskPortal() {
  const [thief, setThief] = useState('');
  const [proximity, setProximity] = useState(50);
  const [result, setResult] = useState<{score: number; persona: string; description: string} | null>(null);

  const calculate = () => {
     if (!thief) return;
     const baseFactor = thief === 'social' ? 35 : thief === 'video' ? 30 : thief === 'friends' ? 25 : thief === 'web' ? 20 : 15;
     const proxDec = proximity / 100;
     const score = Math.floor(Math.min(99, Math.max(12, baseFactor + (proxDec * 60) + (Math.random() * 5))));
     
     let persona = "The Structured Dreamer";
     let description = "You have optimistic plans but generally retain control. Focus on breaking tasks down earlier.";
     
     if (score >= 82) {
       persona = "The Chronic Crisis Junkie";
       description = "Adrenaline is your only fuel. You operate in the red-zone and risk severe structural burnout. Systematic behavioral intervention required immediately.";
     } else if (score >= 60) {
       persona = "The Perfectionist Evader";
       description = "You delay starting out of fear the result won't be flawless. Remember: a completed draft is infinitely better than a perfect blank page.";
     } else if (score >= 40) {
       persona = "The Distraction Drifter";
       description = "Your delay stems from broken focus rather than fear. You need strict environment design and digital blockers.";
     }

     setResult({ score, persona, description });
  };

  return (
    <div id="risk-portal" className="bg-gradient-to-br from-[#1A1625] to-[#13111C] border border-rose-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3"></div>
       
       <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-10 pb-6 border-b border-[#2D2640] relative z-10">
          <div className="bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 shadow-inner">
             <ShieldAlert className="w-8 h-8 text-rose-500" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">Test Your Delay Threshold</h3>
            <p className="text-[#8C83A3] text-sm mt-1">Configure your typical behavioral inputs to generate a personalized risk index.</p>
          </div>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 relative z-10">
          {/* Form Widget */}
          <div className="space-y-8 max-w-md">
             <div>
                <label className="block text-[13px] uppercase tracking-wider text-[#E2DDF0] mb-3 font-semibold">Primary Distraction Source</label>
                <div className="relative">
                  <select 
                    value={thief}
                    onChange={(e) => setThief(e.target.value)}
                    className="w-full bg-[#13111C] border border-[#2D2640] rounded-xl p-4 text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all cursor-pointer font-medium appearance-none shadow-inner"
                  >
                    <option value="" disabled>Select your main distraction...</option>
                    <option value="social">Social Media (Instagram, TikTok, etc.)</option>
                    <option value="video">Streaming/Gaming (Netflix, Games)</option>
                    <option value="friends">Friends/Social Activities</option>
                    <option value="web">Random Web Browsing</option>
                    <option value="other">Other Distractions</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                     <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
             </div>
             
             <div>
                <label className="block text-[13px] uppercase tracking-wider text-[#E2DDF0] mb-5 font-semibold flex justify-between items-center">
                   <span>Typical Deadline Proximity</span>
                   <span className="bg-[#13111C] border border-[#2D2640] px-3 py-1 rounded-md text-rose-400 font-mono font-bold tracking-widest">{proximity}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={proximity} 
                  onChange={(e) => setProximity(Number(e.target.value))}
                  className="w-full h-3 bg-[#2D2640] rounded-full appearance-none cursor-pointer accent-rose-500 hover:accent-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50" 
                />
                <div className="flex justify-between text-xs text-[#8C83A3] mt-3 font-medium uppercase tracking-wider">
                   <span>Days Before</span>
                   <span>Minutes Before</span>
                </div>
             </div>
             
             <div className="pt-4">
                <button 
                  onClick={calculate}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold tracking-wide rounded-xl py-4 px-6 shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                >
                   <Activity className="w-5 h-5" />
                   Generate
                </button>
             </div>
          </div>
          
          {/* Result Widget */}
          <div className="relative">
             {result ? (
               <div className="h-full bg-gradient-to-b from-[#13111C] to-[#1A1625] border border-rose-500/30 rounded-2xl p-8 md:p-10 flex flex-col shadow-2xl shadow-rose-900/10 animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
                 <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"></div>
                 <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C83A3] block mb-2">Calculated Risk Index</span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-7xl font-display font-bold tracking-tighter drop-shadow-md ${result.score > 80 ? 'text-rose-500' : result.score > 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {result.score}
                      </span>
                      <span className="text-[#4B4363] text-2xl font-mono font-bold">/ 100</span>
                    </div>
                 </div>
                 
                 <div className="w-full h-1.5 bg-[#2D2640] rounded-full mb-8 overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-1000 ease-out" style={{ width: `${result.score}%` }}></div>
                 </div>
                 
                 <div className="bg-[#1A1625] border border-[#2D2640] rounded-xl p-6 flex-1 shadow-inner">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-400 mb-2 block">Identified Archetype</span>
                    <h4 className="font-display font-bold text-white text-xl mb-3">{result.persona}</h4>
                    <p className="text-sm text-[#E2DDF0] leading-relaxed opacity-90">{result.description}</p>
                 </div>
               </div>
             ) : (
               <div className="h-full border-2 border-dashed border-[#2D2640] rounded-2xl flex flex-col items-center justify-center p-10 text-center bg-[#13111C]/30 transition-all">
                 <p className="text-[#8C83A3] text-sm font-medium leading-relaxed max-w-sm">Complete the form and click the button to reveal your procrastination profile</p>
               </div>
             )}
          </div>
       </div>
    </div>
  );
}

export function Overview() {
  return (
    <div id="demo-overview" className="space-y-8 pb-12 overflow-x-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <InsightsRow />
      <ProcrastinationPoints />
    </div>
  );
}

function ChartCard({ title, desc, children, className = "", heightClass = "", insight }: any) {
  return (
    <div className={`bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6 flex flex-col hover:border-[#4B4363] transition-colors overflow-hidden ${className}`}>
       <h3 className="font-display font-bold text-white text-lg mb-1">{title}</h3>
       <p className="text-[#8C83A3] text-sm mb-6">{desc}</p>
       <div className={`w-full ${heightClass || "h-[350px] min-h-[300px]"} relative`}>
         {children}
       </div>
       {insight && (
         <div className="mt-6 bg-[#00ff66]/[0.03] border border-[#00ff66]/20 rounded-xl p-4 flex gap-3 items-start">
           <p className="text-[13px] leading-relaxed text-[#E2DDF0]">
             <span className="font-medium text-[#00ff66]">Insight:</span> {insight}
           </p>
         </div>
       )}
    </div>
  );
}

const CustomTreemapContent = ({ root, depth, x, y, width, height, index, payload, colors, rank, name }: any) => {
  const hasChildren = payload?.children && payload.children.length > 0;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill: depth < 2 ? NEON_COLORS[index % NEON_COLORS.length] : 'transparent', stroke: '#13111C', strokeWidth: 2, fillOpacity: 0.8 }} />
      {width > 50 && height > 30 && depth === 2 ? (
        <text x={x + width / 2} y={y + height / 2 + 5} textAnchor="middle" fill="#13111C" fontSize={12} fontWeight={700}>
          {name}
        </text>
      ) : null}
      {depth === 1 && width > 40 && height > 40 ? (
        <text x={hasChildren ? x + 4 : x + width / 2} y={hasChildren ? y + 18 : y + height / 2 + 5} textAnchor={hasChildren ? 'start' : 'middle'} fill="#fff" fontSize={14} fontWeight={800} fillOpacity={0.9}>
          {name}
        </text>
      ) : null}
    </g>
  );
};

export function DeepDive() {
  const genderKeys = Object.keys(genderData[0] || {}).filter(k => k !== 'name' && k !== 'total');
  
  return (
    <div className="space-y-8 pb-12 overflow-x-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Gender Distribution */}
        <ChartCard title="1. Gender Distribution" desc="Clean horizontal ratio progress bar mapping male and female." insight="The gender distribution emphasizes a balanced sample, proving procrastination trends are largely gender-agnostic.">
          <div className="absolute inset-0 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart layout="vertical" data={genderData} stackOffset="expand" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip 
                  {...tooltipStyles} 
                  cursor={{ fill: 'transparent' }}
                  formatter={(val: number, name: string) => [`${val} (${Math.round((val / genderData[0].total) * 100)}%)`, name]} 
                />
                <Legend wrapperStyle={{ fontSize: '13px', color: '#E2DDF0', paddingTop: '10px' }} />
                {genderKeys.map((key, i) => {
                  const isFirst = i === 0;
                  const isLast = i === genderKeys.length - 1;
                  const horizRadius: [number, number, number, number] = genderKeys.length === 1 ? [6, 6, 6, 6] : (isFirst ? [6, 0, 0, 6] : isLast ? [0, 6, 6, 0] : [0, 0, 0, 0]);
                  
                  return (
                    <Bar key={key} dataKey={key} stackId="a" fill={NEON_COLORS[(i + 1) % NEON_COLORS.length]} radius={horizRadius} barSize={24} />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 2: Procrastination Frequency */}
        <ChartCard title="2. Overall Frequency" desc="Ordered vertical scale showing sequential delay severity." insight="A vast majority of students delay tasks 'Everyday' or 'Often', signaling systemic time-management challenges.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frequencyOrderedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#2D2640" vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyles} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {frequencyOrderedData.map((entry, index) => {
                  const colorMap = ['#00ff66', '#ffeb3b', '#ffaa00', '#ff00ff', '#ff4a4a'];
                  return <Cell key={index} fill={colorMap[index]} style={{ filter: `drop-shadow(0px -4px 8px ${colorMap[index]}40)` }} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3: Main Distraction Donut */}
        <ChartCard title="3. Primary Distractions" desc="Wide-Hollow Donut mapping categories of immediate gratification." insight="Smartphones remain the dominant distraction, overriding social media and gaming combined in severing focus.">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={distractionData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                innerRadius={90} 
                outerRadius={120} 
                stroke="#1A1625" 
                strokeWidth={5}
                cornerRadius={12}
              >
                {distractionData.map((entry, index) => <Cell key={index} fill={NEON_COLORS[index % NEON_COLORS.length]} style={{ filter: `drop-shadow(0px 0px 8px ${NEON_COLORS[index % NEON_COLORS.length]}60)` }} />)}
              </Pie>
              <text x="50%" y="45%" textAnchor="middle" fill="#8C83A3" fontSize="12" fontWeight="600" className="uppercase tracking-widest">Top Distractor</text>
              <text x="50%" y="58%" textAnchor="middle" fill="#E2DDF0" fontSize="16" fontWeight="bold" className="font-display">{distractionData[0]?.name || ''}</text>
              <Tooltip {...tooltipStyles} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 4: Reasons for Delay */}
        <ChartCard title="4. Anatomy of Excuses" desc="Ranked Descending Horizontal Line-Bar for exact roadblock impact." insight="Poor time management and laziness represent the core self-reported barriers, dwarfing external challenges.">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart layout="vertical" data={reasonsData} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid stroke="#2D2640" strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#4B4363" tick={{ fill: '#E2DDF0', fontSize: 12 }} width={140} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyles} />
              <Bar dataKey="value" fill={NEON_COLORS[1]} barSize={8} radius={[0, 6, 6, 0]} style={{ filter: `drop-shadow(0px 0px 5px ${NEON_COLORS[1]}80)` }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 5: Timing vs Time of Day Scatter */}
        <ChartCard title="5. Habit Clustering Grid" desc="Categorical grouped bar chart mapping timing vs time of day." insight="Most students procrastinate before exams, particularly those reporting 'Everyday' or 'Often' delays.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timingVsTimeData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="#2D2640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyles} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#8C83A3' }} />
              <Bar dataKey="Starts early but delays" stackId="a" fill={NEON_COLORS[0]} />
              <Bar dataKey="Day before" stackId="a" fill={NEON_COLORS[1]} />
              <Bar dataKey="2-3 days before" stackId="a" fill={NEON_COLORS[2]} />
              <Bar dataKey="Well in advance" stackId="a" fill={NEON_COLORS[3]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 6: Procrastination Frequency vs Grades */}
        <ChartCard title="6. Grade Impact Proportion" desc="100% Stacked Bar showing how academic penalty expands with habit severity." insight="Chronic procrastination directly correlates with severe academic impact, shifting grades downward significantly.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={freqVsGradesData} layout="vertical" stackOffset="expand" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#2D2640" strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(val) => `${Math.round(val * 100)}%`} />
              <YAxis dataKey="name" type="category" stroke="#4B4363" tick={{ fill: '#E2DDF0', fontSize: 12 }} width={80} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyles} formatter={(val: number) => `${val} Users`} />
              <Legend wrapperStyle={{ fontSize: '13px', color: '#E2DDF0', paddingTop: '10px' }} />
              <Bar dataKey="Yes" name="Impacts Grades" stackId="a" fill={NEON_COLORS[2]} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Sometimes" name="Variable" stackId="a" fill={NEON_COLORS[4]} radius={[0, 0, 0, 0]} />
              <Bar dataKey="No" name="No Impact" stackId="a" fill={NEON_COLORS[3]} radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 7: Missed Submission Dual Pie */}
        <ChartCard title="7. Submission Crash Rate" desc="Clean dual-slice pie showing critical missed deadlines." insight="Almost half the population forces last-minute submissions, risking incomplete work and severe anxiety.">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={missedSubmissionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} stroke="#1A1625" strokeWidth={5}>
                <Cell fill={NEON_COLORS[2]} style={{ filter: `drop-shadow(0px 0px 10px ${NEON_COLORS[2]}60)` }} />
                <Cell fill="#2D2640" />
              </Pie>
              <Tooltip {...tooltipStyles} />
              <Legend wrapperStyle={{ fontSize: '13px', color: '#E2DDF0', paddingTop: '10px' }} />
              <text x="50%" y="50%" textAnchor="middle" fill="#E2DDF0" fontSize="26" fontWeight="bold" className="font-display">
                {overviewStats.missed}%
              </text>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 8: Task vs Frequency Area */}
        <ChartCard title="8. Task Avoidance Density" desc="Stacked Area chart mapping task profiles to delay frequency." insight="High-frequency procrastination dense in specific task clusters reveals systemic avoidance patterns.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={taskVsFreqData} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
              <CartesianGrid stroke="#2D2640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyles} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#8C83A3' }} />
              <Area type="monotone" dataKey="Always" stackId="1" stroke={NEON_COLORS[0]} fill={NEON_COLORS[0]} />
              <Area type="monotone" dataKey="Often" stackId="1" stroke={NEON_COLORS[1]} fill={NEON_COLORS[1]} />
              <Area type="monotone" dataKey="Sometimes" stackId="1" stroke={NEON_COLORS[2]} fill={NEON_COLORS[2]} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 9: Self Identity vs Interventions */}
        <ChartCard title="9. Intention vs Action" desc="Grouped Column tracking attempts to fix habits grouped by self-awareness." className="lg:col-span-2" insight="Highly self-aware students have an 86% success rate in breaking procrastination habits.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={selfIdVsFixData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#2D2640" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyles} />
              <Legend wrapperStyle={{ fontSize: '13px', color: '#E2DDF0', paddingTop: '10px' }} />
              <Bar dataKey="Successful" fill={NEON_COLORS[3]} radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Failed" fill={NEON_COLORS[2]} radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Never Tried" fill="#4B4363" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 10: Emotional Sentiment Trends */}
        <ChartCard title="10. Emotional Sentiment Timeline" desc="Executive Line Chart tracking distinct feelings plotted across core study years." className="lg:col-span-2" insight="Guilt and stress peak around late sophomore / junior year, signaling the breaking point of poor habits.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={feelingByYearData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#2D2640" strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis dataKey="name" stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 12 }} axisLine={false} tickLine={false} padding={{ left: 30, right: 30 }} />
              <YAxis stroke="#4B4363" tick={{ fill: '#8C83A3', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyles} />
              <Legend wrapperStyle={{ fontSize: '13px', color: '#E2DDF0', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="Guilty" stroke={NEON_COLORS[2]} strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
              <Line type="monotone" dataKey="Stressed" stroke={NEON_COLORS[1]} strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
              <Line type="monotone" dataKey="Motivated" stroke={NEON_COLORS[0]} strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}
