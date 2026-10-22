import React from 'react';

export const VerificationExplainerSection: React.FC = () => {
  return (
    <section id="verification-explainer-section" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 1 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#4F46E5] text-[11px] font-bold uppercase tracking-wider block mb-2">
            PEER–DRIVEN RELIABILITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Community Verification Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Campus Hub relies on transparent, anonymous peer verification and an internal trust reputation system to keep room availability reliable.
          </p>
        </div>

        {/* 3 Numbered Cards matching Screenshot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#ECEBFE] text-[#2E25D2] font-black text-lg flex items-center justify-center">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mt-5">
              1. Student Reports Empty Room
            </h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Any student noticing an empty classroom or lab in AB1, AB2, or CB taps '+ Report Empty Space' to submit room details. The reporter's identity is strictly anonymous.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#ECEBFE] text-[#2E25D2] font-black text-lg flex items-center justify-center">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mt-5">
              2. Peer Check & Live Confirmation
            </h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Fellow students visiting the space tap 'I'm Here — Confirm' or 'Room is Occupied'. Confidence increases from Unverified (⚪) → Probably Available (🟡) → Highly Likely Available (🟢).
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#E1FBEA] text-[#059669] font-black text-lg flex items-center justify-center">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mt-5">
              3. Reputation & Progressive Moderation
            </h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Students build their private Trust Score (New Member → Contributor → Trusted → Campus Helper → Campus Legend). Repeated false reports trigger progressive warnings rather than instant bans.
            </p>
          </div>

        </div>

        {/* 4 Information Columns Container matching Screenshot 1 */}
        <div className="bg-[#ECEBFE]/70 border border-[#D7DAFA] rounded-3xl p-6 sm:p-8 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          {/* Column 1 */}
          <div className="space-y-1">
            <span className="text-[#2E25D2] font-black text-lg block tracking-tight">
              3 Academic Blocks
            </span>
            <span className="font-extrabold text-slate-800 text-xs block">
              Full Campus Coverage
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              AB1, AB2, and Central Block covered with floor-by-floor tagging
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-1">
            <span className="text-[#059669] font-black text-lg block tracking-tight">
              Community Verified
            </span>
            <span className="font-extrabold text-slate-800 text-xs block">
              Zero Sensors Needed
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Student-powered peer confirmations with zero physical hardware
            </p>
          </div>

          {/* Column 3 */}
          <div className="space-y-1">
            <span className="text-[#2E25D2] font-black text-lg block tracking-tight">
              Real-Time Confidence
            </span>
            <span className="font-extrabold text-slate-800 text-xs block">
              Dynamic Scoring
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Dynamic confidence based on recent verified check-ins
            </p>
          </div>

          {/* Column 4 */}
          <div className="space-y-1">
            <span className="text-[#2E25D2] font-black text-lg block tracking-tight">
              Fair Moderation
            </span>
            <span className="font-extrabold text-slate-800 text-xs block">
              Accountable Systems
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Progressive review and reputation weighting to prevent misleading reports
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
