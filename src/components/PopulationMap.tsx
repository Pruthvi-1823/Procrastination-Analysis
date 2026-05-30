import { useState } from 'react';
import { surveyData } from '../data';
import { User, AlertCircle, CheckCircle2, Navigation, Users } from 'lucide-react';

export function PopulationMap() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Always', 'Often', 'Sometimes', 'Rarely', 'Never'];
  
  const filteredData = activeFilter === 'All' 
    ? surveyData 
    : surveyData.filter((d: any) => d['Procrastination Frequency'] === activeFilter);

  // Group by frequency for the grid
  const getFreqColor = (freq: string) => {
    switch (freq) {
      case 'Always': return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
      case 'Often': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'Sometimes': return 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/30';
      case 'Rarely': return 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30';
      case 'Never': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="bg-[#1A1625] border border-[#2D2640] rounded-3xl p-8 mb-8 overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/5 blur-[100px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:bg-fuchsia-500/10"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-3">
              <Users className="w-6 h-6 text-fuchsia-400" />
              The 50 Minds Landscape
            </h2>
            <p className="text-[#8C83A3] text-sm max-w-2xl leading-relaxed">
              Every dot represents one of the 50 students from the study. Hover to see their unique story. 
              This infographic visualizes how procrastination frequency intersects with academic outcomes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeFilter === cat 
                    ? 'bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]' 
                    : 'bg-[#13111C] border border-[#2D2640] text-[#8C83A3] hover:text-white hover:border-[#4B4363]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid Storytelling */}
        <div className="grid grid-cols-10 sm:grid-cols-10 gap-3 md:gap-4 p-6 bg-[#13111C]/50 border border-[#2D2640]/50 rounded-2xl mb-8">
          {surveyData.map((respondent: any, i: number) => {
            const freq = respondent['Procrastination Frequency'];
            const isDimmed = activeFilter !== 'All' && activeFilter !== freq;
            const colors = getFreqColor(freq);
            
            return (
              <div 
                key={i} 
                className={`group/dot relative flex justify-center${isDimmed ? ' opacity-10 grayscale' : ' hover:-translate-y-1 hover:scale-110'} transition-all duration-300 cursor-help`}
              >
                <div className={`w-8 h-10 rounded-xl border flex items-center justify-center ${colors} shadow-inner`}>
                  <User className="w-5 h-5 opacity-90" />
                </div>
                
                {/* Custom Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-[#2D2640] border border-[#4B4363] rounded-xl p-4 shadow-2xl opacity-0 invisible group-hover/dot:opacity-100 group-hover/dot:visible group-hover/dot:translate-y-0 translate-y-2 transition-all duration-200 z-50 pointer-events-none">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#1A1625]">
                    <span className="text-white font-bold font-display text-sm">{respondent['Respondent ID']}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${colors}`}>
                      {freq}
                    </span>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <p className="text-[11px] text-[#E2DDF0]"><span className="text-[#8C83A3]">Focus Thief:</span> {respondent['Main Distraction']}</p>
                    <p className="text-[11px] text-[#E2DDF0]"><span className="text-[#8C83A3]">Feeling After:</span> {respondent['Feeling After']}</p>
                    <p className="text-[11px] text-[#E2DDF0]"><span className="text-[#8C83A3]">Affected Grades:</span> {respondent['Affects Grades']}</p>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#2D2640] border-b border-r border-[#4B4363] rotate-45"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-[#13111C] p-5 rounded-2xl border border-[#2D2640] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-white">{Math.round((filteredData.filter((d:any) => d['Ever Missed Submission'] === 'Yes').length / Math.max(1, filteredData.length)) * 100)}%</p>
                <p className="text-xs text-[#8C83A3] uppercase tracking-wider font-semibold">Missed Deadlines</p>
              </div>
           </div>
           
           <div className="bg-[#13111C] p-5 rounded-2xl border border-[#2D2640] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-white">{Math.round((filteredData.filter((d:any) => d['Feeling After'] === 'Guilty').length / Math.max(1, filteredData.length)) * 100)}%</p>
                <p className="text-xs text-[#8C83A3] uppercase tracking-wider font-semibold">Felt Guilty After</p>
              </div>
           </div>

           <div className="bg-[#13111C] p-5 rounded-2xl border border-[#2D2640] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-white">{Math.round((filteredData.filter((d:any) => d['Tried to Fix']?.includes('successfully')).length / Math.max(1, filteredData.length)) * 100)}%</p>
                <p className="text-xs text-[#8C83A3] uppercase tracking-wider font-semibold">Fixed Habits</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
