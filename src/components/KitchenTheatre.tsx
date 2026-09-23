import { useState } from 'react';
import { Flame, Plus, Volume2, Eye } from 'lucide-react';
import { KITCHEN_STATIONS, MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface KitchenTheatreProps {
  onSelectDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
}

export function KitchenTheatre({ onSelectDish, onAddToCart }: KitchenTheatreProps) {
  const [activeStationId, setActiveStationId] = useState(KITCHEN_STATIONS[0].id);

  const activeStation = KITCHEN_STATIONS.find((s) => s.id === activeStationId) || KITCHEN_STATIONS[0];

  // Find corresponding menu items for this station
  const stationDishes = MENU_ITEMS.filter((item) =>
    activeStation.popularDishes.some((dName) =>
      item.name.toLowerCase().includes(dName.toLowerCase()) || dName.toLowerCase().includes(item.name.toLowerCase())
    )
  );

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Warm ambient kitchen glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-400">
            <Flame className="w-3.5 h-3.5" />
            <span>Culinary Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            The Chef's Open Kitchen Theatre
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            At Deekei Restaurant, there are no closed doors. Step up to our open cooking stations 
            and observe the craft, sizzle, and aroma behind every meal we serve in Murang'a Town.
          </p>
        </div>

        {/* Station Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {KITCHEN_STATIONS.map((station) => {
            const isActive = station.id === activeStationId;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => setActiveStationId(station.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/40 ring-1 ring-amber-500'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
                }`}
              >
                <span className="text-base">{station.icon}</span>
                <span>{station.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Station Spotlight Card */}
        <div className="bg-stone-800/60 border border-stone-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Station Visual & Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Real Photograph of Station */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-stone-900 border border-stone-700/60 shadow-lg group">
                <img
                  src={activeStation.imageSrc}
                  alt={activeStation.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-amber-400 font-semibold block">
                    Station 0{KITCHEN_STATIONS.findIndex(s => s.id === activeStation.id) + 1} Spotlight
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {activeStation.name}
                  </h3>
                  <p className="text-xs text-stone-300 font-medium">
                    {activeStation.tagline}
                  </p>
                </div>
              </div>

              {/* Chef Action */}
              <div className="p-4 bg-stone-900/70 border border-stone-700/70 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>What You Observe Live</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {activeStation.chefAction}
                </p>
              </div>

              {/* Chef Secret & Sound */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-stone-900/40 border border-stone-700/50 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                    The Culinary Secret
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {activeStation.secret}
                  </p>
                </div>

                <div className="p-3.5 bg-stone-900/40 border border-stone-700/50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kitchen Ambience</span>
                  </div>
                  <p className="text-xs text-stone-300 italic leading-relaxed">
                    "{activeStation.soundCue}"
                  </p>
                </div>
              </div>

              {/* Verified Quote Attribution */}
              <p className="text-xs text-stone-400 italic">
                "The services at the hotel are great, especially with the open kitchen where you get to see and observe all that's being prepared and cooked."
                <span className="block mt-1 font-semibold text-stone-300">— Dickson G. Wachira, Google Local Guide (142 reviews)</span>
              </p>

            </div>

            {/* Right: Station Dishes & Quick Order */}
            <div className="lg:col-span-5 bg-stone-900/90 border border-stone-700/80 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Cooked at this Station
                </span>
                <span className="text-xs font-mono text-amber-400">
                  Made Fresh to Order
                </span>
              </div>

              <div className="space-y-3">
                {stationDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 hover:border-amber-600/60 transition-all flex items-center justify-between gap-3 group"
                  >
                    <img
                      src={dish.imageSrc}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover border border-stone-700 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                          {dish.name}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400 mt-0.5 block">
                        Ksh {dish.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onSelectDish(dish)}
                        className="px-2.5 py-1.5 text-[11px] font-semibold text-stone-300 hover:text-white bg-stone-700/60 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onAddToCart(dish)}
                        className="px-3 py-1.5 text-[11px] font-semibold text-white bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Honest local pricing · Ksh 1–500</span>
                <span className="text-amber-400">Dine-in or Takeaway</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
