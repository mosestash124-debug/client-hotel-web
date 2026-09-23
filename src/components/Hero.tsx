import { Star, Clock, MapPin, Sparkles, UtensilsCrossed, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_MEDIA } from '../data/restaurantData';

interface HeroProps {
  onOpenMenu: () => void;
  onOpenReservation: () => void;
  onOpenPrompt: () => void;
  onOpenLiveKitchen: () => void;
  onOpenKitchenTheatre?: () => void;
}

export function Hero({
  onOpenMenu,
  onOpenReservation,
  onOpenPrompt,
  onOpenLiveKitchen,
  onOpenKitchenTheatre
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80 bg-[#FAF8F5]">
      {/* Background warm subtle ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Dining Story & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600">
              <span className="flex items-center gap-1 text-amber-900 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                {RESTAURANT_INFO.town}, Kenya
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1 font-semibold text-stone-900">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {RESTAURANT_INFO.rating.toFixed(1)} Rating ({RESTAURANT_INFO.reviewCount} Google Reviews)
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{RESTAURANT_INFO.priceRange}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-emerald-800 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {RESTAURANT_INFO.hoursText}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12] text-balance">
              Murang'a's Heart of Fresh Open-Kitchen Kenyan Comfort.
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed max-w-2xl">
              Welcome to Deekei Restaurant in Murang'a Town. Experience genuine culinary theatre where 
              flaky golden chapatis are hand-rolled before your eyes, savory beef stews simmer to perfection, 
              and tender pork is served with caramelized sweet plantains. A relaxed town sanctuary for great meals and meaningful conversations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenMenu}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explore Online Menu & Order</span>
              </button>

              <button
                type="button"
                onClick={onOpenReservation}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-colors cursor-pointer"
              >
                <span>Reserve Table on Floor Plan</span>
                <ArrowRight className="w-4 h-4 text-stone-500" />
              </button>

              {/* Open Kitchen Live Button with live pulse dot */}
              <button
                type="button"
                onClick={onOpenLiveKitchen}
                className="group flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-xl transition-all cursor-pointer shadow-xs"
                title="Click to view live open-kitchen stations and range cam"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                </span>
                <Flame className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                <span>Open Kitchen Live</span>
              </button>
            </div>

            {/* Prompt Kit Feature Banner */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Master AI & Marketing Brand Prompt Ready
                  </h4>
                  <p className="text-xs text-amber-950/80 mt-0.5">
                    Interactive prompt suite crafted for Deekei Restaurant's brand voice, social media, and open-kitchen storytelling.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenPrompt}
                className="shrink-0 text-xs font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-4 cursor-pointer"
              >
                Open Prompt Suite
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-700 shrink-0" />
                <span>100% Fresh Open Kitchen</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Verified 4.0★ Google Reviews</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="font-mono font-bold text-amber-900">Ksh 1–500</span>
                <span>Fair, Honest Local Value</span>
              </div>
            </div>

          </div>

          {/* Right Column: Real Culinary Photography Spotlight */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
              
              {/* Real Feast Photography Banner with Clickable Live Badge */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-stone-100 group">
                <img
                  src={RESTAURANT_MEDIA.heroSpread}
                  alt="Deekei Restaurant Kenyan Culinary Feast"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={onOpenLiveKitchen}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-amber-300 block">
                      Farm-to-Table Freshness
                    </span>
                    <h3 className="text-sm font-serif font-bold">
                      The Authentic Deekei Feast
                    </h3>
                  </div>

                  {/* Interactive Button for Open Kitchen Live */}
                  <button
                    type="button"
                    onClick={onOpenLiveKitchen}
                    className="text-[11px] font-mono font-semibold bg-emerald-800/95 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg border border-emerald-400/40 flex items-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-105"
                    title="Click to watch Open Kitchen Live Cam & cooking stations"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open Kitchen Live</span>
                  </button>
                </div>
              </div>

              {/* Real Dish Showcase Rows */}
              <div className="space-y-2.5">
                
                {/* Chapati Beef */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/70 hover:border-amber-300 transition-colors">
                  <img
                    src={RESTAURANT_MEDIA.chapatiBeef}
                    alt="Chapati Beef Stew"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900">Chapati Beef Stew</h4>
                      <span className="font-mono text-xs font-bold text-amber-900">Ksh 250</span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      Flaky layered chapatis & slow-simmered tender beef stew.
                    </p>
                  </div>
                </div>

                {/* Pork with Sweet Plantains */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/70 hover:border-amber-300 transition-colors">
                  <img
                    src={RESTAURANT_MEDIA.porkPlantains}
                    alt="Pork with Sweet Plantains"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900">Pork with Sweet Plantains</h4>
                      <span className="font-mono text-xs font-bold text-amber-900">Ksh 380</span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      Ginger-seared pork with caramelized golden matoke.
                    </p>
                  </div>
                </div>

                {/* Crispy Samosas */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/70 hover:border-amber-300 transition-colors">
                  <img
                    src={RESTAURANT_MEDIA.crispySamosas}
                    alt="Crispy Beef Samosas"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900">Crispy Beef Samosas (Pair)</h4>
                      <span className="font-mono text-xs font-bold text-amber-900">Ksh 100</span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      Praised in 12+ Google reviews as Murang'a's crunchiest.
                    </p>
                  </div>
                </div>

              </div>

              {/* Embedded Local Guide Quote */}
              <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs space-y-1">
                <div className="flex items-center gap-1 text-amber-900 font-semibold text-[11px]">
                  <Star className="w-3 h-3 fill-amber-600 text-amber-600" />
                  <span>Google Local Guide Verified</span>
                </div>
                <p className="italic text-stone-700 text-[11px] leading-relaxed">
                  "The services are great, especially with the open kitchen where you get to see and observe all that's being prepared and cooked."
                </p>
                <span className="text-[10px] text-stone-500 block">
                  — Dickson G. Wachira (142 reviews · 1,106 photos)
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
