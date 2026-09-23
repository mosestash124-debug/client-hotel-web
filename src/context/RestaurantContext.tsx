import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';
import { 
  KitchenOrder, 
  KitchenOrderItem, 
  ReservationBooking, 
  AdminMenuItem, 
  DailyOfferDeal, 
  OrderStatus 
} from '../types/admin';

interface RestaurantContextType {
  // Menu items
  menuItems: AdminMenuItem[];
  toggleItemStock: (id: string) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
  toggleItemFeatured: (id: string) => void;
  addNewMenuItem: (item: Omit<AdminMenuItem, 'id'>) => void;

  // Orders / KDS
  orders: KitchenOrder[];
  addOrder: (order: Omit<KitchenOrder, 'id' | 'createdAt' | 'status'>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Reservations
  reservations: ReservationBooking[];
  addReservation: (res: Omit<ReservationBooking, 'id' | 'createdAt' | 'status'>) => string;
  updateReservationStatus: (resId: string, status: ReservationBooking['status'], tableNumber?: number) => void;

  // Offers
  dailyOffers: DailyOfferDeal[];
  toggleOfferActive: (id: string) => void;
  updateOfferDiscount: (id: string, discount: number) => void;

  // Admin Auth
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  staffName: string;
  staffRole: string;
  loginWithPin: (pin: string, role?: string, name?: string) => boolean;
  logout: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | null>(null);

// Station assignment helper based on item name/category
function getItemStation(name: string, category: string): 'tava' | 'stew' | 'pork' | 'fryer' | 'bar' {
  const lower = name.toLowerCase();
  if (lower.includes('chapati') || lower.includes('chapo')) return 'tava';
  if (lower.includes('stew') || lower.includes('ugali') || lower.includes('pilau') || lower.includes('matoke')) return 'stew';
  if (lower.includes('pork')) return 'pork';
  if (lower.includes('samosa')) return 'fryer';
  if (lower.includes('chai') || lower.includes('juice') || lower.includes('kahawa') || category === 'drinks') return 'bar';
  return 'stew';
}

const INITIAL_OFFERS: DailyOfferDeal[] = [
  {
    id: 'wed-pork',
    day: 'Wednesday Special',
    title: 'Visitors Pork & Caramelized Plantains',
    description: '15% Off with complimentary mug of hot spiced tea. Sizzled in high-heat wok with fresh ginger.',
    dealCode: 'WEDPORK15',
    discountPercent: 15,
    active: true,
    tag: 'Murang\'a Visitor Craving'
  },
  {
    id: 'fri-samosas',
    day: 'Friday Rush',
    title: 'Crunchy Samosas & Fresh Passion Jug',
    description: 'Buy 4 Crispy Beef Samosas get 500ml fresh cold-pressed passion fruit juice at half price.',
    dealCode: 'FRICRUNCH',
    discountPercent: 20,
    active: true,
    tag: 'Top Reviewed (12+ mentions)'
  },
  {
    id: 'market-chapati',
    day: 'Market Day (Mon & Thu)',
    title: 'Executive Chapati Stew Platter',
    description: 'Double golden layered tava chapatis, rich beef bone-broth reduction stew, and farm salad.',
    dealCode: 'CHAPOFEAST',
    discountPercent: 10,
    active: true,
    tag: 'Tava Griddle Specialty'
  },
  {
    id: 'weekend-pilau',
    day: 'Weekend Comfort',
    title: 'Coastal Swahili Chicken Pilau Pot',
    description: 'Basmati rice braised with whole cloves, cardamom, ginger chicken, and kachumbari.',
    dealCode: 'PILAUWKND',
    discountPercent: 15,
    active: true,
    tag: 'Chef Signature'
  }
];

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Menu Items State
  const [menuItems, setMenuItems] = useState<AdminMenuItem[]>(() => {
    return MENU_ITEMS.map((item) => ({
      ...item,
      inStock: true,
      isFeatured: !!item.badge
    }));
  });

  // 2. Orders State
  const [orders, setOrders] = useState<KitchenOrder[]>([
    {
      id: 'DK-ORD-1043',
      customerName: 'Dickson G. Wachira',
      customerPhone: '0712 345 678',
      type: 'dine-in',
      tableNumber: 2,
      items: [
        { name: 'Chapati Beef Stew', quantity: 2, price: 250, station: 'tava', notes: 'Extra layered, crispy edge' },
        { name: 'Steaming Kenyan Masala Chai', quantity: 2, price: 70, station: 'bar', notes: 'Strong crushed ginger' }
      ],
      totalAmount: 640,
      paymentMethod: 'mpesa',
      paymentStatus: 'paid',
      status: 'preparing',
      createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(), // 14 mins ago
      estimatedMins: 15,
      notes: 'Customer sitting at Open Kitchen View observation table'
    },
    {
      id: 'DK-ORD-1044',
      customerName: 'Unique Angel',
      customerPhone: '0722 890 123',
      type: 'dine-in',
      tableNumber: 4,
      items: [
        { name: 'Pork Delicacy with Sweet Plantains', quantity: 1, price: 380, station: 'pork', notes: 'Medium pepper, ripe sweet matoke' },
        { name: 'Fresh Cold-Pressed Passion Juice (500ml)', quantity: 1, price: 120, station: 'bar' }
      ],
      totalAmount: 500,
      paymentMethod: 'mpesa',
      paymentStatus: 'paid',
      status: 'new',
      createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
      estimatedMins: 18,
      notes: 'In town for land business meeting'
    },
    {
      id: 'DK-ORD-1042',
      customerName: 'Isaac Macharia',
      customerPhone: '0700 987 654',
      type: 'takeaway',
      items: [
        { name: 'Crispy Beef Samosas (Pair of 2)', quantity: 3, price: 100, station: 'fryer', notes: 'Pack with lime wedges and chili' },
        { name: 'Deekei Spiced Kahawa Tungu', quantity: 2, price: 60, station: 'bar' }
      ],
      totalAmount: 420,
      paymentMethod: 'mpesa',
      paymentStatus: 'paid',
      status: 'ready',
      createdAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(), // 22 mins ago
      estimatedMins: 10,
      notes: 'Takeaway box ready on collection counter'
    },
    {
      id: 'DK-ORD-1040',
      customerName: 'Mercy Wanjiru',
      customerPhone: '0733 112 233',
      type: 'takeaway',
      items: [
        { name: 'Swahili Chicken Pilau', quantity: 1, price: 320, station: 'stew' },
        { name: 'Fresh Cold-Pressed Passion Juice (500ml)', quantity: 1, price: 120, station: 'bar' }
      ],
      totalAmount: 440,
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      estimatedMins: 12
    }
  ]);

  // 3. Reservations State
  const todayStr = new Date().toISOString().split('T')[0];
  const [reservations, setReservations] = useState<ReservationBooking[]>([
    {
      id: 'DK-RES-401',
      customerName: 'Hon. Peter Kariuki',
      customerPhone: '0722 456 789',
      date: todayStr,
      time: '12:30 PM',
      guests: 4,
      tableNumber: 4,
      area: 'quiet-corner',
      occasion: 'Business Meeting',
      notes: 'Land conveyance discussion with surveyors. Require quiet corner table with notebook space.',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    },
    {
      id: 'DK-RES-402',
      customerName: 'Grace Muthoni',
      customerPhone: '0711 234 567',
      date: todayStr,
      time: '1:30 PM',
      guests: 2,
      tableNumber: 2,
      area: 'kitchen-view',
      occasion: 'Casual Dining',
      notes: 'Requested seats facing the tava griddle to watch chapati rolling.',
      status: 'pending',
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
      id: 'DK-RES-403',
      customerName: 'Dr. James Njuguna',
      customerPhone: '0700 334 455',
      date: todayStr,
      time: '6:30 PM',
      guests: 6,
      tableNumber: 5,
      area: 'main-hall',
      occasion: 'Family Gathering',
      notes: 'Pre-order of Pork & Plantains platter requested.',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 1000 * 60 * 320).toISOString()
    }
  ]);

