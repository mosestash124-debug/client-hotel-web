import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Utensils, 
  Calendar, 
  Menu, 
  Tag, 
  TrendingUp, 
  LogOut, 
  ExternalLink, 
  Clock, 
  ChefHat, 
  UserCheck, 
  Volume2, 
  VolumeX,
  X
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { AdminKdsTab } from './AdminKdsTab';
import { AdminReservationsTab } from './AdminReservationsTab';
import { AdminMenuEditorTab } from './AdminMenuEditorTab';
import { AdminOffersTab } from './AdminOffersTab';
import { AdminAnalyticsTab } from './AdminAnalyticsTab';

export function AdminDashboard() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAuthenticated, 
    staffName, 
    staffRole, 
    logout,
    orders,
    reservations,
    menuItems 
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'kds' | 'reservations' | 'menu' | 'offers' | 'analytics'>('kds');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isAdminOpen || !isAuthenticated) return null;

  const activeOrdersCount = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;
  const pendingReservationsCount = reservations.filter((r) => r.status === 'pending').length;
  const outOfStockCount = menuItems.filter((i) => !i.inStock).length;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F0E0D] text-stone-100 flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Professional Portal Header Bar */}
      <header className="h-16 bg-stone-900 border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        
        {/* Left: Brand & Branch */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-white">
                Deekei Manager Portal
              </span>
              <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-sm border border-amber-500/20 hidden sm:inline-block">
                Murang'a Town · 75H5+9W
              </span>
            </div>
            <div className="text-[11px] text-stone-400 hidden sm:block">
              Open Kitchen & Back-of-House Control Station
            </div>
          </div>
        </div>

        {/* Center: Live Digital Clock */}
        <div className="hidden md:flex items-center gap-2 bg-stone-950 px-3.5 py-1.5 rounded-lg border border-stone-800 text-xs font-mono text-stone-300">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentTime} EAT</span>
        </div>

        {/* Right: Staff Info & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-stone-200">{staffName}</div>
            <div className="text-[10px] font-mono text-amber-400">{staffRole}</div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="py-1.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg border border-stone-700 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Return to customer restaurant storefront"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Storefront View</span>
          </button>

          <button
            type="button"
            onClick={() => {
              logout();
              setIsAdminOpen(false);
            }}
            className="p-2 text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            title="Lock Portal & Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* Navigation Sub-Header (Tabs) */}
      <nav className="bg-stone-900/80 border-b border-stone-800 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-2 shrink-0 text-xs font-medium">
        
        {/* KDS Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('kds')}
          className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'kds'
              ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Live Kitchen KDS</span>
          {activeOrdersCount > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'kds' ? 'bg-stone-950 text-amber-400' : 'bg-amber-500 text-stone-950'
              }`}
            >
              {activeOrdersCount}
            </span>
          )}
        </button>

        {/* Reservations Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('reservations')}
          className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'reservations'
              ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Table Bookings & Floor</span>
          {pendingReservationsCount > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'reservations' ? 'bg-stone-950 text-amber-400' : 'bg-amber-500 text-stone-950'
              }`}
            >
              {pendingReservationsCount}
            </span>
          )}
        </button>

        {/* Menu & 86 Editor Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('menu')}
          className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'menu'
              ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <Menu className="w-4 h-4" />
          <span>Menu & 86 Inventory</span>
          {outOfStockCount > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'menu' ? 'bg-stone-950 text-rose-400' : 'bg-rose-500 text-white'
              }`}
            >
              {outOfStockCount} 86'd
            </span>
          )}
        </button>

        {/* Daily Offers Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('offers')}
          className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'offers'
              ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Daily Offers & Specials</span>
        </button>

        {/* Analytics Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Town Sales & Analytics</span>
        </button>

      </nav>

      {/* Main Tab Content Canvas */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#121110]">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'kds' && <AdminKdsTab />}
          {activeTab === 'reservations' && <AdminReservationsTab />}
          {activeTab === 'menu' && <AdminMenuEditorTab />}
          {activeTab === 'offers' && <AdminOffersTab />}
          {activeTab === 'analytics' && <AdminAnalyticsTab />}
        </div>
      </main>

    </div>
  );
}
