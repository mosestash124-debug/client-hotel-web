import { useState } from 'react';
import { Clock, MapPin, Phone, Copy, Check, Eye, Coffee, Car } from 'lucide-react';
import { POPULAR_TIMES, RESTAURANT_INFO, RESTAURANT_MEDIA } from '../data/restaurantData';

export function StoryAndHours() {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [activeHourIndex, setActiveHourIndex] = useState(2); // Default to 12 PM (peak)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  return (
    <section id="story" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
            Culinary Transparency & Town Sanctuary
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            The Open Kitchen & Murang'a Town Life
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Deekei was founded on a simple Kenyan truth: the best meals are cooked right in front of you, with uncompromised freshness and time to enjoy them.
          </p>
        </div>

        {/* 2-Column Story: The Open Kitchen + Meeting Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 overflow-hidden">
            <div className="rounded-2xl overflow-hidden aspect-video bg-stone-100 relative group">
              <img
                src={RESTAURANT_MEDIA.openKitchenChef}
                alt="Chef at Deekei Restaurant Open Kitchen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>Live Open Kitchen Range in Murang'a Town</span>
              </div>
            </div>

            <h3 className="text-xl font-serif font-bold text-stone-900">
              The Transparent Open Kitchen Theatre
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Unlike ordinary eateries that hide their prep behind closed doors, Deekei features a completely visible open kitchen. As verified by Local Guide Dickson Wachira:
            </p>
            <blockquote className="p-3.5 bg-stone-50 rounded-xl border-l-2 border-amber-700 text-xs italic text-stone-700">
              "The services at the hotel are great, especially with the open kitchen where you get to see and observe all that's being prepared and cooked."
            </blockquote>
            <p className="text-xs text-stone-500">
              You see the dough kneaded, the chapatis flipped on the hot tava griddle, and the fresh stews seasoned to order.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-7 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              The Unhurried Meeting Place
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              In a busy county town, Deekei is designed as a peaceful oasis. We don't rush you out after eating. As Local Guide Unique Angel observed:
            </p>
            <blockquote className="p-3.5 bg-stone-50 rounded-xl border-l-2 border-orange-700 text-xs italic text-stone-700">
              "If you have a meeting, this is the place. The meal is nice and fresh. It is the place to relax."
            </blockquote>
            <p className="text-xs text-stone-500">
              Whether meeting colleagues, hosting family, or reviewing documents over masala chai, our tables give you room to breathe.
            </p>
          </div>

        </div>

        {/* Popular Times & Operating Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Popular Times Chart from Google Maps */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                  Google Maps Traffic Insight
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                  Popular Times · Wednesdays & Weekdays
                </h3>
              </div>
              <span className="text-xs font-medium text-stone-500">
                Peak: 12 PM – 2 PM
              </span>
            </div>

            {/* Visual Bar Graph */}
            <div className="space-y-4">
              <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-stone-100">
                {POPULAR_TIMES.map((slot, index) => {
                  const isSelected = activeHourIndex === index;
                  return (
                    <button
                      key={slot.label}
                      type="button"
                      onClick={() => setActiveHourIndex(index)}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer focus:outline-none"
                    >
                      {/* Bar */}
                      <div
                        className={`w-full max-w-[42px] rounded-t-md transition-all duration-300 ${
                          isSelected
                            ? 'bg-amber-800'
                            : 'bg-stone-200 hover:bg-stone-300'
                        }`}
                        style={{ height: `${slot.busy}%` }}
                      />
                      {/* Label */}
                      <span
                        className={`mt-2 text-xs font-mono ${
                          isSelected ? 'font-bold text-amber-900' : 'text-stone-500'
                        }`}
                      >
                        {slot.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail on selected hour */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-stone-900 font-semibold block">
                    {POPULAR_TIMES[activeHourIndex].hour} ({POPULAR_TIMES[activeHourIndex].busy}% capacity)
                  </strong>
                  <span className="text-stone-600 block mt-0.5">
                    {POPULAR_TIMES[activeHourIndex].note}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-1">
                <span>Tip: Arrive by 11:30 AM or after 2:30 PM for instant seating and quickest table service.</span>
              </div>
            </div>

          </div>

          {/* Right: Location, Plus Code, Parking Advice */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Visit Us in Person
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Location & Navigation
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-stone-700">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Town Address:</strong>
                  <span>{RESTAURANT_INFO.address}</span>
                </div>
              </div>

              {/* Plus Code */}
              <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px]">Google Plus Code</span>
                  <span className="text-stone-900 font-bold">{RESTAURANT_INFO.plusCode}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans font-semibold text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  {copiedPlusCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-stone-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Phone Inquiries:</strong>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-mono text-amber-900 hover:underline">
                    {RESTAURANT_INFO.formattedPhone} ({RESTAURANT_INFO.phone})
                  </a>
                </div>
              </div>

              {/* Parking Note */}
              <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
                <Car className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-[11px] text-stone-600 leading-relaxed">
                  <strong className="text-stone-900 block font-semibold">Town Parking Tip:</strong>
                  Street parking in Murang'a Town can be competitive during peak 12:00–1:30 PM lunch hours. Off-street pedestrian access is seamless.
                </div>
              </div>

              {/* Open Hours */}
              <div className="flex items-start gap-3 pt-2 border-t border-stone-100">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">Daily Operating Hours:</strong>
                  <span>Monday – Sunday: {RESTAURANT_INFO.openingTime} – {RESTAURANT_INFO.closingTime}</span>
                </div>
              </div>

            </div>

            {/* Direct Google Maps Action */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT_INFO.name + ' ' + RESTAURANT_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors block"
            >
              Open in Google Maps App
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
