import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Building2, 
  PlusCircle, 
  Calendar, 
  UtensilsCrossed, 
  Store
} from 'lucide-react';
import { NavSection } from './Navbar';

interface HeroSectionProps {
  onNavigate: (section: NavSection) => void;
  onOpenReportModal: () => void;
  onSearch: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenReportModal,
  onSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeChip, setActiveChip] = useState('Coding Events');

  const quickFilters = [
    { label: 'AB1 Rooms', query: 'AB1' },
    { label: 'AB2 3rd Floor', query: 'AB2 Floor 3' },
    { label: 'Coding Events', query: 'Coding' },
    { label: 'Late Night Food', query: 'Night' },
    { label: 'Used Textbooks', query: 'Textbooks' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleChipClick = (chip: { label: string; query: string }) => {
    setActiveChip(chip.label);
    setSearchInput(chip.query);
    onSearch(chip.query);
  };

  return (
    <section className="pt-8 pb-14 text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Status Pill matching Screenshot 5 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-700 text-xs font-medium shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Campus Pulse · Student-Powered Campus Discovery · Real-Time Community Reports</span>
        </div>

        {/* Main Heading matching Screenshot 5 */}
        <h1 className="text-4xl sm:text-5xl md:text-[58px] font-black text-slate-900 tracking-tight leading-[1.12]">
          Your campus. Your space.{' '}
          <span className="text-[#3E32E8]">Your time.</span>
        </h1>

        {/* Supporting text */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Find free study rooms, live club events, late-night hostel deliveries, and student creations across VIT-AP University in real time.
        </p>

        {/* Big Search Bar matching Screenshot 5 */}
        <form 
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-[#2E25D2]/40 transition"
        >
          <div className="pl-3.5 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="What are you looking for? (e.g., 'AB2 AC study room', 'CSI Hackathon', 'Inavolu Biryani')"
            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none py-2"
          />
          <button
            type="submit"
            className="bg-[#2E25D2] hover:bg-[#251EB3] text-white text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 transition active:scale-95 shadow-sm shadow-[#2E25D2]/25"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Filter Chips matching Screenshot 5 */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mr-1">
            QUICK FILTERS:
          </span>
          {quickFilters.map((chip) => {
            const isSelected = activeChip === chip.label;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  isSelected
                    ? 'bg-[#ECEBFE] border border-[#D5D3FA] text-[#3328D8] font-semibold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* 5 Feature Cards in 1 row on Desktop matching Screenshot 5 */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          
          {/* Card 1: Find a Space */}
          <div 
            onClick={() => onNavigate('spaces')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-[#2E25D2]/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  LIVE
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-4 group-hover:text-[#2E25D2] transition">
                Find a Space
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Directory of all 42 reported classrooms & labs
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-[#2E25D2] flex items-center gap-1 group-hover:underline">
              <span>Explore rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: + Report Empty Space (Highlighted) */}
          <div 
            onClick={onOpenReportModal}
            className="bg-[#FAFAFF] rounded-2xl border border-[#C7C5F9] p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#ECEBFE] text-[#2E25D2] flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <span className="bg-[#2E25D2] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  +10 Karma
                </span>
              </div>
              <h3 className="font-bold text-[#2E25D2] text-sm mt-4">
                + Report Empty Space
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Help fellow students discover vacant rooms
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-[#2E25D2] flex items-center gap-1 group-hover:underline">
              <span>Submit room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Explore Events */}
          <div 
            onClick={() => onNavigate('events')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-[#2E25D2]/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  6 Today
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-4 group-hover:text-[#2E25D2] transition">
                Explore Events
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Campus club workshops & hackathons
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-[#2E25D2] flex items-center gap-1 group-hover:underline">
              <span>View calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Food Discovery */}
          <div 
            onClick={() => onNavigate('food')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-[#2E25D2]/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Night Mess
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-4 group-hover:text-[#2E25D2] transition">
                Food Discovery
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Student favorites & gate deliveries
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-[#2E25D2] flex items-center gap-1 group-hover:underline">
              <span>Explore spots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Student Marketplace */}
          <div 
            onClick={() => onNavigate('marketplace')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-[#2E25D2]/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#3E32E8] flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Peer to Peer
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-4 group-hover:text-[#2E25D2] transition">
                Student Marketplace
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Peer drops & pre-owned textbooks
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-[#2E25D2] flex items-center gap-1 group-hover:underline">
              <span>Browse listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
