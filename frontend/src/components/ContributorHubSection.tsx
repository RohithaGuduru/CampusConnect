import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Landmark, 
  UtensilsCrossed, 
  ShieldAlert, 
  Plus, 
  ShoppingBag, 
  CheckCircle2, 
  Star, 
  Award
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ContributorHubProps {
  profile: StudentProfile;
  onOpenReportModal: () => void;
  onOpenListItemModal: () => void;
  onSubmitClubEvent?: (event: any) => Promise<void>;
}

export const ContributorHubSection: React.FC<ContributorHubProps> = ({
  profile,
  onOpenReportModal,
  onOpenListItemModal,
  onSubmitClubEvent,
}) => {
  const [activeRoleTab, setActiveRoleTab] = useState<'student' | 'club' | 'restaurant' | 'admin'>('student');

  // Club form state
  const [clubTitle, setClubTitle] = useState('');
  const [clubOrganizer, setClubOrganizer] = useState('Google Developer Groups (GDG)');
  const [clubVenue, setClubVenue] = useState('Central Block Auditorium');
  const [clubDate, setClubDate] = useState('Saturday · 10:00 AM');
  const [clubCategory, setClubCategory] = useState('Technical & AI');
  const [clubSuccess, setClubSuccess] = useState(false);

  // Admin moderation queue state
  const [moderationReports, setModerationReports] = useState([
    {
      id: 'mod-1',
      room: 'AB1 — Room 412',
      reportedStatus: 'Available',
      disputeReason: 'Conflicting report: Class in session reported by 2 users',
      reporterTrust: '82/100',
      timeAgo: '14m ago',
      status: 'pending',
    },
    {
      id: 'mod-2',
      room: 'CB — Room 204',
      reportedStatus: 'Reported Available',
      disputeReason: 'Lab door locked for examination set-up',
      reporterTrust: '65/100',
      timeAgo: '28m ago',
      status: 'pending',
    },
  ]);

  const handleResolveReport = (id: string, action: 'approved' | 'dismissed' | 'warning') => {
    setModerationReports(prev => prev.map(item => item.id === id ? { ...item, status: action } : item));
  };

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubTitle.trim()) return;

    if (onSubmitClubEvent) {
      onSubmitClubEvent({
        title: clubTitle,
        organizer: clubOrganizer,
        venue: clubVenue,
        date_time: clubDate,
        category: clubCategory,
      });
    }

    setClubSuccess(true);
    setTimeout(() => {
      setClubSuccess(false);
      setClubTitle('');
    }, 2500);
  };

  return (
    <section id="contributor-hub-section" className="py-14 bg-gradient-to-b from-transparent via-[#F7F8FE] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 2 */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ECEBFE] text-[#372DD8] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ROLE–BASED CAMPUS PORTAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            CampusConnect Contributor Hub
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Whether you are an individual student helper, a registered university club, a campus kitchen partner, or an administrative moderator — here are your dedicated tools.
          </p>

          {/* 4 Role Tabs matching Screenshot 2 */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold">
            <button
              onClick={() => setActiveRoleTab('student')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl transition ${
                activeRoleTab === 'student'
                  ? 'bg-[#2D24CA] text-white shadow-sm shadow-[#2D24CA]/25'
                  : 'bg-[#F0F2FA] text-slate-700 hover:bg-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Hub</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('club')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl transition ${
                activeRoleTab === 'club'
                  ? 'bg-[#2D24CA] text-white shadow-sm shadow-[#2D24CA]/25'
                  : 'bg-[#F0F2FA] text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Verified Club Portal</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('restaurant')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl transition ${
                activeRoleTab === 'restaurant'
                  ? 'bg-[#2D24CA] text-white shadow-sm shadow-[#2D24CA]/25'
                  : 'bg-[#F0F2FA] text-slate-700 hover:bg-slate-200'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Restaurant & Kitchen Portal</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('admin')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl transition ${
                activeRoleTab === 'admin'
                  ? 'bg-[#2D24CA] text-white shadow-sm shadow-[#2D24CA]/25'
                  : 'bg-[#F0F2FA] text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin & Moderation Console</span>
            </button>
          </div>
        </div>

        {/* 1. STUDENT HUB VIEW matching Screenshot 2 */}
        {activeRoleTab === 'student' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Student Profile & Badges matching Screenshot 2 */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Header: VIT Avatar + Name + Trust Score */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#ECEBFE] text-[#2E25D2] font-black text-sm flex items-center justify-center shrink-0 border border-[#D5D3FA]">
                    VIT
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {profile.display_name}
                    </h3>
                    <div className="mt-1">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{profile.trust_score}/100 Trust Score</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rank Status Card matching Screenshot 2 */}
                <div className="bg-[#F3F5FD] rounded-2xl p-4 border border-[#E2E6FA]">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Rank Status:</span>
                    <span className="text-[#2E25D2] font-bold">{profile.rank_title}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200/80 h-2 rounded-full mt-2.5 overflow-hidden">
                    <div 
                      className="bg-[#2E25D2] h-full rounded-full transition-all duration-500"
                      style={{ width: `${profile.progress_percent}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed">
                    {profile.next_milestone}
                  </p>
                </div>

                {/* EARNED BADGES matching Screenshot 2 */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block mb-2">
                    EARNED BADGES
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {profile.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200/60 inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <Award className="w-3.5 h-3.5 text-[#2E25D2]" />
                        <span>{badge}</span>
                      </span>
                    ))}
                    <span className="bg-purple-50 text-[#3E32E8] text-xs font-semibold px-3 py-1 rounded-full border border-purple-200/60">
                      🎯 Accurate Reporter
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: 4 Metrics & Action Buttons matching Screenshot 2 */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* 4 Metric cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-[#F6F8FE] border border-[#E3E8FC] rounded-2xl p-4">
                    <span className="text-3xl font-black text-[#2E25D2] block">
                      {profile.rooms_reported}
                    </span>
                    <span className="text-xs text-slate-500 font-medium mt-1 block">
                      Rooms Reported
                    </span>
                  </div>

                  <div className="bg-[#F6F8FE] border border-[#E3E8FC] rounded-2xl p-4">
                    <span className="text-3xl font-black text-[#2E25D2] block">
                      {profile.rooms_verified}
                    </span>
                    <span className="text-xs text-slate-500 font-medium mt-1 block">
                      Rooms Verified
                    </span>
                  </div>

                  <div className="bg-[#F6F8FE] border border-[#E3E8FC] rounded-2xl p-4">
                    <span className="text-3xl font-black text-emerald-600 block">
                      {profile.accurate_reports}
                    </span>
                    <span className="text-xs text-slate-500 font-medium mt-1 block">
                      Accurate Reports
                    </span>
                  </div>

                  <div className="bg-[#F6F8FE] border border-[#E3E8FC] rounded-2xl p-4">
                    <span className="text-3xl font-black text-slate-800 block">
                      {profile.disputes}
                    </span>
                    <span className="text-xs text-slate-500 font-medium mt-1 block">
                      Disputes / Flags
                    </span>
                  </div>
                </div>

                {/* Actions row matching Screenshot 2 */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={onOpenReportModal}
                    className="flex-1 bg-[#2E25D2] hover:bg-[#251EB3] text-white text-xs font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-[#2E25D2]/25 transition active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Report Empty Room Now</span>
                  </button>

                  <button
                    onClick={onOpenListItemModal}
                    className="flex-1 bg-[#ECEBFE] hover:bg-[#DDDDFC] text-[#2E25D2] text-xs font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>List Pre-Owned Item</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 2. VERIFIED CLUB PORTAL VIEW */}
        {activeRoleTab === 'club' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Publish Campus Event / Workshop
                  </h3>
                  <p className="text-xs text-slate-500">
                    Verified university clubs can publish approved activities to the campus live stream.
                  </p>
                </div>
              </div>

              {clubSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-2 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-slate-900">Event Submitted for Listing!</h4>
                  <p className="text-xs text-slate-600">
                    Your club event has been submitted and queued for display in the Events Today category.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleClubSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flutter Forward Hackathon 2026"
                      value={clubTitle}
                      onChange={(e) => setClubTitle(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Club / Chapter *
                      </label>
                      <input
                        type="text"
                        value={clubOrganizer}
                        onChange={(e) => setClubOrganizer(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={clubCategory}
                        onChange={(e) => setClubCategory(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                      >
                        <option value="Technical & AI">Technical & AI</option>
                        <option value="Competitive Coding">Competitive Coding</option>
                        <option value="Robotics & Hardware">Robotics & Hardware</option>
                        <option value="Cultural & Arts">Cultural & Arts</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Campus Venue *
                      </label>
                      <input
                        type="text"
                        value={clubVenue}
                        onChange={(e) => setClubVenue(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Date & Time *
                      </label>
                      <input
                        type="text"
                        value={clubDate}
                        onChange={(e) => setClubDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2E25D2] hover:bg-[#251EB3] text-white font-bold py-3 rounded-xl shadow-sm transition active:scale-95"
                  >
                    Submit Club Listing for Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 3. RESTAURANT & KITCHEN PORTAL VIEW */}
        {activeRoleTab === 'restaurant' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Campus Delivery Partner Management
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update hostel delivery timings, menus, and student promotional discount combos.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Current Partner Outlet:</span>
                  <span className="font-bold text-[#2E25D2]">Sri Krishna Kitchen</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Gate 2 Delivery Runner:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Night Mess Timings:</span>
                  <span className="font-medium text-slate-800">7:00 PM – 1:30 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Active Student Promo:</span>
                  <span className="font-semibold text-purple-700">15% off Biryani & Paneer Bowls</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-xs">
                <strong>Food Quality Standard:</strong> All partner listings are monitored by student feedback. High hygiene ratings (4.5+) are required for featured positioning.
              </div>
            </div>
          </div>
        )}

        {/* 4. ADMIN & MODERATION CONSOLE VIEW */}
        {activeRoleTab === 'admin' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    CampusConnect Moderation Queue
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review disputed room reports, false vacancy claims, and progressive contributor penalties.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
                    {moderationReports.filter(r => r.status === 'pending').length} Disputed Reports
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    Trust Index: 98.4%
                  </span>
                </div>
              </div>

              {/* Review Queue Items */}
              <div className="space-y-3">
                {moderationReports.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{item.room}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                          {item.reportedStatus}
                        </span>
                        <span className="text-slate-400 text-[11px]">{item.timeAgo}</span>
                      </div>
                      <p className="text-rose-700 font-medium mt-1">
                        ⚠️ {item.disputeReason}
                      </p>
                      <p className="text-slate-400 text-[10px] mt-0.5">
                        Reporter Trust Score: {item.reporterTrust}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleResolveReport(item.id, 'approved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                          >
                            Approve Room
                          </button>
                          <button
                            onClick={() => handleResolveReport(item.id, 'dismissed')}
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg"
                          >
                            Dismiss
                          </button>
                          <button
                            onClick={() => handleResolveReport(item.id, 'warning')}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold rounded-lg"
                          >
                            Issue Warning
                          </button>
                        </>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                          Action: {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-100 rounded-xl text-slate-600 text-[11px]">
                <strong>Progressive Moderation Policy:</strong> Users with repeat misleading reports receive temporary 24h reporting restrictions. Zero permanent bans are issued without manual moderation review.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
