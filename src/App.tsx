/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OnlineMenu } from './components/OnlineMenu';
import { KitchenTheatre } from './components/KitchenTheatre';
import { ExecutiveLunchBuilder } from './components/ExecutiveLunchBuilder';
import { ReservationSection } from './components/ReservationSection';
import { CustomerReviews } from './components/CustomerReviews';
import { StoryAndHours } from './components/StoryAndHours';
import { Footer } from './components/Footer';
import { MasterPromptModal } from './components/MasterPromptModal';
import { TakeawayCartDrawer, CartItem } from './components/TakeawayCartDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { OpenKitchenLiveModal } from './components/OpenKitchenLiveModal';
import { OfferDayPanel } from './components/OfferDayPanel';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { MenuItem } from './data/restaurantData';

function RestaurantAppContent() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAuthenticated 
  } = useRestaurant();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isLiveKitchenOpen, setIsLiveKitchenOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [offerPanelKey, setOfferPanelKey] = useState(0);

  // Cart helper maps for quick lookup in menu cards
  const cartItemIds: Record<string, number> = {};
  cartItems.forEach((ci) => {
    cartItemIds[ci.item.id] = ci.quantity;
  });

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === id) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOfferPanel = () => {
    setOfferPanelKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminPortal = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Promotional Offer Day Panel */}
      <OfferDayPanel
        key={offerPanelKey}
        onAddToCart={handleAddToCart}
        onOpenReservation={() => scrollToSection('reservation')}
      />

      {/* 3-Zone Strict Top Bar with Admin Portal Trigger */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
        onOpenPrompt={() => setIsPromptModalOpen(true)}
        onOpenLiveKitchen={() => setIsLiveKitchenOpen(true)}
        onOpenOfferPanel={handleOpenOfferPanel}
        onOpenAdmin={handleOpenAdminPortal}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onOpenMenu={() => scrollToSection('menu')}
          onOpenReservation={() => scrollToSection('reservation')}
          onOpenPrompt={() => setIsPromptModalOpen(true)}
          onOpenLiveKitchen={() => setIsLiveKitchenOpen(true)}
          onOpenKitchenTheatre={() => scrollToSection('kitchen-theatre')}
        />

        {/* Online Menu Section */}
        <OnlineMenu
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
          onSelectDish={(dish) => setSelectedDish(dish)}
        />

        {/* The Chef's Open Kitchen Theatre */}
        <div id="kitchen-theatre" className="scroll-mt-20">
          <KitchenTheatre
            onSelectDish={(dish) => setSelectedDish(dish)}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Interactive Custom Platter Builder */}
        <div id="plate-builder" className="scroll-mt-20">
          <ExecutiveLunchBuilder
            onAddCustomMeal={(customItem) => handleAddToCart(customItem, 1)}
          />
        </div>

        {/* Table Reservation Section with Floor Plan */}
        <ReservationSection />

        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Story, Popular Times & Town Location */}
        <StoryAndHours />

      </main>

      {/* Footer */}
      <Footer
        onOpenPrompt={() => setIsPromptModalOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
        onOpenAdmin={handleOpenAdminPortal}
      />

      {/* Floating Persistent Admin Access Launcher (Always visible at bottom-left corner) */}
      <aside aria-label="Staff Administration" className="fixed bottom-5 left-5 z-40">
        <button
          type="button"
          onClick={handleOpenAdminPortal}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-stone-900/95 hover:bg-stone-850 text-stone-100 font-semibold text-xs rounded-full shadow-2xl border-2 border-amber-500/60 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md ring-4 ring-amber-500/15 group"
          title="Open Deekei Staff & Kitchen Managing Dashboard"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Shield className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Admin Dashboard</span>
          <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-sm border border-amber-500/30">
            Staff KDS
          </span>
        </button>
      </aside>

      {/* Dish Detail & Recipe Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(dish, qty) => handleAddToCart(dish, qty)}
      />

      {/* Open Kitchen Live Stream & Station Cam Modal */}
      <OpenKitchenLiveModal
        isOpen={isLiveKitchenOpen}
        onClose={() => setIsLiveKitchenOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenReservation={() => scrollToSection('reservation')}
        onScrollToTheatre={() => scrollToSection('kitchen-theatre')}
      />

      {/* Takeaway Cart Slide-over */}
      <TakeawayCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Master Prompt Suite Modal */}
      <MasterPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      {/* Admin Login PIN Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Full Admin Managing Dashboard Portal */}
      <AdminDashboard />

    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <RestaurantAppContent />
    </RestaurantProvider>
  );
}
