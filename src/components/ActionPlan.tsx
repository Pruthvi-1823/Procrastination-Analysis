import { Activity, LayoutList, Calendar, Users, Target, ShieldAlert } from 'lucide-react';
import { RiskPortal } from './Dashboard';
import { PopulationMap } from './PopulationMap';

export function ActionPlan() {
  return (
    <div id="action-plan" className="space-y-8 pb-12 overflow-x-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
       <RiskPortal />

       <PopulationMap />

       {/* Resources for Breaking the Cycle */}
       <div>
          <h2 className="text-xl font-display font-semibold text-white mb-4">Resources for Breaking the Cycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6">
               <h3 className="font-medium text-[#B28DFF] mb-3">Time Management</h3>
               <p className="text-sm text-[#E2DDF0] leading-relaxed">
                  Learn proven techniques like Pomodoro, time blocking, and priority matrices.
               </p>
            </div>
            <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6">
               <h3 className="font-medium text-[#3b82f6] mb-3">Counseling Support</h3>
               <p className="text-sm text-[#E2DDF0] leading-relaxed">
                  Free one-on-one sessions with academic counselors and psychologists.
               </p>
            </div>
            <div className="bg-[#1A1625] border border-[#2D2640] rounded-2xl p-6">
               <h3 className="font-medium text-[#fbbf24] mb-3">Peer Accountability</h3>
               <p className="text-sm text-[#E2DDF0] leading-relaxed">
                  Join study groups and accountability partnerships for mutual support.
               </p>
            </div>
          </div>
       </div>

       {/* Evidence-Based Action Steps */}
       <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-8" style={{ backgroundColor: '#0B1319', borderColor: '#15292B' }}>
          <h2 className="text-xl font-display font-semibold text-white mb-6">Evidence-Based Action Steps</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-[#00ff66]/10 text-[#00ff66] flex items-center justify-center font-bold text-sm shrink-0 mt-1">1</div>
               <div>
                  <h3 className="font-medium text-[#00ff66] mb-1">Set Implementation Intentions</h3>
                  <p className="text-sm text-[#E2DDF0] leading-relaxed">
                     Replace "I'll study later" with specific plans: "I will study in the library at 3pm for 90 minutes".
                  </p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center font-bold text-sm shrink-0 mt-1">2</div>
               <div>
                  <h3 className="font-medium text-[#3b82f6] mb-1">Break Down Large Tasks</h3>
                  <p className="text-sm text-[#E2DDF0] leading-relaxed">
                     Divide overwhelming projects into 25-minute focused sessions with clear micro-goals.
                  </p>
               </div>
            </div>

            <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-[#a855f7]/10 text-[#a855f7] flex items-center justify-center font-bold text-sm shrink-0 mt-1">3</div>
               <div>
                  <h3 className="font-medium text-[#a855f7] mb-1">Create Environmental Friction</h3>
                  <p className="text-sm text-[#E2DDF0] leading-relaxed">
                     Remove phone from study space, use website blockers during work periods, establish phone-free zones.
                  </p>
               </div>
            </div>
          </div>
       </div>

    </div>
  );
}
