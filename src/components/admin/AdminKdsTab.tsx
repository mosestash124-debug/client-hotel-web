import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Phone, 
  Utensils, 
  ShoppingBag, 
  Filter,
  Check,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { KitchenOrder, OrderStatus, OrderStation } from '../../types/admin';

export function AdminKdsTab() {
  const { orders, updateOrderStatus } = useRestaurant();
  const [stationFilter, setStationFilter] = useState<OrderStation>('all');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'active'>('active');
  const [printedTicketId, setPrintedTicketId] = useState<string | null>(null);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (statusFilter === 'active') {
      if (order.status === 'completed' || order.status === 'cancelled') return false;
    } else if (order.status !== statusFilter) {
      return false;
    }

    // Station filter
    if (stationFilter !== 'all') {
      const hasItemInStation = order.items.some((i) => i.station === stationFilter);
      if (!hasItemInStation) return false;
    }

    return true;
  });

  // Calculate elapsed minutes
  const getElapsedMins = (createdAt: string) => {
    const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60));
    return Math.max(0, diff);
  };

  const handlePrintChit = (order: KitchenOrder) => {
    setPrintedTicketId(order.id);
    setTimeout(() => {
      window.print();
      setPrintedTicketId(null);
    }, 300);
  };

  const newCount = orders.filter((o) => o.status === 'new').length;
  const prepCount = orders.filter((o) => o.status === 'preparing').length;
  const readyCount = orders.filter((o) => o.status === 'ready').length;
  const completedCount = orders.filter((o) => o.status === 'completed').length;

  return (
    <div className="space-y-6">
      
      {/* Top Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Incoming New</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{newCount}</div>
          <p className="text-[11px] text-stone-500 mt-0.5">Awaiting griddle/stew assign</p>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">In Preparation</span>
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold font-mono text-orange-400 mt-1">{prepCount}</div>
          <p className="text-[11px] text-stone-500 mt-0.5">On Tava & Simmer Pots</p>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Ready for Pickup</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{readyCount}</div>
          <p className="text-[11px] text-stone-500 mt-0.5">At Serving / Pass Counter</p>
        </div>

        <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Completed Today</span>
            <Utensils className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-300 mt-1">{completedCount}</div>
          <p className="text-[11px] text-stone-500 mt-0.5">Served & Fulfilled</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-stone-900/40 border border-stone-800/80 p-3 sm:p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Status Filter Segmented Control */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'active'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Active Tickets ({newCount + prepCount + readyCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('new')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'new'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            New ({newCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('preparing')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'preparing'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            In Prep ({prepCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('ready')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'ready'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Ready ({readyCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            History
          </button>
        </div>

        {/* Station Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-stone-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Station:</span>
          </span>
          {[
            { id: 'all' as const, label: 'All Stations' },
            { id: 'tava' as const, label: '🫓 Tava Griddle' },
            { id: 'stew' as const, label: '🍲 Stew Pots' },
            { id: 'pork' as const, label: '🥩 Pork Wok' },
            { id: 'fryer' as const, label: '🥟 Samosa Fryer' },
            { id: 'bar' as const, label: '☕ Chai Bar' }
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStationFilter(st.id)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                stationFilter === st.id
                  ? 'bg-stone-100 text-stone-900 border-white font-semibold'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-stone-900/30 border border-stone-800/80 rounded-2xl p-12 text-center text-stone-400">
          <Utensils className="w-10 h-10 mx-auto mb-3 text-stone-600 opacity-60" />
          <h3 className="text-base font-semibold text-stone-300">No Orders in this View</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            All tickets for this filter have been completed or no active orders match your station selection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredOrders.map((order) => {
            const elapsed = getElapsedMins(order.createdAt);
            const isUrgent = elapsed > order.estimatedMins;

            return (
              <div
                key={order.id}
                className={`bg-stone-900 border rounded-2xl p-5 flex flex-col justify-between transition-all shadow-lg relative ${
                  order.status === 'new'
                    ? 'border-amber-500/70 ring-1 ring-amber-500/30'
                    : order.status === 'preparing'
                    ? 'border-orange-500/40'
                    : order.status === 'ready'
                    ? 'border-emerald-500/60'
                    : 'border-stone-800 opacity-75'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-white tracking-wide">
                          {order.id}
                        </span>
                        <span className="text-xs text-stone-400">·</span>
                        <span className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                          {order.type === 'dine-in' ? (
                            <>
                              <Utensils className="w-3 h-3 text-amber-400" />
                              <span>Table {order.tableNumber || 1}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3 h-3 text-amber-400" />
                              <span>Takeaway</span>
                            </>
                          )}
                        </span>
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5 font-medium">
                        {order.customerName}
                      </div>
                    </div>

                    {/* Elapsed Timer */}
                    <div className="text-right">
                      <div
                        className={`text-xs font-mono font-bold flex items-center justify-end gap-1 ${
                          isUrgent ? 'text-rose-400 animate-pulse' : 'text-stone-300'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{elapsed}m ago</span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Est: {order.estimatedMins}m
                      </div>
                    </div>
                  </div>

                  {/* Customer phone & payment line */}
                  <div className="py-2.5 flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/60">
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="hover:text-amber-400 transition-colors flex items-center gap-1 font-mono text-[11px]"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{order.customerPhone}</span>
                    </a>
                    <span className="font-mono text-[11px] text-stone-300">
                      Ksh {order.totalAmount} · {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="py-3 space-y-2.5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between text-sm">
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-sm text-xs">
                            {item.quantity}×
                          </span>
                          <div>
                            <div className="text-stone-200 font-medium text-xs sm:text-sm">
                              {item.name}
                            </div>
                            {item.notes && (
                              <div className="text-[11px] text-amber-300/80 italic mt-0.5">
                                Note: {item.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-sm bg-stone-800 text-stone-400 border border-stone-700/60">
                          {item.station}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800 text-xs text-stone-400 mb-3">
                      <span className="text-amber-400 font-semibold">Special Instructions:</span> {order.notes}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handlePrintChit(order)}
                    className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700/80 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Print kitchen ticket receipt"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Chit</span>
                  </button>

                  <div className="flex items-center gap-2 flex-1 justify-end">
                    {order.status === 'new' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="py-2 px-3.5 bg-orange-600 hover:bg-orange-500 text-stone-950 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Start Cooking</span>
                      </button>
                    )}

                    {order.status === 'preparing' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Ready</span>
                      </button>
                    )}

                    {order.status === 'ready' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="py-2 px-3.5 bg-stone-100 hover:bg-white text-stone-900 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Complete & Clear</span>
                      </button>
                    )}

                    {order.status === 'completed' && (
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="py-1.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reopen</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