  // 4. Daily Offers State
  const [dailyOffers, setDailyOffers] = useState<DailyOfferDeal[]>(INITIAL_OFFERS);

  // 5. Auth State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [staffName, setStaffName] = useState('David Mwangi');
  const [staffRole, setStaffRole] = useState('General Manager');

  // Menu Methods
  const toggleItemStock = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
  };

  const updateItemPrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  const toggleItemFeatured = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
  };

  const addNewMenuItem = (itemData: Omit<AdminMenuItem, 'id'>) => {
    const newId = `custom-dish-${Date.now()}`;
    setMenuItems((prev) => [{ id: newId, ...itemData }, ...prev]);
  };

  // Order Methods
  const addOrder = (orderData: Omit<KitchenOrder, 'id' | 'createdAt' | 'status'>): string => {
    const generatedId = `DK-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: KitchenOrder = {
      id: generatedId,
      ...orderData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return generatedId;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  // Reservation Methods
  const addReservation = (resData: Omit<ReservationBooking, 'id' | 'createdAt' | 'status'>): string => {
    const generatedId = `DK-RES-${Math.floor(400 + Math.random() * 500)}`;
    const newReservation: ReservationBooking = {
      id: generatedId,
      ...resData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReservations((prev) => [newReservation, ...prev]);
    return generatedId;
  };

  const updateReservationStatus = (
    resId: string, 
    status: ReservationBooking['status'], 
    tableNumber?: number
  ) => {
    setReservations((prev) =>
      prev.map((res) => {
        if (res.id === resId) {
          return {
            ...res,
            status,
            tableNumber: tableNumber !== undefined ? tableNumber : res.tableNumber
          };
        }
        return res;
      })
    );
  };

  // Offer Methods
  const toggleOfferActive = (id: string) => {
    setDailyOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, active: !off.active } : off))
    );
  };

  const updateOfferDiscount = (id: string, discount: number) => {
    setDailyOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, discountPercent: discount } : off))
    );
  };

  // PIN Login logic
  // Default PIN: "1732" (Murang'a phone digits) or "0000" or direct demo
  const loginWithPin = (pin: string, role = 'General Manager', name = 'David Mwangi'): boolean => {
    if (pin === '1732' || pin === '0000' || pin === '1234') {
      setIsAuthenticated(true);
      setStaffName(name);
      setStaffRole(role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <RestaurantContext.Provider
      value={{
        menuItems,
        toggleItemStock,
        updateItemPrice,
        toggleItemFeatured,
        addNewMenuItem,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        reservations,
        addReservation,
        updateReservationStatus,
        dailyOffers,
        toggleOfferActive,
        updateOfferDiscount,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        staffName,
        staffRole,
        loginWithPin,
        logout
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
