import { useState } from 'react';
import { X, Plus, Minus, Check, Clock, Flame, Utensils } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';
import { DishIllustration } from './DishIllustration';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number) => void;
}

export function DishDetailModal({ dish, onClose, onAddToCart }: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header / Graphic */}
        <div className="relative bg-stone-50 border-b border-stone-200">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <DishIllustration category={dish.category} id={dish.id} name={dish.name} imageSrc={dish.imageSrc} />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                <span>{dish.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {dish.prepTime}
                </span>
                {dish.badge && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-800">{dish.badge}</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {dish.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-stone-400 block font-sans">Price</span>
              <span className="text-2xl font-mono font-bold text-stone-900 tabular-nums">
                Ksh {dish.price.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {dish.description}
          </p>

          {/* Portion & Spice Level */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 text-xs">
            <div>
              <span className="text-stone-400 block font-semibold text-[11px]">Portion & Serving:</span>
              <span className="text-stone-800 font-medium">{dish.portion}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-semibold text-[11px]">Spice Profile:</span>
              <span className="text-amber-900 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                {dish.spiceLevel}
              </span>
            </div>
          </div>

          {/* Ingredients list */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-800 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-800" />
              <span>Key Fresh Ingredients</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {dish.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 text-xs bg-stone-100 text-stone-700 rounded-md border border-stone-200/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Pairing Recommendation */}
          <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-2xl text-xs space-y-1">
            <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px] block">
              Chef's Pairing Suggestion:
            </span>
            <p className="text-stone-700 italic">
              {dish.pairing}
            </p>
          </div>

          {/* Origin Story */}
          <div className="text-xs text-stone-500 leading-relaxed">
            <strong className="text-stone-700 block mb-0.5">The Deekei Heritage:</strong>
            {dish.originStory}
          </div>

        </div>

        {/* Footer / Action */}
        <div className="p-5 border-t border-stone-200 bg-[#FAF8F5] flex items-center justify-between gap-4">
          {/* Stepper */}
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-sm text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 py-3 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
              added
                ? 'bg-emerald-700 text-white'
                : 'bg-amber-800 hover:bg-amber-900 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Takeaway Bag!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add {quantity} to Order · Ksh {(dish.price * quantity).toLocaleString()}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
