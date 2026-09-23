import { ShoppingBag, Calendar, Sparkles, Flame, Tag, Shield } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenPrompt: () => void;
  onOpenLiveKitchen: () => void;
  onOpenOfferPanel?: () => void;
  onOpenAdmin: () => void;
}

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenPrompt,
  onOpenLiveKitchen,
  onOpenOfferPanel,
  onOpenAdmin
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark (Display face) */}
        <a 
          href="#" 
          className="text-2xl font-serif font-bold tracking-tight text-stone-900 hover:text-amber-900 transition-colors flex items-center gap-2"
        >
          <span>Deekei Restaurant</span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-sans font-semibold tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-200/60">
            Murang'a Town
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-700">
          <a href="#menu" className="hover:text-amber-800 transition-colors">
            Online Menu
          </a>

          {/* Open Kitchen Live with active indicator */}
          <button
            type="button"
            onClick={onOpenLiveKitchen}
            className="hover:text-amber-900 text-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            title="Watch Open Kitchen Live Stream & Range Cam"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open Kitchen Live</span>
          </button>

          {/* Offer Day Deals trigger */}
          {onOpenOfferPanel && (
            <button
              type="button"
              onClick={onOpenOfferPanel}
              className="text-amber-900 hover:text-amber-950 transition-colors flex items-center gap-1 cursor-pointer font-semibold bg-amber-100/80 px-2 py-1 rounded-md border border-amber-200/60"
            >
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>Offer Day Deals</span>
            </button>
          )}

          <a href="#plate-builder" className="hover:text-amber-800 transition-colors">
            Plate Builder
          </a>
          <a href="#reservation" className="hover:text-amber-800 transition-colors">
            Table Reservations
          </a>
          <a href="#reviews" className="hover:text-amber-800 transition-colors">
            Customer Reviews
          </a>

          {/* Admin Managing Dashboard trigger in main nav */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-stone-700 hover:text-amber-900 transition-colors cursor-pointer font-medium"
            title="Open Deekei Staff & Kitchen Managing Dashboard"
          >
            <Shield className="w-3.5 h-3.5 text-amber-700" />
            <span>Admin Portal</span>
          </button>

          <button 
            type="button"
            onClick={onOpenPrompt}
            className="flex items-center gap-1.5 text-amber-800 font-semibold hover:text-amber-900 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-4 text-amber-600" />
            <span>Master Prompt</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Unmissable High-Contrast Admin Portal Button (visible on ALL screens) */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-950 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 rounded-xl transition-all cursor-pointer shadow-xs"
            title="Open Deekei Staff & Kitchen Managing Dashboard"
          >
            <Shield className="w-4 h-4 text-amber-800" />
            <span className="whitespace-nowrap">Admin Portal</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
            aria-label="View Takeaway Bag"
          >
            <ShoppingBag className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline">Takeaway Bag</span>
            {cartCount > 0 ? (
              <span className="bg-amber-700 text-white font-mono text-[11px] px-1.5 py-0.2 rounded-full font-bold">
                {cartCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={onOpenReservation}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Reserve Table</span>
          </button>
        </div>

      </div>
    </header>
  );
}
