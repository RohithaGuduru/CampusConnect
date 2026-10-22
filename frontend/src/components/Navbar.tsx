import React, { useState } from 'react';
import { 
  Plus, 
  Menu, 
  X, 
  Sparkles
} from 'lucide-react';

export type NavSection = 'home' | 'spaces' | 'events' | 'food' | 'marketplace' | 'contribute' | 'profile';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenReportModal: () => void;
  apiHealthStatus: 'healthy' | 'offline' | 'checking';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenReportModal,
  apiHealthStatus,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavSection; label: string; badge?: string; hasIcon?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'spaces', label: 'Spaces', badge: 'LIVE' },
    { id: 'events', label: 'Events' },
    { id: 'food', label: 'Food Discovery' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'contribute', label: 'Contribute Hub', hasIcon: true },
    { id: 'profile', label: 'My Profile' },
  ];

  const handleNavClick = (section: NavSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand matching Screenshot 5 */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Square HUB Badge */}
            <div className="w-10 h-10 rounded-2xl bg-[#2D24CA] flex items-center justify-center text-white font-black text-xs tracking-wider shadow-sm shadow-[#2D24CA]/30 group-hover:bg-[#241DB3] transition">
              HUB
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                  CampusConnect
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ECEBFE] text-[#3328D8] border border-[#D5D3FA]">
                  VIT–AP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Student Life & Operations
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links matching Screenshot 5 */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2D24CA] text-white shadow-sm shadow-[#2D24CA]/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.hasIcon && (
                    <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#3E32E8]'}`} />
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-[#D1FADF] text-[#027A48] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider ml-0.5">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Status Pill + Report Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live API Health indicator */}
            <div 
              className="text-[11px] font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
              title={apiHealthStatus === 'healthy' ? 'FastAPI Backend Online' : 'FastAPI Offline - Demo Fallback Active'}
            >
              {apiHealthStatus === 'healthy' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700">API Live</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-slate-600">Local Mode</span>
                </>
              )}
            </div>

            {/* + Report Empty Space button matching screenshot */}
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1.5 bg-[#2E25D2] hover:bg-[#251EB3] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-[#2E25D2]/25 transition active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Report Empty Space</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenReportModal}
              className="sm:hidden bg-[#2E25D2] text-white p-2 rounded-xl text-xs font-semibold"
              title="Report Empty Space"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#2D24CA] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.hasIcon && <Sparkles className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#D1FADF] text-[#027A48]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReportModal();
              }}
              className="w-full bg-[#2E25D2] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Report Empty Space</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
