import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Star, 
  ExternalLink, 
  MessageSquare, 
  BookOpen, 
  Percent, 
  Zap, 
  Terminal, 
  Palette, 
  X, 
  Phone, 
  CheckCircle2 
} from 'lucide-react';
import { EventItem, FoodSpotItem, MarketplaceItem } from '../types';

interface LiveHappeningsProps {
  events: EventItem[];
  foodSpots: FoodSpotItem[];
  marketplace: MarketplaceItem[];
  onOpenReportModal?: () => void;
}

export const LiveHappeningsSection: React.FC<LiveHappeningsProps> = ({
  events,
  foodSpots,
  marketplace,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'food' | 'drops'>('all');
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);
  const [activeMenuSpot, setActiveMenuSpot] = useState<FoodSpotItem | null>(null);
  const [reserveItem, setReserveItem] = useState<MarketplaceItem | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSent, setChatSent] = useState(false);

  const mainEvent = events[0];
  const mainFood = foodSpots[0];
  const mainMarket = marketplace[0];

  return (
    <section id="happenings-section" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Screenshot 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#4F46E5] uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
              <span>INSTANT REAL–TIME STREAM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What's Happening Right Now?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified crowd reports, ongoing hackathons, and delivery runs across Amaravati campus.
            </p>
          </div>

          {/* Category Tabs matching Screenshot 3 */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start md:self-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'all'
                  ? 'bg-[#2D24CA] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Live
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'events'
                  ? 'bg-[#2D24CA] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Events Today
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'food'
                  ? 'bg-[#2D24CA] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Food Spots
            </button>
            <button
              onClick={() => setActiveTab('drops')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'drops'
                  ? 'bg-[#2D24CA] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Drops
            </button>
          </div>
        </div>

        {/* 3 Column Grid matching Screenshot 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CARD 1: Event Card matching Screenshot 3 */}
          {(activeTab === 'all' || activeTab === 'events') && mainEvent && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="bg-[#ECEBFE] text-[#3328D8] text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#3328D8]" />
                    <span>{mainEvent.date_time}</span>
                  </span>
                  <span className="text-xs font-bold text-rose-600">
                    {mainEvent.seats_left} seats left
                  </span>
                </div>

                {/* Poster graphic placeholder matching screenshot */}
                <div className="bg-[#E9ECFB] rounded-xl py-9 px-4 my-4 flex flex-col items-center justify-center text-center">
                  <Terminal className="w-7 h-7 text-[#2E25D2] mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">
                    {mainEvent.stage_info}
                  </span>
                  <span className="bg-slate-800 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full mt-2">
                    {mainEvent.badge_time}
                  </span>
                </div>

                {/* Event Name & Venue */}
                <h3 className="font-extrabold text-base text-slate-900">
                  {mainEvent.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{mainEvent.venue}</span>
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {mainEvent.tags.map((tg, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5">
                <button
                  onClick={() => setRegisteredEvent(mainEvent.title)}
                  className="w-full bg-[#2E25D2] hover:bg-[#251EB3] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-[#2E25D2]/25 transition active:scale-95"
                >
                  <span>Register Now (Free ₹0)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* CARD 2: Food Discovery Card matching Screenshot 3 */}
          {(activeTab === 'all' || activeTab === 'food') && mainFood && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold px-2 py-0.5 rounded">
                      FEATURED PARTNER
                    </span>
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded inline-flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{mainFood.rating}</span>
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">
                    {mainFood.open_till}
                  </span>
                </div>

                {/* Title & subtitle */}
                <h3 className="font-extrabold text-base text-slate-900 mt-4">
                  {mainFood.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {mainFood.location} · {mainFood.delivery_info}
                </p>

                {/* Rating Specs Grid matching Screenshot 3 */}
                <div className="bg-[#F4F5FB] rounded-xl p-3 my-4 grid grid-cols-4 text-center divide-x divide-slate-200/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Taste</span>
                    <span className="font-bold text-slate-800">{mainFood.taste_rating}/5</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Hygiene</span>
                    <span className="font-bold text-slate-800">{mainFood.hygiene_rating}/5</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Speed</span>
                    <span className="font-bold text-amber-600 flex items-center justify-center gap-0.5">
                      <Zap className="w-3 h-3 fill-amber-500" />
                      <span>{mainFood.speed_mins}m</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Price</span>
                    <span className="font-bold text-[#2E25D2]">{mainFood.price_tier}</span>
                  </div>
                </div>

                {/* Student Combo Banner matching Screenshot 3 */}
                <div className="bg-[#EBE9FE] text-[#4F46E5] text-xs font-medium p-2.5 rounded-xl flex items-center gap-2">
                  <Percent className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{mainFood.student_combo}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5">
                <button
                  onClick={() => setActiveMenuSpot(mainFood)}
                  className="w-full bg-[#2E25D2] hover:bg-[#251EB3] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-[#2E25D2]/25 transition active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Menu & Contact</span>
                </button>
              </div>
            </div>
          )}

          {/* CARD 3: Student Marketplace Card matching Screenshot 3 */}
          {(activeTab === 'all' || activeTab === 'drops') && mainMarket && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                    {mainMarket.tag_label}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    {mainMarket.status}
                  </span>
                </div>

                {/* Product Box matching Screenshot 3 */}
                <div className="bg-[#E9ECFB] rounded-xl py-9 px-4 my-4 flex flex-col items-center justify-center text-center relative">
                  <span className="absolute top-3 right-3 bg-white text-[#2E25D2] font-black text-xs px-2.5 py-1 rounded-lg shadow-sm border border-slate-100">
                    ₹{mainMarket.price}
                  </span>
                  <Palette className="w-7 h-7 text-[#2E25D2] mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">
                    Botanical Soy Candles (Set of 2)
                  </span>
                </div>

                {/* Product Title & Info */}
                <h3 className="font-extrabold text-base text-slate-900">
                  {mainMarket.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {mainMarket.item_subtitle}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{mainMarket.pickup_location}</span>
                </p>
              </div>

              {/* Action Button matching Screenshot 3 */}
              <div className="pt-5">
                <button
                  onClick={() => {
                    setReserveItem(mainMarket);
                    setChatSent(false);
                    setChatMessage('');
                  }}
                  className="w-full bg-[#ECEBFE] hover:bg-[#DDDDFC] text-[#2E25D2] text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat & Reserve Listing</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Registration Modal */}
      {registeredEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Registration Confirmed!</h3>
            <p className="text-xs text-slate-600">
              You are reserved for <strong>{registeredEvent}</strong>. A confirmation slip was prepared for Sarvepalli Radhakrishnan Hall entry.
            </p>
            <button
              onClick={() => setRegisteredEvent(null)}
              className="w-full bg-[#2E25D2] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Menu & Contact Modal */}
      {activeMenuSpot && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setActiveMenuSpot(null)}
              className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                DELIVERY PARTNER
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                {activeMenuSpot.name}
              </h3>
              <p className="text-xs text-slate-500">{activeMenuSpot.location} · {activeMenuSpot.delivery_info}</p>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-100 py-3 my-3">
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-800">Special Veg Dum Biryani</span>
                <span className="font-bold text-[#2E25D2]">₹140</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-800">Paneer Butter Masala Bowl</span>
                <span className="font-bold text-[#2E25D2]">₹130</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-800">Ghee Podi Dosa (2 pcs)</span>
                <span className="font-bold text-[#2E25D2]">₹90</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-800">South Indian Filter Coffee</span>
                <span className="font-bold text-[#2E25D2]">₹35</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 mb-4">
              <strong>Hostel Delivery Gate 2:</strong> Deliveries dispatched every 20 minutes until {activeMenuSpot.open_till}.
            </div>

            <button
              onClick={() => setActiveMenuSpot(null)}
              className="w-full bg-[#2E25D2] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Delivery Hotline (Gate 2 Runner)</span>
            </button>
          </div>
        </div>
      )}

      {/* Chat & Reserve Modal */}
      {reserveItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setReserveItem(null)}
              className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-slate-900">
              Reserve: {reserveItem.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Price: <strong className="text-emerald-700">₹{reserveItem.price}</strong> · {reserveItem.pickup_location}
            </p>

            {chatSent ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">Message Sent to Seller!</h4>
                <p className="text-xs text-slate-500">
                  Seller has received your inquiry. Check your hostel drop point notification when confirmed.
                </p>
                <button
                  onClick={() => setReserveItem(null)}
                  className="mt-3 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <textarea
                  rows={3}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Hey, is this still available? I can meet at Ladies Hostel 2 drop point today around 5 PM."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                />
                <button
                  onClick={() => setChatSent(true)}
                  className="w-full bg-[#2E25D2] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm"
                >
                  Send Peer Message
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
