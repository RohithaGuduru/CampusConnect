import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* 4 Columns matching Screenshot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-100">
          
          {/* Column 1: Brand & Operational status (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2D24CA] flex items-center justify-center text-white font-extrabold text-[11px] tracking-wider shadow-sm">
                HUB
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                CampusConnect – VITAP
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The student-focused digital operations and lifestyle backbone for students at Vellore Institute of Technology – AP.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Network Operational · v3.5.0</span>
            </div>
          </div>

          {/* Column 2: CAMPUS MODULES (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              CAMPUS MODULES
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#spaces-section" className="hover:text-[#2E25D2] transition">Available Spaces Directory</a></li>
              <li><a href="#happenings-section" className="hover:text-[#2E25D2] transition">Fest & Club Schedules</a></li>
              <li><a href="#happenings-section" className="hover:text-[#2E25D2] transition">Night Mess & Food Discovery</a></li>
              <li><a href="#happenings-section" className="hover:text-[#2E25D2] transition">Student Peer Marketplace</a></li>
            </ul>
          </div>

          {/* Column 3: CAMPUS NAVIGATION (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              CAMPUS NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#spaces-section" className="hover:text-[#2E25D2] transition">Academic Blocks Guide (CB/AB1/AB2)</a></li>
              <li><span className="hover:text-[#2E25D2] cursor-pointer">Hostel Shuttles & Timings</span></li>
              <li><span className="hover:text-[#2E25D2] cursor-pointer">Health Center & Pharmacy</span></li>
              <li><span className="hover:text-[#2E25D2] cursor-pointer">Indoor & Outdoor Sports Courts</span></li>
            </ul>
          </div>

          {/* Column 4: COMMUNITY & TRUST (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              COMMUNITY & TRUST
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#verification-explainer-section" className="hover:text-[#2E25D2] transition">Community Guidelines</a></li>
              <li><a href="#verification-explainer-section" className="hover:text-[#2E25D2] transition">Privacy & Anonymous Verification</a></li>
              <li><a href="#contributor-hub-section" className="hover:text-[#2E25D2] transition">Reporting Misleading Data</a></li>
              <li><a href="#verification-explainer-section" className="hover:text-[#2E25D2] transition">Help & Student Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom strip matching Screenshot 1 */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p className="text-center md:text-left">
            CampusConnect – VITAP is an independent, student-focused campus discovery platform built by students for students. All room availability data is community-reported.
          </p>
          <p className="shrink-0 font-medium">
            © 2025 VIT-AP University. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
