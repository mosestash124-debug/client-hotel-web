import { useState, useEffect } from 'react';
import { Tag, Sparkles, Clock, Check, Plus, X, ChevronRight, Percent, Calendar, Flame } from 'lucide-react';
import { MenuItem, RESTAURANT_MEDIA } from '../data/restaurantData';

export interface DealOffer {
  id: string;
  dayName: string;
  badge: string;
  title: string;
  tagline: string;
  originalPrice: number;
  offerPrice: number;
  savings: number;
  imageSrc: string;
  description: string;
  includes: string[];
  promoCode: string;
  expiresText: string;
}

export const OFFER_DAYS: DealOffer[] = [
  {
    id: 'offer-wednesday-chapo',
    dayName: 'Wednesday Special',
    badge: 'Wednesday Chapo Rush',
    title: 'Open Kitchen Chapo & Beef Combo',
    tagline: "Murang'a's most popular weekday feast",
    originalPrice: 350,
    offerPrice: 260,
    savings: 90,
    imageSrc: RESTAURANT_MEDIA.chapatiBeef,
    description: '2 hand-rolled golden chapatis + slow-simmered beef stew in rich tomato gravy + 1 complimentary crispy beef samosa.',
    includes: ['2 Fresh Tava Chapatis', 'Slow-Simmered Beef Stew', '1 Crispy Beef Samosa (FREE)', 'Fresh Kachumbari Salad'],
    promoCode: 'CHAPOWED',
    expiresText: 'Closes at 9:00 PM tonight'
  },
  {
    id: 'offer-friday-pork',
    dayName: 'Friday Special',
    badge: 'Furahi-day Pork Fest',
    title: 'Pork Delicacy & Sweet Plantain Platter',
    tagline: 'The 3-year visitor favorite at a celebratory price',
    originalPrice: 500,
    offerPrice: 390,
    savings: 110,
    imageSrc: RESTAURANT_MEDIA.porkPlantains,
    description: 'Succulent ginger pan-fried pork + golden caramelized sweet plantains (matoke) + 500ml cold-pressed passion fruit juice.',
    includes: ['Savory Pan-Fried Pork (400g)', 'Caramelized Sweet Plantains', 'Cold-Pressed Passion Juice (500ml)', 'Sautéed Sukuma Greens'],
    promoCode: 'FURAHIPORK',
    expiresText: 'Valid until 9:00 PM'
  },
  {
    id: 'offer-market-tea',
    dayName: 'Town Market Day',
    badge: 'Highland Chai Break',
    title: 'Masala Chai & Samosa Power Pair',
    tagline: 'Quick midday pick-me-up for marketgoers & town professionals',
    originalPrice: 170,
    offerPrice: 120,
    savings: 50,
    imageSrc: RESTAURANT_MEDIA.crispySamosas,
    description: 'Steaming hot mug of fresh highland milk masala chai brewed with crushed ginger + a pair of crispy handmade beef samosas.',
    includes: ['Large Spiced Masala Chai (350ml)', 'Pair of Crispy Beef Samosas', 'Lime & Fresh Chili Wedges'],
    promoCode: 'CHAIBITE',
    expiresText: 'Available 2:00 PM – 6:00 PM'
  },
  {
    id: 'offer-weekend-feast',
    dayName: 'Weekend Special',
    badge: 'Family & Group Platter',
    title: 'Swahili Pilau & Roast Chicken Feast',
    tagline: 'Fragrant spiced coastal rice with Mt. Kenya hospitality',
    originalPrice: 480,
    offerPrice: 380,
    savings: 100,
    imageSrc: RESTAURANT_MEDIA.chickenPilau,
    description: 'Generous mountain of clove and cardamom spiced chicken pilau rice, served with tender braised chicken cut and ripe banana slice.',
    includes: ['Fragrant Basmati Chicken Pilau', 'Spiced Tomato & Red Onion Kachumbari', 'Steamed Spinach or Cabbage', 'Ripe Highland Sweet Banana'],
    promoCode: 'WEEKENDPILAU',
    expiresText: 'Saturday & Sunday All Day'
  }
];

interface OfferDayPanelProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenReservation: () => void;
}

