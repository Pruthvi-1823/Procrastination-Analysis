import { Hourglass, LayoutDashboard, PieChart, Filter, CheckCircle, Database } from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <aside 
      id="sidebar" 
      className="fixed left-0 top-0 w-64 h-full bg-[#13111C] border-r border-[#2D2640] p-5 flex flex-col z-20 overflow-y-auto style-scrollbar"
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-2 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-[#2D2640] flex items-center justify-center text-[#B28DFF] shadow-inner border border-[#3D3356]">
          <Hourglass className="w-5 h-5 text-[#FFC857]" fill="currentColor" strokeWidth={1} />
        </div>
        <h1 className="font-display font-semibold text-[19px] leading-[1.15] tracking-tight text-white">
          The<br />
          Procrastinator's<br />
          <span className="text-[#B28DFF]">Mirror</span>
        </h1>
      </div>
      <p className="text-[#8C83A3] text-xs mb-6 pb-4 border-b border-[#2D2640] shrink-0">
        Deep-Dive Behavioral Analysis
      </p>

      {/* Navigation Links */}
      <div className="space-y-1 flex-1">
        <h2 className="text-[10px] uppercase tracking-widest text-[#8C83A3] flex items-center gap-2 font-bold mb-3 pt-1">
           <Filter className="w-3.5 h-3.5" /> Control Center
        </h2>
        
        <div className="space-y-1.5">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all text-sm font-medium border ${
              activeTab === 'overview' 
                ? 'bg-[#2D2640] text-white border-[#4B4363] shadow-md shadow-fuchsia-900/10' 
                : 'text-[#8C83A3] hover:text-white hover:bg-[#1A1625] border-transparent'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('deep-dive')}
            className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all text-sm font-medium border ${
              activeTab === 'deep-dive' 
                ? 'bg-[#2D2640] text-white border-[#4B4363] shadow-md shadow-fuchsia-900/10' 
                : 'text-[#8C83A3] hover:text-white hover:bg-[#1A1625] border-transparent'
            }`}
          >
            <PieChart className="w-4 h-4" /> Behavioral Patterns
          </button>
          
          <button 
            onClick={() => setActiveTab('intervention-tools')}
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all text-sm font-medium border ${
              activeTab === 'intervention-tools' 
                ? 'bg-[#2D2640] text-white border-[#4B4363] shadow-md shadow-fuchsia-900/10' 
                : 'text-[#8C83A3] hover:text-white hover:bg-[#1A1625] border-transparent'
            }`}
          >
            <CheckCircle className="w-4 h-4" /> Intervention Tools
          </button>
          
          <button 
            onClick={() => setActiveTab('dataset-explorer')}
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all text-sm font-medium border ${
              activeTab === 'dataset-explorer' 
                ? 'bg-[#2D2640] text-white border-[#4B4363] shadow-md shadow-fuchsia-900/10' 
                : 'text-[#8C83A3] hover:text-white hover:bg-[#1A1625] border-transparent'
            }`}
          >
            <Database className="w-4 h-4" /> Dataset Explorer
          </button>
        </div>
      </div>
      
      {/* Quote Widget pushed automatically to the bottom safely */}
      <div className="mt-auto pt-6 shrink-0">
        <div className="bg-[#1A1625]/50 border border-[#2D2640] rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#B28DFF]/50" />
          <p className="text-[#E2DDF0] text-[12px] leading-relaxed mb-2 italic">
            "The first step in overcoming procrastination is understanding its patterns."
          </p>
          <p className="text-[#8C83A3] text-[10px] font-medium tracking-wide">— Behavioral Psychology Research</p>
        </div>

        <div className="mt-4 text-[10px] text-[#5C5470] tracking-wide">
          Data collected from 2026 Academic Survey
        </div>
      </div>
    </aside>
  );
}