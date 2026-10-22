import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { SpaceReportPayload } from '../types';

interface ReportSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: SpaceReportPayload) => Promise<void>;
}

export const ReportSpaceModal: React.FC<ReportSpaceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [block, setBlock] = useState('AB2');
  const [floor, setFloor] = useState('Floor 3');
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState(40);
  const [acType, setAcType] = useState('AC');
  const [wifiQuality, setWifiQuality] = useState('Good Wi-Fi');
  const [purpose, setPurpose] = useState('Study / Project');
  const [availableFrom, setAvailableFrom] = useState('Now');
  const [availableUntil, setAvailableUntil] = useState('4:30 PM');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber.trim()) {
      setError('Please provide a room number (e.g. Room 304 or CB-201).');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        block,
        floor,
        room_number: roomNumber.trim(),
        capacity: Number(capacity),
        ac_type: acType,
        wifi_quality: wifiQuality,
        purpose,
        available_from: availableFrom,
        available_until: availableUntil,
        notes: notes.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset
        setRoomNumber('');
        setNotes('');
      }, 1400);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit room report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#ECEBFE] text-[#2E25D2] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Report Empty Space
            </h2>
            <p className="text-xs text-slate-500">
              Contribute to peer vacancy reports across AB1, AB2 & CB
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Room Reported!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your contribution is now live on the campus directory. You earned +10 Karma points!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            {/* Block & Floor */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Academic Block *
                </label>
                <select
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                >
                  <option value="AB1">Academic Block 1 (AB1)</option>
                  <option value="AB2">Academic Block 2 (AB2)</option>
                  <option value="CB">Central Block (CB)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Floor *
                </label>
                <select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                >
                  <option value="Floor 1">Floor 1</option>
                  <option value="Floor 2">Floor 2</option>
                  <option value="Floor 3">Floor 3</option>
                  <option value="Floor 4">Floor 4</option>
                  <option value="Ground Floor">Ground Floor</option>
                </select>
              </div>
            </div>

            {/* Room number & capacity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Room Identifier *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Room 304 or Lab 201"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                />
              </div>
            </div>

            {/* AC & WiFi */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cooling / AC
                </label>
                <select
                  value={acType}
                  onChange={(e) => setAcType(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                >
                  <option value="AC">AC</option>
                  <option value="Central AC">Central AC</option>
                  <option value="High Cap AC">High Cap AC</option>
                  <option value="Non-AC / Fans">Non-AC / Fans</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Wi-Fi Quality
                </label>
                <select
                  value={wifiQuality}
                  onChange={(e) => setWifiQuality(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                >
                  <option value="Good Wi-Fi">Good Wi-Fi</option>
                  <option value="Excellent Wi-Fi">Excellent Wi-Fi</option>
                  <option value="Gigabit LAN">Gigabit LAN</option>
                  <option value="Average Wi-Fi">Average Wi-Fi</option>
                </select>
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Best Suitable Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
              >
                <option value="Study / Project">Study / Project</option>
                <option value="Group Study">Group Study</option>
                <option value="Project / Coding">Project / Coding</option>
                <option value="Meeting / Workshop">Meeting / Workshop</option>
                <option value="Relax / Reading">Relax / Reading</option>
                <option value="Short Study">Short Study</option>
              </select>
            </div>

            {/* Available From & Until */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Available From
                </label>
                <input
                  type="text"
                  placeholder="e.g. Now or 2:00 PM"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Available Until
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5:00 PM"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
                />
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Optional Notes (Projector, Sockets, etc.)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Whiteboard markers present, quiet corner, AC working well..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#2E25D2] focus:outline-none"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2E25D2] hover:bg-[#251EB3] disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-[#2E25D2]/25 transition active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Vacant Space Report (+10 Karma)'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