export function OfferDayPanel({ onAddToCart, onOpenReservation }: OfferDayPanelProps) {
  // Determine current day of week
  const dayIndex = new Date().getDay(); // 0 = Sun, 3 = Wed, 5 = Fri
  const defaultOfferIndex = dayIndex === 5 ? 1 : dayIndex === 6 || dayIndex === 0 ? 3 : 0;

  const [activeOfferIndex, setActiveOfferIndex] = useState(defaultOfferIndex);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [justClaimed, setJustClaimed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Time remaining countdown simulator
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeOffer = OFFER_DAYS[activeOfferIndex] || OFFER_DAYS[0];

  const handleClaimOffer = () => {
    const offerItem: MenuItem = {
      id: `offer-${activeOffer.id}-${Date.now()}`,
      name: `${activeOffer.title} [${activeOffer.badge}]`,
      category: 'signatures',
      price: activeOffer.offerPrice,
      description: `Special Offer Deal (${activeOffer.promoCode}): ${activeOffer.description}`,
      prepTime: '12-15 mins',
      dietary: 'Special Offer Deal',
      imageAlt: activeOffer.title,
      imageSrc: activeOffer.imageSrc,
      badge: `Save Ksh ${activeOffer.savings}`,
      ingredients: activeOffer.includes,
      spiceLevel: 'Medium',
      pairing: 'Enjoyed fresh at special promotional pricing.',
      portion: 'Complete promotional combo meal',
      originStory: `Exclusive Deekei Restaurant ${activeOffer.dayName} special offer.`
    };

    onAddToCart(offerItem);
    setJustClaimed(true);
    setTimeout(() => setJustClaimed(false), 1500);
  };

  const handleCopyPromoCode = () => {
    navigator.clipboard.writeText(activeOffer.promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (isDismissed) {
    // Floating badge when dismissed so user can easily re-open
    return (
      <button
        type="button"
        onClick={() => {
          setIsDismissed(false);
          setIsExpanded(true);
        }}
        className="fixed bottom-6 left-6 z-40 bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-amber-600/60 cursor-pointer animate-bounce transition-transform hover:scale-105"
        title="View Today's Offer Day Special"
      >
        <Tag className="w-4 h-4 text-amber-300" />
        <span className="text-xs font-bold font-mono">
          Special Offer Active · Save Ksh {activeOffer.savings}
        </span>
      </button>
    );
  }

  return (
    <aside className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-stone-100 border-b border-amber-700/40 relative z-30 shadow-md">
      
      {/* Top Ticker / Summary Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs gap-3">
        
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold font-mono text-[11px] shrink-0">
            <Percent className="w-3 h-3 text-amber-400" />
            <span>OFFER DAY SPECIAL</span>
          </span>
          
          <div className="flex items-center gap-2 truncate text-stone-200">
            <span className="font-bold text-white hidden sm:inline">
              {activeOffer.badge}:
            </span>
            <span className="truncate">
              {activeOffer.title}
            </span>
            <span className="font-mono font-bold text-amber-400 shrink-0">
              Only Ksh {activeOffer.offerPrice}
            </span>
            <span className="text-stone-400 line-through text-[11px] font-mono hidden md:inline shrink-0">
              Ksh {activeOffer.originalPrice}
            </span>
          </div>
        </div>

        {/* Right Controls: Timer + Expand / Dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Live Countdown */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-stone-300 bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Ends in:</span>
            <strong className="text-amber-300">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </strong>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-semibold text-amber-300 hover:text-white underline underline-offset-2 cursor-pointer whitespace-nowrap"
          >
            {isExpanded ? 'Hide Details' : 'View Offer'}
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-200 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss offer panel"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Expanded Interactive Showcase Card */}
      {isExpanded && (
        <div className="border-t border-white/10 bg-black/40 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto">
            
            {/* Offer Day Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mr-2 shrink-0">
                Select Deal Day:
              </span>
              {OFFER_DAYS.map((deal, idx) => {
                const isSelected = idx === activeOfferIndex;
                return (
                  <button
                    key={deal.id}
                    type="button"
                    onClick={() => setActiveOfferIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-md ring-1 ring-amber-400'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700'
                    }`}
                  >
                    <span>{deal.dayName}</span>
                    <span className={`text-[10px] font-mono px-1 rounded ${
                      isSelected ? 'bg-amber-800 text-amber-200' : 'bg-stone-700 text-stone-400'
                    }`}>
                      Save Ksh {deal.savings}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Offer Content Showcase */}
            <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Image & Discount Badge */}
              <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-video sm:aspect-4/3 bg-stone-950 border border-stone-800 group">
                <img
                  src={activeOffer.imageSrc}
                  alt={activeOffer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Savings Pill */}
                <div className="absolute top-3 left-3 bg-red-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>SAVE KSH {activeOffer.savings}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                    {activeOffer.badge}
                  </span>
                  <p className="text-xs font-serif font-bold truncate">
                    {activeOffer.tagline}
                  </p>
                </div>
              </div>

              {/* Deal Information & Items Included */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Special Today at Deekei Murang'a</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {activeOffer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                    {activeOffer.description}
                  </p>
                </div>

                {/* Items Included Checklist */}
                <div className="p-3.5 bg-stone-950/70 rounded-2xl border border-stone-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400 block">
                    What's Included in this Combo:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-200">
                    {activeOffer.includes.map((inc) => (
                      <div key={inc} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code & Expiry */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span>Counter / Online Code:</span>
                    <button
                      type="button"
                      onClick={handleCopyPromoCode}
                      className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-mono font-bold hover:bg-amber-900 transition-colors cursor-pointer flex items-center gap-1"
                      title="Click to copy promo code"
                    >
                      <span>{activeOffer.promoCode}</span>
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                    </button>
                  </div>
                  <span>·</span>
                  <span className="text-amber-400/90 font-medium">
                    {activeOffer.expiresText}
                  </span>
                </div>
              </div>

              {/* Action Call to Action */}
              <div className="lg:col-span-3 bg-stone-950 p-5 rounded-2xl border border-stone-800 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] text-stone-400 uppercase font-mono block">
                    Special Offer Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-mono font-bold text-amber-400">
                      Ksh {activeOffer.offerPrice}
                    </span>
                    <span className="text-sm font-mono text-stone-500 line-through">
                      Ksh {activeOffer.originalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold block">
                    Instant savings of Ksh {activeOffer.savings}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleClaimOffer}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                      justClaimed
                        ? 'bg-emerald-700 text-white'
                        : 'bg-amber-600 hover:bg-amber-500 text-white'
                    }`}
                  >
                    {justClaimed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Offer Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Claim Offer to Takeaway Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onOpenReservation}
                    className="w-full py-2 px-3 rounded-lg text-[11px] font-semibold text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-800 transition-colors cursor-pointer border border-stone-700 text-center"
                  >
                    Reserve Table for this Offer
                  </button>
                </div>

                <p className="text-[10px] text-stone-500 text-center">
                  Cooked to order in our open kitchen · Dine-in or Takeaway
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </aside>
  );
}
