import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export default function Layout({ children, activeTab, setActiveTab }: { children: ReactNode, activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex min-h-screen bg-[#0B0A10] text-[#E2DDF0] font-sans selection:bg-fuchsia-500/30">
       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
       <main className="flex-1 ml-64 p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {/* Top Multi-Tab Navigation Header */}
          <header id="top-nav" className="mb-10 border-b border-[#2D2640] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h2 className="text-2xl font-display font-bold text-white tracking-tight">Behavioral Analysis Canvas</h2>
                <p className="text-[#8C83A3] text-sm mt-1">Monitoring peak task procrastination frequencies</p>
             </div>
          </header>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
            {children}
          </div>
       </main>
    </div>
  );
}

function Tab({ active, onClick, children }: { active?: boolean, onClick?: () => void, children: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
      active 
        ? 'bg-[#2D2640] text-white shadow-lg border border-[#4B4363]' 
        : 'text-[#8C83A3] hover:text-white hover:bg-[#1A1625] border border-transparent'
    }`}>
      {children}
    </button>
  );
}
