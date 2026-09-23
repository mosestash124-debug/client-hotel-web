import { useState, useMemo } from 'react';
import { Search, Plus, Check, Clock, Sparkles, Eye, Flame, AlertCircle } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';
import { DishIllustration } from './DishIllustration';
import { useRestaurant } from '../context/RestaurantContext';

interface OnlineMenuProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Record<string, number>;
  onSelectDish: (item: MenuItem) => void;
}

type CategoryFilter = 'all' | 'signatures' | 'bites' | 'pork' | 'staples' | 'drinks';

export function OnlineMenu({ onAddToCart, cartItemIds, onSelectDish }: OnlineMenuProps) {
  const { menuItems } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBudgetFriendly, setOnlyBudgetFriendly] = useState(false);
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'signatures', label: 'Signatures & Stews' },
    { id: 'bites', label: 'Crispy Samosas & Bites' },
    { id: 'pork', label: 'Pork & Plantains' },
    { id: 'staples', label: 'Highland Staples' },
    { id: 'drinks', label: 'Hot Teas & Cold Juices' }
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBudget = !onlyBudgetFriendly || item.price <= 200;
      return matchesCategory && matchesSearch && matchesBudget;
    });
  }, [menuItems, selectedCategory, searchQuery, onlyBudgetFriendly]);

  const handleAddWithFeedback = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemAnim(item.id);
    setTimeout(() => {
      setAddedItemAnim(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
            Fresh Open-Kitchen Dining
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Our Everyday Menu & Takeaway Orders
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Prepared to order right on the open kitchen range in Murang'a Town.
            Honest local prices ranging from Ksh 40 to Ksh 380 per plate.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Functional Filter Tabs */}
          <div className="w-full md:w-auto flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Filters + Search Box */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setOnlyBudgetFriendly(!onlyBudgetFriendly)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                onlyBudgetFriendly
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Under Ksh 200 Only
            </button>

            <div className="w-full sm:w-64 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapatis, pork, samosas..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:border-amber-700 transition-colors"
              />
            </div>
          </div>

        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-sm font-medium text-stone-600">No dishes match your search query.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyBudgetFriendly(false);
              }}
              className="mt-3 text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
            >
              Reset filters & search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const inCartQty = cartItemIds[item.id] || 0;
              const justAdded = addedItemAnim === item.id;

              return (
                <article
                  key={item.id}
                  className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    {/* Visual Illustration of Dish */}
                    <div
                      className="relative cursor-pointer"
                      onClick={() => onSelectDish(item)}
                    >
                      <DishIllustration category={item.category} id={item.id} name={item.name} imageSrc={item.imageSrc} />

                      {/* Quiet highlight marker */}
                      {item.badge ? (
                        <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-stone-100 text-[11px] font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>{item.badge}</span>
                        </div>
                      ) : null}

                      {/* Quick view button on hover */}
                      <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-amber-800" />
                          <span>View Details & Recipe</span>
                        </span>
                      </div>
                    </div>

                    {/* Dish Metadata */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          onClick={() => onSelectDish(item)}
                          className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <span className="font-mono font-bold text-base text-stone-900 shrink-0 tabular-nums">
                          Ksh {item.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Quiet metadata line without pills */}
                      <div className="text-xs text-stone-500 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{item.prepTime}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{item.popularHighlight || 'Made to order'}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="flex items-center gap-0.5 text-amber-900">
                          <Flame className="w-3 h-3" />
                          {item.spiceLevel}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Key ingredients chips */}
                      <div className="pt-1 flex flex-wrap gap-1">
                        {item.ingredients.slice(0, 3).map((ing) => (
                          <span
                            key={ing}
                            className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectDish(item)}
                      className="text-xs text-stone-600 hover:text-stone-900 font-semibold py-2 px-1 underline underline-offset-4 cursor-pointer"
                    >
                      Recipe Details
                    </button>

                    {!item.inStock ? (
                      <span className="py-2 px-3 text-xs font-semibold rounded-lg bg-stone-200 text-stone-500 cursor-not-allowed flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Sold Out / 86'd</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddWithFeedback(item)}
                        className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs ${
                          justAdded
                            ? 'bg-emerald-700 text-white'
                            : inCartQty > 0
                            ? 'bg-amber-900 text-white'
                            : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
                        }`}
                      >
                        {justAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{inCartQty > 0 ? `Add Another (${inCartQty})` : 'Add to Order'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-serif font-bold text-stone-900">
              Visiting in person at Murang'a 4 Deekei?
            </h4>
            <p className="text-xs text-stone-600">
              You can also order takeaway at the counter or reserve a table with dedicated open kitchen observation.
            </p>
          </div>
          <a
            href="#reservation"
            className="px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Reserve Table Now
          </a>
        </div>

      </div>
    </section>
  );
}
