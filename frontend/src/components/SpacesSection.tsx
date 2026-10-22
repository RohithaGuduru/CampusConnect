import React, { useState } from 'react';
import { 
  Building2,
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  AlertCircle, 
  AlertTriangle,
  Lock,
  X
} from 'lucide-react';
import { SpaceItem, SpaceStatus } from '../types';

interface SpacesSectionProps {
  spaces: SpaceItem[];
  onOpenReportModal: () => void;
  onConfirmSpace: (spaceId: string) => Promise<void>;
  onOccupySpace: (spaceId: string) => Promise<void>;
  filterSearch?: string;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({
  spaces,
  onOpenReportModal,
  onConfirmSpace,
  onOccupySpace,
  filterSearch = '',
}) => {
  const [search, setSearch] = useState(filterSearch);
  const [selectedBlock, setSelectedBlock] = useState('ALL');
  const [selectedFloor, setSelectedFloor] = useState('All Floors');
  const [selectedAc, setSelectedAc] = useState('AC & Non-AC');
  const [selectedConfidence, setSelectedConfidence] = useState('Highest Confidence');
  const [selectedPurpose, setSelectedPurpose] = useState('All');
  const [activeDetailsSpace, setActiveDetailsSpace] = useState<SpaceItem | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [occupyingId, setOccupyingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ id: string; text: string } | null>(null);

  const purposeOptions = ['All', 'Study', 'Group Study', 'Project', 'Meeting / Workshop', 'Relax'];

  // Filter computation
  const filteredSpaces = spaces.filter((item) => {
    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesSearch = 
        item.room_number.toLowerCase().includes(q) ||
        item.block.toLowerCase().includes(q) ||
        item.floor.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    // Block filter
    if (selectedBlock !== 'ALL' && item.block !== selectedBlock) {
      return false;
    }

    // Floor filter
    if (selectedFloor !== 'All Floors' && !item.floor.toLowerCase().includes(selectedFloor.toLowerCase())) {
      return false;
    }

    // AC filter
    if (selectedAc === 'AC Only' && item.ac_type.includes('Non-AC')) {
      return false;
    }
    if (selectedAc === 'Non-AC Only' && !item.ac_type.includes('Non-AC')) {
      return false;
    }

    // Confidence filter
    if (selectedConfidence === 'Highest Confidence' && item.status !== 'highly_likely') {
      // Allow general browsing if user hasn't strictly selected
    } else if (selectedConfidence === 'Highly Likely' && item.status !== 'highly_likely') {
      return false;
    } else if (selectedConfidence === 'Probably' && item.status !== 'probably') {
      return false;
    } else if (selectedConfidence === 'Unverified' && item.status !== 'unverified') {
      return false;
    }

    // Purpose filter
    if (selectedPurpose !== 'All') {
      if (!item.purpose.toLowerCase().includes(selectedPurpose.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  // Calculate counts for legend
  const countHighly = spaces.filter(s => s.status === 'highly_likely').length;
  const countProbably = spaces.filter(s => s.status === 'probably').length;
  const countUnverified = spaces.filter(s => s.status === 'unverified').length;
  const countOccupied = spaces.filter(s => s.status === 'occupied_soon').length;

  const handleConfirm = async (spaceId: string) => {
    setConfirmingId(spaceId);
    try {
      await onConfirmSpace(spaceId);
      setActionMessage({ id: spaceId, text: 'Confirmed presence! Peer confidence increased.' });
      setTimeout(() => setActionMessage(null), 3000);
    } finally {
      setConfirmingId(null);
    }
  };

  const handleOccupy = async (spaceId: string) => {
    setOccupyingId(spaceId);
    try {
      await onOccupySpace(spaceId);
      setActionMessage({ id: spaceId, text: 'Reported room occupied. Updated status.' });
      setTimeout(() => setActionMessage(null), 3000);
    } finally {
      setOccupyingId(null);
    }
  };

  const getStatusBadge = (status: SpaceStatus) => {
    switch (status) {
      case 'highly_likely':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Highly Likely Available
          </span>
        );
      case 'probably':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Probably Available
          </span>
        );
      case 'unverified':
        return (
          <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Unverified Community Report
          </span>
        );
      case 'occupied_soon':
        return (
          <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Class in 15m / Occupied Soon
          </span>
        );
    }
  };

  return (
    <section id="spaces-section" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 4 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-emerald-600 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>REAL-TIME AVAILABLE SPACES DIRECTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Active Classrooms & Study Spaces
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live peer-reported vacancies across Academic Block 1 (AB1), Academic Block 2 (AB2), and Central Block (CB).
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1.5 bg-[#2E25D2] hover:bg-[#251EB3] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-[#2E25D2]/25 self-start md:self-auto transition active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Report Empty Space</span>
          </button>
        </div>

        {/* Filter Toolbar matching Screenshot 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-4 mb-8">
          
          {/* Row 1: Search & Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search room or block (e.g. AB2 3rd Floor, CB Lab)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E25D2]"
              />
            </div>

            {/* Block Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2E25D2]"
              >
                <option value="ALL">All Blocks</option>
                <option value="AB1">AB1</option>
                <option value="AB2">AB2</option>
                <option value="CB">CB</option>
              </select>
            </div>

            {/* Floor Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2E25D2]"
              >
                <option value="All Floors">All Floors</option>
                <option value="Floor 1">Floor 1</option>
                <option value="Floor 2">Floor 2</option>
                <option value="Floor 3">Floor 3</option>
                <option value="Floor 4">Floor 4</option>
              </select>
            </div>

            {/* AC Dropdown */}
            <div className="lg:col-span-1.5 sm:col-span-1">
              <select
                value={selectedAc}
                onChange={(e) => setSelectedAc(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2E25D2]"
              >
                <option value="AC & Non-AC">AC & Non-AC</option>
                <option value="AC Only">AC Only</option>
                <option value="Non-AC Only">Non-AC Only</option>
              </select>
            </div>

            {/* Confidence Dropdown */}
            <div className="lg:col-span-1.5 sm:col-span-1">
              <select
                value={selectedConfidence}
                onChange={(e) => setSelectedConfidence(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2E25D2]"
              >
                <option value="Highest Confidence">Highest Confidence</option>
                <option value="All Confidence">All Confidence</option>
                <option value="Highly Likely">Highly Likely</option>
                <option value="Probably">Probably</option>
                <option value="Unverified">Unverified</option>
              </select>
            </div>
          </div>

          {/* Row 2: Purpose Chips & Legend matching Screenshot 4 */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            {/* Purpose Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mr-1">
                PURPOSE:
              </span>
              {purposeOptions.map((pur) => {
                const isActive = selectedPurpose === pur;
                return (
                  <button
                    key={pur}
                    onClick={() => setSelectedPurpose(pur)}
                    className={`px-3 py-1 rounded-full text-xs transition ${
                      isActive
                        ? 'bg-[#2D24CA] text-white font-semibold shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                    }`}
                  >
                    {pur}
                  </button>
                );
              })}
            </div>

            {/* Legend on right */}
            <div className="flex flex-wrap items-center gap-3 text-slate-600 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Highly Likely ({countHighly})</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Probably ({countProbably})</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Unverified ({countUnverified})</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Occupied Soon ({countOccupied})</span>
              </span>
            </div>
          </div>

        </div>

        {/* Room Cards 3-Column Grid matching Screenshot 4 */}
        {filteredSpaces.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No rooms match your filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your block, floor, or purpose filters to discover available spaces across AB1, AB2, and CB.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedBlock('ALL');
                setSelectedFloor('All Floors');
                setSelectedPurpose('All');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSpaces.map((item) => {
              const isOccupied = item.status === 'occupied_soon';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-slate-300 transition flex flex-col justify-between"
                >
                  <div>
                    {/* Top Status & Timestamp */}
                    <div className="flex items-center justify-between mb-3">
                      {getStatusBadge(item.status)}
                      <span className="text-xs text-slate-400 font-medium">
                        {item.verified_ago}
                      </span>
                    </div>

                    {/* Room title & Floor badge */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
                        {item.room_number}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded font-medium bg-[#F1F3F9] text-slate-600 shrink-0">
                        {item.floor}
                      </span>
                    </div>

                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {item.tags.map((t, idx) => {
                        const isPurposeTag = 
                          t.includes('Study') || 
                          t.includes('Project') || 
                          t.includes('Coding') || 
                          t.includes('Workshop') ||
                          t.includes('Relax') ||
                          t.includes('Short');

                        return (
                          <span
                            key={idx}
                            className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                              isPurposeTag
                                ? 'bg-[#EDE9FE] text-[#5B21B6]'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>

                    {/* Info Box / Warning Box matching Screenshot 4 */}
                    {isOccupied && item.warning_title ? (
                      <div className="bg-[#FEF2F2] border-l-4 border-rose-500 p-3 rounded-r-xl my-3.5 text-xs text-rose-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-rose-800">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>{item.warning_title}</span>
                        </div>
                        <p className="text-[11px] text-rose-700">
                          {item.warning_sub}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-[#F5F8FF] border border-[#E1EAFE] rounded-xl p-3 my-3.5 text-xs text-slate-700 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <Clock className="w-3.5 h-3.5 text-[#2E25D2] shrink-0" />
                          <span>Available from {item.available_from} until {item.available_until}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {item.confirmations} students confirmed · ⭐️ {item.trusted_contributors} Trusted Contributors · 🎯 {item.accurate_reporters} Accurate Reporters · Last verified {item.verified_ago}
                        </p>
                      </div>
                    )}

                    {/* Toast action message if any */}
                    {actionMessage?.id === item.id && (
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-2 animate-in fade-in">
                        {actionMessage.text}
                      </div>
                    )}
                  </div>

                  {/* Actions matching Screenshot 4 */}
                  <div className="pt-2">
                    {isOccupied ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleConfirm(item.id)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                        >
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>Confirm Occupied</span>
                        </button>
                        <button
                          onClick={() => handleOccupy(item.id)}
                          className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Taken</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleConfirm(item.id)}
                          disabled={confirmingId === item.id}
                          className="bg-[#2E25D2] hover:bg-[#251EB3] text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-[#2E25D2]/20 transition active:scale-95"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{confirmingId === item.id ? 'Checking...' : "I'm Here — Confirm"}</span>
                        </button>

                        <button
                          onClick={() => handleOccupy(item.id)}
                          disabled={occupyingId === item.id}
                          className="bg-[#FEE2E2]/70 hover:bg-[#FEE2E2] text-rose-700 border border-rose-200 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{occupyingId === item.id ? 'Reporting...' : 'Report Occupied'}</span>
                        </button>
                      </div>
                    )}

                    {/* View Details Button */}
                    <button
                      onClick={() => setActiveDetailsSpace(item)}
                      className="w-full bg-[#F1F3F9] hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-xl text-center mt-2 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* View Details Modal */}
      {activeDetailsSpace && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setActiveDetailsSpace(null)}
              className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              {getStatusBadge(activeDetailsSpace.status)}
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {activeDetailsSpace.room_number}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {activeDetailsSpace.floor}
              </p>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Seating Capacity:</span>
                <span className="font-bold text-slate-800">{activeDetailsSpace.capacity} seats</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Air Conditioning:</span>
                <span className="font-bold text-slate-800">{activeDetailsSpace.ac_type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Campus Wi-Fi:</span>
                <span className="font-bold text-slate-800">{activeDetailsSpace.wifi_quality}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Primary Purpose:</span>
                <span className="font-bold text-purple-700">{activeDetailsSpace.purpose}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Community Confidence:</span>
                <span className="font-bold text-emerald-700">{activeDetailsSpace.confirmations} peer confirmations</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-blue-50 text-blue-800 text-[11px] leading-relaxed">
              <strong>Anonymous Community Verification:</strong> All vacancy reports are confirmed by fellow students. No individual identities or student IDs are ever publicly shown.
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  handleConfirm(activeDetailsSpace.id);
                  setActiveDetailsSpace(null);
                }}
                className="flex-1 bg-[#2E25D2] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm"
              >
                Confirm I'm Here (+1 Karma)
              </button>
              <button
                onClick={() => setActiveDetailsSpace(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
