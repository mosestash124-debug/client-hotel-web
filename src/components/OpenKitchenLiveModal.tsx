import { useState, useEffect } from 'react';
import { X, Flame, Volume2, VolumeX, Eye, Calendar, Plus, Check, Clock, Radio } from 'lucide-react';
import { KITCHEN_STATIONS, MENU_ITEMS, MenuItem, RESTAURANT_MEDIA } from '../data/restaurantData';

interface OpenKitchenLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dish: MenuItem) => void;
  onOpenReservation: () => void;
  onScrollToTheatre: () => void;
}

export function OpenKitchenLiveModal({
  isOpen,
  onClose,
  onAddToCart,
  onOpenReservation,
  onScrollToTheatre
}: OpenKitchenLiveModalProps) {
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [kenyaTime, setKenyaTime] = useState('');
  const [justAddedItem, setJustAddedItem] = useState<string | null>(null);

  // Live EAT (East Africa Time) clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Kenyan Time (UTC+3)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setKenyaTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const currentStation = KITCHEN_STATIONS[activeStationIndex] || KITCHEN_STATIONS[0];

  // Find matching menu item for 1-click order
  const featuredDish = MENU_ITEMS.find((item) =>
    currentStation.popularDishes.some((dName) =>
      item.name.toLowerCase().includes(dName.toLowerCase()) || dName.toLowerCase().includes(item.name.toLowerCase())
    )
  ) || MENU_ITEMS[0];

  const handleOrderStationDish = () => {
    onAddToCart(featuredDish);
    setJustAddedItem(featuredDish.id);
    setTimeout(() => setJustAddedItem(null), 1200);
  };

  const handleReserveKitchenTable = () => {
    onClose();
    onOpenReservation();
  };

  const handleExploreFullTheatre = () => {
    onClose();
    onScrollToTheatre();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-700 text-stone-100 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Broadcast Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-mono font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>LIVE FEED</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>Murang'a 4 Deekei · Open Kitchen Cam</span>
              </h3>
              <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
                <span>EAT (Nairobi): <strong className="text-amber-400">{kenyaTime || '07:50 PM'}</strong></span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">Range Active</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close live broadcast"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Broadcast Viewport */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Main Visual Stream */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-stone-700/80 shadow-inner group">
            <img
              src={currentStation.imageSrc || RESTAURANT_MEDIA.openKitchenChef}
              alt={currentStation.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Viewfinder Overlays */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-black/60">
              
              {/* Top Viewfinder Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-white/90">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CAM 0{activeStationIndex + 1} · {currentStation.name}</span>
                </div>
                <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
                  <span>REC 1080P · 60FPS</span>
                </div>
              </div>

              {/* Bottom Viewfinder Info */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  Active Range Technique
                </span>
                <p className="text-xs sm:text-sm text-stone-100 font-medium leading-relaxed drop-shadow-md">
                  {currentStation.chefAction}
                </p>
              </div>

            </div>

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/70 hover:bg-black/90 text-stone-200 border border-white/20 backdrop-blur-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            >
              {isAudioMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-stone-400" />
                  <span className="hidden sm:inline font-mono text-[10px]">Unmute Sizzle</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline font-mono text-[10px] text-amber-300">Listening Live</span>
                </>
              )}
            </button>

            {/* Sound Cue Bar */}
            {!isAudioMuted && (
              <div className="absolute bottom-16 left-4 right-4 bg-amber-950/90 border border-amber-500/40 rounded-xl p-2.5 text-xs text-amber-200 flex items-center gap-2 backdrop-blur-xs">
                <Radio className="w-4 h-4 text-amber-400 animate-bounce shrink-0" />
                <span className="font-mono text-[11px] truncate">
                  Live Kitchen Sound: "{currentStation.soundCue}"
                </span>
              </div>
            )}

          </div>

          {/* Station Switcher Grid */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block">
              Switch Live Cooking Station:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {KITCHEN_STATIONS.map((station, idx) => {
                const isSelected = idx === activeStationIndex;
                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => setActiveStationIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-800 text-white border-amber-600 shadow-md ring-1 ring-amber-500'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 border-stone-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{station.icon}</span>
                      <span className="text-[10px] font-mono text-stone-400">0{idx + 1}</span>
                    </div>
                    <span className="text-xs font-bold block truncate">
                      {station.name.split('·')[0].replace('The', '').trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Station Live Status Details */}
          <div className="p-4 bg-stone-800/70 border border-stone-700 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Station Secret</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                100% Prepared to Order
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {currentStation.secret}
            </p>
          </div>

          {/* 1-Click Order from this station */}
          <div className="p-4 bg-amber-950/40 border border-amber-800/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                src={featuredDish.imageSrc}
                alt={featuredDish.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-amber-700/50 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                  Fresh from this station:
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {featuredDish.name}
                </h4>
                <span className="text-xs font-mono font-bold text-amber-300">
                  Ksh {featuredDish.price.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOrderStationDish}
              className={`w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shrink-0 ${
                justAddedItem === featuredDish.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-amber-700 hover:bg-amber-600 text-white'
              }`}
            >
              {justAddedItem === featuredDish.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Takeaway Bag</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReserveKitchenTable}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors cursor-pointer border border-stone-700"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Reserve Table 2 (Kitchen Observation)</span>
          </button>

          <button
            type="button"
            onClick={handleExploreFullTheatre}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-amber-300 hover:text-white transition-colors cursor-pointer text-xs underline underline-offset-4"
          >
            <span>Jump to Full Kitchen Theatre Section</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}
