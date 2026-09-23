import { useState } from 'react';
import { Utensils, Check, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { MenuItem, RESTAURANT_MEDIA } from '../data/restaurantData';

interface ExecutiveLunchBuilderProps {
  onAddCustomMeal: (customItem: MenuItem) => void;
}

export function ExecutiveLunchBuilder({ onAddCustomMeal }: ExecutiveLunchBuilderProps) {
  const [staple, setStaple] = useState({ name: '2 Fresh Tava Chapatis', price: 80 });
  const [protein, setProtein] = useState({ name: 'Tender Slow-Simmered Beef Stew', price: 170 });
  const [side, setSide] = useState({ name: 'Caramelized Sweet Plantains', price: 80 });
  const [drink, setDrink] = useState({ name: 'Steaming Kenyan Masala Chai', price: 70 });
  const [justAdded, setJustAdded] = useState(false);

  const stapleOptions = [
    { name: '2 Fresh Tava Chapatis', price: 80, desc: 'Flaky golden layered wheat' },
    { name: 'Hot Stone-Ground Ugali', price: 70, desc: 'Firm highland white maize' },
    { name: 'Steamed Matoke (Plantains)', price: 90, desc: 'Tender green cooking bananas' }
  ];

  const proteinOptions = [
    { name: 'Tender Slow-Simmered Beef Stew', price: 170, desc: 'Rich tomato & onion gravy' },
    { name: 'Pan-Fried Savory Pork Delicacy', price: 210, desc: 'Ginger, garlic & cracked pepper' },
    { name: 'Swahili Spiced Chicken Stew', price: 180, desc: 'Mild coastal aromatics' }
  ];

  const sideOptions = [
    { name: 'Caramelized Sweet Plantains', price: 80, desc: 'Sweet golden fried slices' },
    { name: 'Sautéed Sukuma Wiki Greens', price: 50, desc: 'Fresh farm collard greens' },
    { name: 'Fresh Red Onion & Tomato Kachumbari', price: 40, desc: 'Crisp with lemon & chili' },
    { name: '1 Crispy Beef Samosa', price: 50, desc: 'Golden crunch appetizer' }
  ];

  const drinkOptions = [
    { name: 'Steaming Kenyan Masala Chai', price: 70, desc: 'Highland milk, ginger & cardamom' },
    { name: 'Cold-Pressed Passion Juice', price: 90, desc: 'Pure 100% Murang’a fruit' },
    { name: 'Deekei Spiced Kahawa Tungu', price: 60, desc: 'Ginger infused black coffee' }
  ];

  const totalPrice = staple.price + protein.price + side.price + drink.price;

  const handleAddMeal = () => {
    const customItem: MenuItem = {
      id: `custom-platter-${Date.now()}`,
      name: `Custom Deekei Platter (${protein.name.split(' ')[0]} + ${staple.name.split(' ')[1] || 'Staple'})`,
      category: 'signatures',
      price: totalPrice,
      description: `Chef-prepared custom plate: ${staple.name} + ${protein.name} + ${side.name} + ${drink.name}. Freshly assembled at our open kitchen.`,
      prepTime: '15 mins',
      dietary: 'Custom Platter',
      imageAlt: 'Custom assembled Kenyan lunch platter at Deekei Restaurant',
      imageSrc: RESTAURANT_MEDIA.heroSpread,
      badge: 'Custom Plate',
      ingredients: [staple.name, protein.name, side.name, drink.name],
      spiceLevel: 'Medium',
      pairing: 'Tailored to your taste.',
      portion: 'Full 4-part executive meal',
      originStory: 'Curated by the diner using Deekei’s fresh morning prep.'
    };

    onAddCustomMeal(customItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Kenyan Plate Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Build Your Ideal Deekei Platter
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Customize your meal exactly how you like it. Pick your staple, sizzling protein, side, 
            and highland brew—freshly cooked on the open kitchen range.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left: Step Pickers */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Staple */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 1: Choose Your Highland Staple
                </span>
                <span className="text-xs text-amber-800 font-semibold">{staple.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stapleOptions.map((opt) => {
                  const isSelected = staple.name === opt.name;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setStaple(opt)}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-800 text-stone-900 ring-1 ring-amber-800 shadow-xs'
                          : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-stone-900">{opt.name}</span>
                        <span className="text-[11px] text-stone-500 mt-0.5 block">{opt.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-900 mt-2 block">
                        Ksh {opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Protein */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 2: Choose Your Sizzling Main
                </span>
                <span className="text-xs text-amber-800 font-semibold">{protein.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {proteinOptions.map((opt) => {
                  const isSelected = protein.name === opt.name;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setProtein(opt)}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-800 text-stone-900 ring-1 ring-amber-800 shadow-xs'
                          : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-stone-900">{opt.name}</span>
                        <span className="text-[11px] text-stone-500 mt-0.5 block">{opt.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-900 mt-2 block">
                        Ksh {opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Side */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 3: Choose Your Side or Salad
                </span>
                <span className="text-xs text-amber-800 font-semibold">{side.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {sideOptions.map((opt) => {
                  const isSelected = side.name === opt.name;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSide(opt)}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-800 text-stone-900 ring-1 ring-amber-800 shadow-xs'
                          : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-stone-900 line-clamp-2">{opt.name}</span>
                        <span className="text-[10px] text-stone-500 mt-0.5 block">{opt.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-900 mt-2 block">
                        Ksh {opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Drink */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 4: Choose Your Drink
                </span>
                <span className="text-xs text-amber-800 font-semibold">{drink.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {drinkOptions.map((opt) => {
                  const isSelected = drink.name === opt.name;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setDrink(opt)}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-800 text-stone-900 ring-1 ring-amber-800 shadow-xs'
                          : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-stone-900">{opt.name}</span>
                        <span className="text-[11px] text-stone-500 mt-0.5 block">{opt.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-900 mt-2 block">
                        Ksh {opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Plate Receipt & Action */}
          <div className="lg:col-span-4 bg-[#FAF8F5] border border-stone-200 rounded-3xl p-6 shadow-sm space-y-5 sticky top-24">
            
            {/* Real Platter Photography */}
            <div className="rounded-2xl overflow-hidden aspect-video bg-stone-200 relative group">
              <img
                src={RESTAURANT_MEDIA.heroSpread}
                alt="Kenyan Dining Feast"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold block">
                  Kitchen Range Assembly
                </span>
                <span className="text-xs font-serif font-bold">
                  Hot & Fresh to Order
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-stone-900">
                Your Custom Platter
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Freshly Assembled
              </span>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <div>
                  <span className="text-stone-500 block text-[11px]">Highland Staple:</span>
                  <span className="font-semibold text-stone-900">{staple.name}</span>
                </div>
                <span className="font-mono font-semibold text-stone-900">Ksh {staple.price}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <div>
                  <span className="text-stone-500 block text-[11px]">Sizzling Main:</span>
                  <span className="font-semibold text-stone-900">{protein.name}</span>
                </div>
                <span className="font-mono font-semibold text-stone-900">Ksh {protein.price}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <div>
                  <span className="text-stone-500 block text-[11px]">Side / Salad:</span>
                  <span className="font-semibold text-stone-900">{side.name}</span>
                </div>
                <span className="font-mono font-semibold text-stone-900">Ksh {side.price}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <div>
                  <span className="text-stone-500 block text-[11px]">Highland Brew:</span>
                  <span className="font-semibold text-stone-900">{drink.name}</span>
                </div>
                <span className="font-mono font-semibold text-stone-900">Ksh {drink.price}</span>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Total Meal Price</span>
                <span className="text-[11px] text-emerald-700 font-medium">Under Ksh 500 budget</span>
              </div>
              <span className="text-2xl font-serif font-bold text-stone-900 font-mono tabular-nums">
                Ksh {totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Add to Takeaway Bag */}
            <button
              type="button"
              onClick={handleAddMeal}
              className={`w-full py-3 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-amber-800 hover:bg-amber-900 text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Takeaway Bag!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Platter to Order (Ksh {totalPrice})</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-stone-500 text-center leading-relaxed">
              Cooked immediately to order on the open range. Pick up hot in 15–20 mins.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
