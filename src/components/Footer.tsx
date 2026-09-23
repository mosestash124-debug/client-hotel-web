import { MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenPrompt: () => void;
  onOpenReservation: () => void;
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenPrompt, onOpenReservation, onOpenAdmin }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 py-14 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xl font-serif font-bold text-white block">
              {RESTAURANT_INFO.name}
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Authentic Kenyan dining in Murang'a Town. Experience our open kitchen, freshly rolled chapatis, tender beef stew, crispy samosas, and savory pork with sweet plantains.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="text-amber-400 font-semibold">4.0 ★ Google Rating</span>
              <span aria-hidden="true">·</span>
              <span>112 Verified Reviews</span>
              <span aria-hidden="true">·</span>
              <span>Ksh 1–500</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Online Menu & Takeaway
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="hover:text-white transition-colors text-left"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Open Kitchen & Hours
                </a>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>🛡️ Staff & Admin Managing Portal</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={onOpenPrompt}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Master AI Prompt Kit</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Murang'a Town Location
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white font-mono">
                  {RESTAURANT_INFO.formattedPhone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Daily: {RESTAURANT_INFO.openingTime} – {RESTAURANT_INFO.closingTime}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Deekei Restaurant. All rights reserved. Murang'a Town, Kenya.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-stone-400">Plus Code: {RESTAURANT_INFO.plusCode}</span>
            <span>·</span>
            <span>Dine-in & Takeaway</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
