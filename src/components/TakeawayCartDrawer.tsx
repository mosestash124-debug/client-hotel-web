import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface TakeawayCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function TakeawayCartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: TakeawayCartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('15-20 mins (Fastest)');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cash'>('mpesa');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    pickupTime: string;
  } | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderId = `DK-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrder({
        orderId: generatedOrderId,
        total: totalAmount,
        pickupTime
      });
      setIsSubmitting(false);
      onClearCart();
    }, 600);
  };

  const handleDone = () => {
    setConfirmedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800" />
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Your Takeaway Bag
              </h3>
              <span className="text-[11px] text-stone-500">
                Deekei Restaurant · Open Kitchen Pickup
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {confirmedOrder ? (
            /* Order Confirmed View */
            <div className="py-8 space-y-5 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-800">
                  Order Received by Kitchen
                </span>
                <h4 className="text-xl font-serif font-bold text-stone-900">
                  We're cooking your food!
                </h4>
                <p className="text-xs font-mono text-stone-500">
                  Order Token: <strong className="text-stone-900">{confirmedOrder.orderId}</strong>
                </p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left space-y-2 text-xs text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Ready In:</span>
                  <strong className="text-amber-900">{confirmedOrder.pickupTime}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Due on Pickup:</span>
                  <strong className="text-stone-900 font-mono">Ksh {confirmedOrder.total.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Pickup Location:</span>
                  <span>Murang'a 4 Deekei Counter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Kitchen Contact:</span>
                  <span className="font-mono">{RESTAURANT_INFO.phone}</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed">
                Show your order token <strong className="text-stone-800">{confirmedOrder.orderId}</strong> at the front counter when you arrive.
              </p>

              <button
                type="button"
                onClick={handleDone}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-stone-800">Your bag is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Add some flaky chapatis, beef stew, or crispy samosas from our menu.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <span>Browse Online Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Items List & Checkout Form */
            <div className="space-y-6">
              
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Selected Dishes ({items.reduce((c, i) => c + i.quantity, 0)})</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-stone-100 border-t border-b border-stone-200">
                  {items.map(({ item, quantity }) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      {item.imageSrc ? (
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-lg object-cover border border-stone-200 shrink-0"
                        />
                      ) : null}

                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-stone-900 truncate">
                          {item.name}
                        </h5>
                        <span className="text-[11px] text-stone-500 font-mono">
                          Ksh {item.price.toLocaleString()} each
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-stone-700 hover:bg-stone-200 text-xs transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-stone-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-stone-700 hover:bg-stone-200 text-xs transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[60px]">
                        <span className="text-xs font-mono font-bold text-stone-900">
                          Ksh {(item.price * quantity).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="block ml-auto text-stone-400 hover:text-red-600 p-0.5 mt-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 pt-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Pickup & Contact Details
                </h4>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-600 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. John Kamau"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-600 block">
                    Kenyan Mobile Number (M-Pesa) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-600 block">
                    Estimated Pickup Time
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  >
                    <option value="15-20 mins (Fastest)">15–20 minutes (Fastest)</option>
                    <option value="30 minutes">In 30 minutes</option>
                    <option value="45 minutes">In 45 minutes</option>
                    <option value="1 hour">In 1 hour</option>
                    <option value="Lunch (12:30 PM)">Lunch time (12:30 PM)</option>
                    <option value="Dinner (6:30 PM)">Dinner time (6:30 PM)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-600 block">
                    Payment on Pickup
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`p-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'mpesa'
                          ? 'bg-emerald-50 border-emerald-700 text-emerald-900 font-bold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      M-Pesa on Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'cash'
                          ? 'bg-amber-50 border-amber-700 text-amber-900 font-bold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      Cash on Pickup
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-600 block">
                    Kitchen Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra kachumbari, chili packed separately"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>

              </form>

            </div>
          )}

        </div>

        {/* Drawer Footer / Subtotal & Primary CTA */}
        {!confirmedOrder && items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600">Subtotal Amount:</span>
              <span className="text-lg font-mono font-bold text-stone-900 tabular-nums">
                Ksh {totalAmount.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Sending to Kitchen...</span>
              ) : (
                <>
                  <span>Send Takeaway Order to Kitchen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-stone-500">
              Pay via M-Pesa or Cash upon collecting your freshly prepared food at Murang'a 4 Deekei.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
