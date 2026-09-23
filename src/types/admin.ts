import { MenuItem } from '../data/restaurantData';

export type AdminRole = 'general_manager' | 'kitchen_lead' | 'floor_manager';

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export type OrderStation = 'all' | 'tava' | 'stew' | 'pork' | 'fryer' | 'bar';

export interface KitchenOrderItem {
  name: string;
  quantity: number;
  price: number;
  station: 'tava' | 'stew' | 'pork' | 'fryer' | 'bar';
  notes?: string;
}

export interface KitchenOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  type: 'takeaway' | 'dine-in';
  tableNumber?: number;
  items: KitchenOrderItem[];
  totalAmount: number;
  paymentMethod: 'mpesa' | 'cash';
  paymentStatus: 'paid' | 'pending' | 'pay_on_pickup';
  status: OrderStatus;
  createdAt: string; // ISO date string
  estimatedMins: number;
  notes?: string;
}

export interface ReservationBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: number;
  area: 'kitchen-view' | 'quiet-corner' | 'main-hall';
  occasion: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AdminMenuItem extends MenuItem {
  inStock: boolean;
  isFeatured?: boolean;
}

export interface DailyOfferDeal {
  id: string;
  day: string;
  title: string;
  description: string;
  dealCode: string;
  discountPercent: number;
  active: boolean;
  tag: string;
}
