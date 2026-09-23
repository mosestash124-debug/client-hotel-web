import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Copy, 
  Check, 
  MessageSquare,
  Armchair
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { ReservationBooking } from '../../types/admin';

interface TableMeta {
  num: number;
  name: string;
  seats: number;
  area: 'kitchen-view' | 'quiet-corner' | 'main-hall';
}

const TABLES: TableMeta[] = [
  { num: 1, name: 'Table 1 · Front Tava Bar', seats: 2, area: 'kitchen-view' },
  { num: 2, name: 'Table 2 · Open Kitchen Observation', seats: 4, area: 'kitchen-view' },
  { num: 3, name: 'Table 3 · Meeting Alcove', seats: 4, area: 'quiet-corner' },
  { num: 4, name: 'Table 4 · Executive Meeting Booth', seats: 6, area: 'quiet-corner' },
  { num: 5, name: 'Table 5 · Central Family Table', seats: 6, area: 'main-hall' },
  { num: 6, name: 'Table 6 · Courtyard View', seats: 4, area: 'main-hall' }
];

export function AdminReservationsTab() {
  const { reservations, updateReservationStatus, addReservation } = useRestaurant();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'seated'>('all');
  const [isWalkinModalOpen, setIsWalkinModalOpen] = useState(false);

  // New Walkin Form State
  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [walkinGuests, setWalkinGuests] = useState(2);
  const [walkinTable, setWalkinTable] = useState(1);
  const [walkinOccasion, setWalkinOccasion] = useState('Walk-in Dining');
  const [walkinNotes, setWalkinNotes] = useState('');

  // Filter reservations
  const filteredReservations = reservations.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  // Calculate table occupancy map
  const activeBookings = reservations.filter(
    (r) => r.status === 'confirmed' || r.status === 'seated'
  );
  const occupiedTableNumbers = new Set(
    activeBookings.map((b) => b.tableNumber)
  );

  const handleCopyWhatsapp = (res: ReservationBooking) => {
    const text = `*Deekei Restaurant Murang'a*\nHello ${res.customerName}, your table booking is *CONFIRMED*!\n\n📅 Date: ${res.date}\n⏰ Time: ${res.time}\n👥 Guests: ${res.guests} people\n🪑 Table: Table ${res.tableNumber}\n📍 Location: Murang'a Town, 75H5+9W (Opposite County Offices)\n📞 Questions: 0700 173251\n\nKaribu Deekei! Fresh chapatis and sizzling pork will be prepared for you.`;
    navigator.clipboard.writeText(text);
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName.trim()) return;

    addReservation({
      customerName: walkinName,
      customerPhone: walkinPhone || '0700 000 000',
      date: new Date().toISOString().split('T')[0],
      time: 'Immediate',
      guests: walkinGuests,
      tableNumber: walkinTable,
      area: TABLES.find((t) => t.num === walkinTable)?.area || 'main-hall',
      occasion: walkinOccasion,
      notes: walkinNotes
    });

    setWalkinName('');
    setWalkinPhone('');
    setWalkinNotes('');
    setIsWalkinModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Floor Plan Visual Grid */}
      <div className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <Armchair className="w-4 h-4 text-amber-400" />
              <span>Dining Floor Map & Table Status</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Live Murang'a restaurant floor (6 Dining & Meeting Zones)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsWalkinModalOpen(true)}
            className="py-1.5 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Seat Walk-in Guest</span>
          </button>
        </div>

        {/* 6 Tables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TABLES.map((t) => {
            const isOccupied = occupiedTableNumbers.has(t.num);
            const booking = activeBookings.find((b) => b.tableNumber === t.num);

            return (
              <div
                key={t.num}
                className={`p-3.5 rounded-xl border transition-all ${
                  isOccupied
                    ? 'bg-amber-500/10 border-amber-500/50 text-stone-200'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono font-bold text-white text-sm">
                    T{t.num}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOccupied ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
                    }`}
                  />
                </div>
                <div className="text-xs font-medium text-stone-300 truncate">
                  {t.name.split('·')[1]?.trim() || t.name}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1 font-mono">
                  <Users className="w-3 h-3" />
                  <span>Max {t.seats} seats</span>
                </div>
                <div className="mt-2 pt-2 border-t border-stone-800 text-[10px]">
                  {isOccupied && booking ? (
                    <span className="text-amber-300 font-medium truncate block">
                      {booking.customerName} ({booking.time})
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-medium">Available</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            All Bookings ({reservations.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Pending ({reservations.filter((r) => r.status === 'pending').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('confirmed')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'confirmed'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Confirmed ({reservations.filter((r) => r.status === 'confirmed').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('seated')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'seated'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Seated ({reservations.filter((r) => r.status === 'seated').length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredReservations.length === 0 ? (
          <div className="bg-stone-900/30 border border-stone-800/80 rounded-2xl p-10 text-center text-stone-400">
            <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-stone-600" />
            <p className="text-xs text-stone-400">No reservations matching this status filter.</p>
          </div>
        ) : (
          filteredReservations.map((res) => (
            <div
              key={res.id}
              className={`bg-stone-900 border rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-md ${
                res.status === 'pending'
                  ? 'border-amber-500/70 bg-amber-950/10'
                  : res.status === 'confirmed'
                  ? 'border-emerald-500/50'
                  : res.status === 'seated'
                  ? 'border-blue-500/50'
                  : 'border-stone-800 opacity-70'
              }`}
            >
              {/* Left Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-sm">
                    {res.id}
                  </span>
                  <span className="text-stone-200 font-bold text-base">
                    {res.customerName}
                  </span>
                  <span className="text-xs text-stone-400">·</span>
                  <a
                    href={`tel:${res.customerPhone}`}
                    className="text-xs font-mono text-stone-300 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{res.customerPhone}</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-stone-500" />
                    <span>{res.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>{res.time}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    <span>{res.guests} Guests</span>
                  </span>
                  <span>·</span>
                  <span className="font-semibold text-stone-200">
                    Table {res.tableNumber} ({res.area})
                  </span>
                  <span>·</span>
                  <span className="text-amber-300/80 italic">{res.occasion}</span>
                </div>

                {res.notes && (
                  <p className="text-xs text-stone-400 bg-stone-950/80 p-2 rounded-lg border border-stone-800/80 mt-1">
                    <span className="text-stone-300 font-semibold">Note:</span> {res.notes}
                  </p>
                )}
              </div>

              {/* Right Action Controls */}
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {/* WhatsApp preview button */}
                <button
                  type="button"
                  onClick={() => handleCopyWhatsapp(res)}
                  className="py-1.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Copy WhatsApp confirmation text"
                >
                  {copiedId === res.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp MSG</span>
                    </>
                  )}
                </button>

                {/* Table Reassign Dropdown */}
                <select
                  value={res.tableNumber}
                  onChange={(e) =>
                    updateReservationStatus(res.id, res.status, Number(e.target.value))
                  }
                  className="bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-amber-500"
                >
                  {TABLES.map((t) => (
                    <option key={t.num} value={t.num}>
                      Table {t.num} ({t.seats} seats)
                    </option>
                  ))}
                </select>

                {/* Status Switchers */}
                {res.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => updateReservationStatus(res.id, 'confirmed')}
                    className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                )}

                {res.status === 'confirmed' && (
                  <button
                    type="button"
                    onClick={() => updateReservationStatus(res.id, 'seated')}
                    className="py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Armchair className="w-3.5 h-3.5" />
                    <span>Seat Guests</span>
                  </button>
                )}

                {res.status === 'seated' && (
                  <button
                    type="button"
                    onClick={() => updateReservationStatus(res.id, 'completed')}
                    className="py-1.5 px-3 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Complete</span>
                  </button>
                )}

                {res.status !== 'cancelled' && res.status !== 'completed' && (
                  <button
                    type="button"
                    onClick={() => updateReservationStatus(res.id, 'cancelled')}
                    className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Cancel Reservation"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Seat Walkin Modal */}
      {isWalkinModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsWalkinModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 text-lg font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-3">Seat Walk-In Guest</h3>
            
            <form onSubmit={handleAddWalkin} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Guest / Contact Name</label>
                <input
                  type="text"
                  required
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  placeholder="e.g. Samuel Maina"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={walkinPhone}
                  onChange={(e) => setWalkinPhone(e.target.value)}
                  placeholder="0700 123 456"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Guest Count</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={walkinGuests}
                    onChange={(e) => setWalkinGuests(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Assign Table</label>
                  <select
                    value={walkinTable}
                    onChange={(e) => setWalkinTable(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                  >
                    {TABLES.map((t) => (
                      <option key={t.num} value={t.num}>
                        Table {t.num} ({t.seats} seats)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Special Request / Notes</label>
                <input
                  type="text"
                  value={walkinNotes}
                  onChange={(e) => setWalkinNotes(e.target.value)}
                  placeholder="e.g. Quiet meeting, quick lunch"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg transition-colors cursor-pointer mt-2"
              >
                Confirm & Seat
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
