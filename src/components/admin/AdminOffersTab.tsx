import React, { useState } from 'react';
import { Tag, Percent, Sparkles, Check, BellRing, Save } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

export function AdminOffersTab() {
  const { dailyOffers, toggleOfferActive, updateOfferDiscount } = useRestaurant();
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [activeBroadcast, setActiveBroadcast] = useState<string | null>(null);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    setActiveBroadcast(broadcastMsg);
    setBroadcastMsg('');
  };

  return (
    <div className="space-y-6">

      {/* Broadcast Flash Offer Box */}
      <div className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl">
        <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2 mb-1">
          <BellRing className="w-4 h-4 text-amber-400" />
          <span>Broadcast Instant Flash Banner to Visitors</span>
        </h3>
        <p className="text-xs text-stone-400 mb-3">
          Push a real-time banner announcement to all visitors currently browsing the storefront.
        </p>

        <form onSubmit={handleSendBroadcast} className="flex gap-2">
          <input
            type="text"
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="e.g. 🌧️ Afternoon Highland Rain: Enjoy 20% off all Steaming Masala Chai until 5 PM!"
            className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-hidden focus:border-amber-500"
          />
          <button
            type="submit"
            className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Broadcast Banner
          </button>
        </form>

        {activeBroadcast && (
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span><strong>Live Broadcast:</strong> {activeBroadcast}</span>
            </div>
            <button
              onClick={() => setActiveBroadcast(null)}
              className="text-stone-400 hover:text-stone-200 font-bold text-xs p-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Daily Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dailyOffers.map((offer) => (
          <div
            key={offer.id}
            className={`bg-stone-900 border rounded-2xl p-5 flex flex-col justify-between transition-all ${
              offer.active
                ? 'border-amber-500/40 shadow-lg'
                : 'border-stone-800 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-mono uppercase text-amber-400 font-semibold tracking-wide">
                    {offer.day}
                  </span>
                  <h4 className="text-base font-bold text-stone-100 mt-0.5">
                    {offer.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => toggleOfferActive(offer.id)}
                  className={`py-1 px-3 rounded-lg border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    offer.active
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                      : 'bg-stone-800 border-stone-700 text-stone-400'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${offer.active ? 'bg-emerald-400' : 'bg-stone-600'}`} />
                  <span>{offer.active ? 'Active' : 'Paused'}</span>
                </button>
              </div>

              <p className="text-xs text-stone-400 mb-3">
                {offer.description}
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-400 bg-stone-950/80 p-2.5 rounded-xl border border-stone-800/80 font-mono">
                <div>
                  <span className="text-stone-500">Promo Code:</span>{' '}
                  <span className="text-stone-200 font-bold">{offer.dealCode}</span>
                </div>
                <span>·</span>
                <div>
                  <span className="text-stone-500">Discount:</span>{' '}
                  <span className="text-amber-400 font-bold">{offer.discountPercent}% Off</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500">Adjust Discount Rate:</span>
              <div className="flex items-center gap-1">
                {[10, 15, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => updateOfferDiscount(offer.id, pct)}
                    className={`px-2 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
                      offer.discountPercent === pct
                        ? 'bg-amber-600 text-stone-950 font-bold border-amber-600'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
