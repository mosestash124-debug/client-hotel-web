/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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
import { MenuItem } from './data/restaurantData';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isLiveKitchenOpen, setIsLiveKitchenOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Promotional Offer Day Panel */}
      <OfferDayPanel
        key={offerPanelKey}
        onAddToCart={handleAddToCart}
        onOpenReservation={() => scrollToSection('reservation')}
      />

      {/* 3-Zone Strict Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
        onOpenPrompt={() => setIsPromptModalOpen(true)}
        onOpenLiveKitchen={() => setIsLiveKitchenOpen(true)}
        onOpenOfferPanel={handleOpenOfferPanel}
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
      />

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

    </div>
  );
}
