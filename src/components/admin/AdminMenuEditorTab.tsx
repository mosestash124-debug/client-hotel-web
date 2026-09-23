import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  DollarSign, 
  Check, 
  AlertTriangle, 
  Star, 
  Clock, 
  UtensilsCrossed,
  Filter,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { AdminMenuItem } from '../../types/admin';
import { RESTAURANT_MEDIA } from '../../data/restaurantData';

export function AdminMenuEditorTab() {
  const { menuItems, toggleItemStock, updateItemPrice, toggleItemFeatured, addNewMenuItem } = useRestaurant();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [savedPriceId, setSavedPriceId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Dish Form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'signatures' | 'bites' | 'pork' | 'staples' | 'drinks'>('signatures');
  const [newPrice, setNewPrice] = useState(250);
  const [newPrepTime, setNewPrepTime] = useState('12-15 mins');
  const [newDescription, setNewDescription] = useState('');
  const [newDietary, setNewDietary] = useState('Highland Fresh');

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const match = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const handleStartEditPrice = (item: AdminMenuItem) => {
    setEditingPriceId(item.id);
    setTempPrice(item.price);
  };

  const handleSavePrice = (id: string) => {
    if (tempPrice > 0) {
      updateItemPrice(id, tempPrice);
      setSavedPriceId(id);
      setTimeout(() => setSavedPriceId(null), 1500);
    }
    setEditingPriceId(null);
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newPrice <= 0) return;

    // Pick appropriate image based on category
    let img = RESTAURANT_MEDIA.chapatiBeef;
    if (newCategory === 'bites') img = RESTAURANT_MEDIA.crispySamosas;
    if (newCategory === 'pork') img = RESTAURANT_MEDIA.porkPlantains;
    if (newCategory === 'staples') img = RESTAURANT_MEDIA.ugaliSukuma;
    if (newCategory === 'drinks') img = RESTAURANT_MEDIA.masalaChai;

    addNewMenuItem({
      name: newName,
      category: newCategory,
      price: newPrice,
      inStock: true,
      isFeatured: true,
      prepTime: newPrepTime,
      imageSrc: img,
      imageAlt: newName,
      description: newDescription || 'Freshly prepared specialty dish from the Deekei Murang\'a open kitchen.',
      badge: "Chef's Special",
      dietary: newDietary,
      ingredients: [newDietary, 'Locally sourced highland spices', 'Murang\'a farm ingredients'],
      spiceLevel: 'Medium',
      pairing: 'Steaming Kenyan Masala Chai',
      portion: '1 generous serving',
      originStory: 'Specially created daily feature from Deekei open-kitchen chefs.'
    });

    setNewName('');
    setNewPrice(250);
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* Control Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stone-900/60 border border-stone-800 p-4 rounded-2xl">
        <div className="flex items-center gap-3 flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dishes or ingredients..."
            className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-hidden focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="py-2 px-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-md whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish / Special</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'signatures', label: 'Signatures' },
          { id: 'bites', label: 'Samosas & Bites' },
          { id: 'pork', label: 'Pork Specialties' },
          { id: 'staples', label: 'Local Staples' },
          { id: 'drinks', label: 'Highland Chai & Drinks' }
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-semibold'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Table / Cards */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-stone-800/80">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                !item.inStock ? 'bg-stone-950/60 opacity-60' : 'hover:bg-stone-900/90'
              }`}
            >
              {/* Left Item Details */}
              <div className="flex items-center gap-3.5 flex-1">
                {/* Real Food Image Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0 relative">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-stone-950/80 flex items-center justify-center text-[9px] font-mono font-bold text-rose-400">
                      86'd
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-stone-100">
                      {item.name}
                    </span>
                    <span className="text-xs text-stone-500">·</span>
                    <span className="text-[11px] font-mono text-stone-400 uppercase">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded-sm border border-amber-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 line-clamp-1 max-w-lg">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.prepTime}</span>
                    </span>
                    <span>·</span>
                    <span>{item.dietary || 'Authentic Murang\'a'}</span>
                  </div>
                </div>
              </div>

              {/* Right Controls: Price & 86 Stock Switch */}
              <div className="flex items-center gap-4 justify-between md:justify-end shrink-0">
                {/* Price Display & Inline Editor */}
                <div className="text-right">
                  {editingPriceId === item.id ? (
                    <div className="flex items-center gap-1 bg-stone-950 border border-amber-500/60 rounded-lg p-1">
                      <span className="text-xs text-stone-400 font-mono pl-1">Ksh</span>
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-16 bg-transparent text-sm font-mono font-bold text-white text-right focus:outline-hidden"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSavePrice(item.id)}
                        className="p-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold transition-colors cursor-pointer"
                        title="Save price"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartEditPrice(item)}
                      className="group text-left md:text-right cursor-pointer"
                      title="Click to edit price"
                    >
                      <div className="font-mono text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors flex items-center gap-1 justify-end">
                        <span>Ksh {item.price}</span>
                        {savedPriceId === item.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            edit
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-500">Click to change</div>
                    </button>
                  )}
                </div>

                {/* In Stock / 86'd Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleItemStock(item.id)}
                  className={`py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    item.inStock
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-rose-500/15 border-rose-500/50 text-rose-400 hover:bg-rose-500/25'
                  }`}
                  title={item.inStock ? "Item is available. Click to 86/Sold Out" : "Item is 86'd. Click to Restock"}
                >
                  <span className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                  <span>{item.inStock ? 'In Stock' : '86\'d (Sold Out)'}</span>
                </button>

                {/* Featured Special Toggle */}
                <button
                  type="button"
                  onClick={() => toggleItemFeatured(item.id)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    item.isFeatured
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                      : 'bg-stone-950 border-stone-800 text-stone-600 hover:text-stone-400'
                  }`}
                  title="Toggle Chef's Special Star"
                >
                  <Star className={`w-4 h-4 ${item.isFeatured ? 'fill-amber-400' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Dish Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 text-lg font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              <span>Add New Dish / Daily Special</span>
            </h3>

            <form onSubmit={handleCreateDish} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Dish Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Mukimo Beef Combo or Murang'a Wet-Fry Kienyeji"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="signatures">Signatures</option>
                    <option value="bites">Samosas & Bites</option>
                    <option value="pork">Pork Specialties</option>
                    <option value="staples">Local Staples</option>
                    <option value="drinks">Highland Chai & Drinks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Price (Ksh)</label>
                  <input
                    type="number"
                    min={20}
                    step={10}
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Prep Time</label>
                  <input
                    type="text"
                    value={newPrepTime}
                    onChange={(e) => setNewPrepTime(e.target.value)}
                    placeholder="e.g. 15 mins"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Dietary / Tag</label>
                  <input
                    type="text"
                    value={newDietary}
                    onChange={(e) => setNewDietary(e.target.value)}
                    placeholder="e.g. Local Organic / Halal"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Appetizing description of ingredients and presentation..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg transition-colors cursor-pointer mt-2"
              >
                Add Dish to Menu
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
