import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2, Phone, User, MessageSquare, Armchair } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: number;
  area: 'kitchen-view' | 'quiet-corner' | 'main-hall';
  occasion: string;
  notes: string;
}

interface TableOption {
  num: number;
  area: 'kitchen-view' | 'quiet-corner' | 'main-hall';
  seats: number;
  name: string;
  perk: string;
}

export function ReservationSection() {
  const todayStr = new Date().toISOString().split('T')[0];

  const tableLayout: TableOption[] = [
    { num: 1, area: 'kitchen-view', seats: 2, name: 'Table 1 · Front Tava Bar', perk: 'Front-row view of chefs rolling fresh chapatis' },
    { num: 2, area: 'kitchen-view', seats: 4, name: 'Table 2 · Open Kitchen Observation', perk: 'Prime spot to observe all dishes cooked fresh' },
    { num: 3, area: 'quiet-corner', seats: 4, name: 'Table 3 · Meeting Alcove', perk: 'Quiet, secluded, natural lighting for discussions' },
    { num: 4, area: 'quiet-corner', seats: 6, name: 'Table 4 · Executive Meeting Booth', perk: 'Extra table width for laptops, notebooks & documents' },
    { num: 5, area: 'main-hall', seats: 6, name: 'Table 5 · Central Family Table', perk: 'Spacious wooden table for groups and hearty lunches' },
    { num: 6, area: 'main-hall', seats: 4, name: 'Table 6 · Courtyard View', perk: 'Relaxed town ambience with fresh airflow' }
  ];

  const [reservation, setReservation] = useState<ReservationData>({
    name: '',
    phone: '',
    date: todayStr,
    time: '12:30 PM',
    guests: 2,
    tableNumber: 3,
    area: 'quiet-corner',
    occasion: 'Business Meeting',
    notes: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    data: ReservationData;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { time: '8:00 AM', label: 'Breakfast & Masala Chai' },
    { time: '10:00 AM', label: 'Mid-Morning Catch-up' },
    { time: '12:30 PM', label: 'Lunch Rush (Open Kitchen Active)' },
    { time: '1:30 PM', label: 'Afternoon Lunch' },
    { time: '3:30 PM', label: 'Tea & Chapatis' },
    { time: '5:30 PM', label: 'Early Evening' },
    { time: '7:00 PM', label: 'Dinner & Pork Platters' }
  ];

  const handleSelectTable = (tbl: TableOption) => {
    setReservation((prev) => ({
      ...prev,
      tableNumber: tbl.num,
      area: tbl.area,
      guests: Math.min(prev.guests, tbl.seats) || tbl.seats
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation.name.trim() || !reservation.phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `DK-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedBooking({
        id: generatedId,
        data: { ...reservation }
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setReservation({
      name: '',
      phone: '',
      date: todayStr,
      time: '12:30 PM',
      guests: 2,
      tableNumber: 3,
      area: 'quiet-corner',
      occasion: 'Casual Meal',
      notes: ''
    });
  };

  const currentTable = tableLayout.find((t) => t.num === reservation.tableNumber) || tableLayout[2];

  return (
    <section id="reservation" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
            Interactive Table Reservations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Reserve Your Table at Deekei
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Planning a business meeting in town or enjoying a hearty lunch with friends?
            Select your preferred table on our floor plan and guarantee unhurried seating.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-mono font-semibold text-emerald-800">
                Table Reserved & Confirmed
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Karibu, {confirmedBooking.data.name}!
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                Booking Reference: <strong className="text-stone-900">{confirmedBooking.id}</strong>
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl text-left space-y-2.5 text-xs text-stone-700">
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Reserved Table:</span>
                <span className="font-bold text-stone-900">
                  Table {confirmedBooking.data.tableNumber} ({confirmedBooking.data.area.replace('-', ' ')})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Date & Time:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedBooking.data.date} at {confirmedBooking.data.time}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Party Size:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedBooking.data.guests} {confirmedBooking.data.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Contact Number:</span>
                <span className="font-mono font-semibold text-stone-900">
                  {confirmedBooking.data.phone}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Location:</span>
                <span className="font-medium text-stone-900">
                  Deekei Restaurant, Murang'a Town (Plus Code: 75H5+9W)
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              We hold tables for 15 minutes past reserved time. Need directions or adjustments? Call our host directly at <strong className="font-mono text-stone-800">0700 173251</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
              <a
                href="#menu"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors"
              >
                Browse Menu to Pre-select Dishes
              </a>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form & Visual Floor Plan */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Left: Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-700" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={reservation.name}
                    onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                    placeholder="e.g. Dickson Wachira"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Kenyan Phone / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={reservation.phone}
                    onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                    placeholder="0700 000 000"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-amber-700 transition-colors"
                  />
                </div>

              </div>

              {/* Date & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
                    <span>Reservation Date</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={reservation.date}
                    onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                    <span>Number of Guests</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setReservation({ ...reservation, guests: num })}
                        className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg border transition-colors cursor-pointer ${
                          reservation.guests === num
                            ? 'bg-amber-800 text-white border-amber-800'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {num === 8 ? '8+' : num}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Select Time Window</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = reservation.time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setReservation({ ...reservation, time: slot.time })}
                        className={`p-2 text-left rounded-lg border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50 border-amber-700 text-amber-900 ring-1 ring-amber-700'
                            : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold block">{slot.time}</span>
                        <span className="text-[10px] text-stone-500 block truncate">{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>Occasion or Special Requests (Optional)</span>
                </label>
                <input
                  type="text"
                  value={reservation.notes}
                  onChange={(e) => setReservation({ ...reservation, notes: e.target.value })}
                  placeholder="e.g. Business lunch with documents / Birthday celebration"
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-xl transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Table {reservation.tableNumber}...</span>
                ) : (
                  <>
                    <CalendarIcon className="w-4 h-4" />
                    <span>Confirm Reservation for Table {reservation.tableNumber}</span>
                  </>
                )}
              </button>

            </form>

            {/* Right: Interactive Visual Floor Plan */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-5">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                  <Armchair className="w-4 h-4 text-amber-700" />
                  <span>Interactive Floor Plan</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Select Your Preferred Table
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Click any table below to reserve that exact location.
                </p>
              </div>

              {/* Floor Plan Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tableLayout.map((tbl) => {
                  const isSelected = reservation.tableNumber === tbl.num;
                  return (
                    <button
                      key={tbl.num}
                      type="button"
                      onClick={() => handleSelectTable(tbl)}
                      className={`p-3.5 text-left rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-800 text-white border-amber-800 shadow-md ring-2 ring-amber-700/50'
                          : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className={`text-xs font-bold font-mono ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                          Table {tbl.num}
                        </span>
                        <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-amber-900/80 text-white' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {tbl.seats} Seats
                        </span>
                      </div>

                      <span className={`text-xs font-bold block ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                        {tbl.name.split('·')[1] || tbl.name}
                      </span>
                      <p className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                        {tbl.perk}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Table Perks */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-1.5">
                <span className="font-bold text-amber-950 block">
                  Current Selection: {currentTable.name}
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {currentTable.perk}
                </p>
                <div className="text-[11px] text-stone-500 pt-1 border-t border-amber-200/60 flex items-center justify-between">
                  <span>Capacity: Up to {currentTable.seats} persons</span>
                  <span className="text-amber-900 font-semibold">Ready for {reservation.time}</span>
                </div>
              </div>

              {/* Host Phone & Peace of mind */}
              <div className="text-xs text-stone-500 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                  <Phone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Direct Host Line: <strong className="font-mono text-stone-900">{RESTAURANT_INFO.phone}</strong></span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Murang'a 4 Deekei · Open daily until 9:00 PM
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
