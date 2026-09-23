import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Clock, 
  Star, 
  MapPin, 
  Flame, 
  Award 
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

export function AdminAnalyticsTab() {
  const { orders, reservations } = useRestaurant();

  const totalSalesKsh = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const paidSalesKsh = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const avgTicketKsh = orders.length > 0 ? Math.round(totalSalesKsh / orders.length) : 0;

  // Murang'a Google Maps Popular Times Data
  const popularTimesData = [
    { time: '6 AM', traffic: 20, label: 'Breakfast Chai' },
    { time: '9 AM', traffic: 35, label: 'Mid-Morning' },
    { time: '12 PM', traffic: 95, label: 'Peak Lunch Rush' },
    { time: '3 PM', traffic: 50, label: 'Business Meetings' },
    { time: '6 PM', traffic: 85, label: 'Sizzling Pork Rush' },
    { time: '9 PM', traffic: 15, label: 'Closing Call' }
  ];

  const topDishes = [
    { name: 'Chapati Beef Stew', count: 48, revenue: 'Ksh 12,000', tag: 'Highland Essential' },
    { name: 'Pork Delicacy & Sweet Plantains', count: 32, revenue: 'Ksh 12,160', tag: 'Visitor Top Choice' },
    { name: 'Crispy Beef Samosas (Pair of 2)', count: 64, revenue: 'Ksh 6,400', tag: '12+ Google Mentions' },
    { name: 'Swahili Chicken Pilau', count: 18, revenue: 'Ksh 5,760', tag: 'Weekend Favorite' },
    { name: 'Steaming Kenyan Masala Chai', count: 52, revenue: 'Ksh 3,640', tag: 'Town Brew' }
  ];

  return (
    <div className="space-y-6">

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-stone-900/60 border border-stone-800 p-4 sm:p-5 rounded-2xl">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Today's Total Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
            Ksh {totalSalesKsh.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
            <span>M-Pesa Verified: Ksh {paidSalesKsh.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 p-4 sm:p-5 rounded-2xl">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Orders Processed</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
            {orders.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-1 font-mono">
            Avg Ticket: Ksh {avgTicketKsh}
          </div>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 p-4 sm:p-5 rounded-2xl">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Table Bookings</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
            {reservations.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-1 font-mono">
            {reservations.filter((r) => r.status === 'confirmed').length} Confirmed Today
          </div>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 p-4 sm:p-5 rounded-2xl">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Kitchen Turnaround</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
            14 mins
          </div>
          <div className="text-[11px] text-stone-400 mt-1 font-mono">
            Fast tava griddle turnaround
          </div>
        </div>

      </div>

      {/* Murang'a Popular Times Chart */}
      <div className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Murang'a Town Popular Times & Kitchen Traffic</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Based on Google Maps customer traffic data for Wednesdays & market days
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
            Peak: 12 PM - 2 PM
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44 pt-6 pb-2 border-b border-stone-800">
          {popularTimesData.map((slot) => {
            const isPeak = slot.traffic > 75;
            return (
              <div key={slot.time} className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-mono text-stone-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {slot.traffic}%
                </span>
                <div
                  style={{ height: `${slot.traffic}%` }}
                  className={`w-full max-w-[48px] rounded-t-lg transition-all duration-500 ${
                    isPeak
                      ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-stone-800 hover:bg-stone-700'
                  }`}
                />
                <span className="text-xs font-mono text-stone-300 font-bold mt-2">
                  {slot.time}
                </span>
                <span className="text-[10px] text-stone-500 text-center truncate max-w-full hidden sm:block">
                  {slot.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 5 Bestsellers & Google Reviews Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Top Bestsellers */}
        <div className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Top Revenue Dishes This Week</span>
          </h3>

          <div className="space-y-3">
            {topDishes.map((dish, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-amber-400 text-sm w-4">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="text-stone-200 font-medium text-xs sm:text-sm">
                      {dish.name}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {dish.count} orders · {dish.tag}
                    </div>
                  </div>
                </div>
                <span className="font-mono font-bold text-stone-200">
                  {dish.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Google Reviews Sentiment */}
        <div className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span>Google Maps Feedback (112 Reviews)</span>
            </h3>
            <span className="text-xs font-mono font-bold text-amber-400">
              4.0 ★ Overall
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
              <div className="flex items-center justify-between text-stone-300 font-semibold mb-1">
                <span>Top Praised: Samosas Crunch</span>
                <span className="text-amber-400 font-mono">12 Mentions</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                "The crunchiest samosas in Murang'a town, perfect pastry crust with cumin aroma."
              </p>
            </div>

            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
              <div className="flex items-center justify-between text-stone-300 font-semibold mb-1">
                <span>Top Praised: Open Kitchen Visuals</span>
                <span className="text-amber-400 font-mono">Dickson G. Wachira</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                "Great services, especially with the open kitchen where you get to see and observe all that's being cooked."
              </p>
            </div>

            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
              <div className="flex items-center justify-between text-stone-300 font-semibold mb-1">
                <span>Visitor Experience: Business Meetings</span>
                <span className="text-amber-400 font-mono">Unique Angel</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                "If you have a meeting this is the place, fresh meals and relaxed atmosphere in town center."
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
