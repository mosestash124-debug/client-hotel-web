import heroSpreadImg from '../assets/images/hero_spread_1790174713383.jpg';
import openKitchenChefImg from '../assets/images/open_kitchen_1790174761082.jpg';
import chapatiBeefImg from '../assets/images/chapati_beef_1790174726420.jpg';
import porkPlantainsImg from '../assets/images/pork_plantains_1790174738491.jpg';
import crispySamosasImg from '../assets/images/crisp_samosas_1790174749568.jpg';
import ugaliSukumaImg from '../assets/images/ugali_sukuma_1790174775314.jpg';
import chickenPilauImg from '../assets/images/chicken_pilau_1790174788775.jpg';
import masalaChaiImg from '../assets/images/masala_chai_1790174804283.jpg';
import passionJuiceImg from '../assets/images/passion_juice_1790174816216.jpg';

export interface MenuItem {
  id: string;
  name: string;
  category: 'signatures' | 'bites' | 'pork' | 'staples' | 'drinks';
  price: number;
  description: string;
  popularHighlight?: string;
  prepTime: string;
  dietary?: string;
  imageAlt: string;
  imageSrc: string;
  badge?: string;
  ingredients: string[];
  spiceLevel: 'Mild' | 'Medium' | 'Zesty';
  pairing: string;
  portion: string;
  originStory: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  reviewCount: number;
  photoCount?: number;
  rating: number;
  date: string;
  text: string;
  tags: string[];
  helpfulCount?: number;
  verifiedVisit?: boolean;
}

export interface KitchenStation {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  imageSrc: string;
  chefAction: string;
  secret: string;
  soundCue: string;
  popularDishes: string[];
}

export const RESTAURANT_MEDIA = {
  heroSpread: heroSpreadImg,
  openKitchenChef: openKitchenChefImg,
  chapatiBeef: chapatiBeefImg,
  porkPlantains: porkPlantainsImg,
  crispySamosas: crispySamosasImg,
  ugaliSukuma: ugaliSukumaImg,
  chickenPilau: chickenPilauImg,
  masalaChai: masalaChaiImg,
  passionJuice: passionJuiceImg
};

export const RESTAURANT_INFO = {
  name: "Deekei Restaurant",
  tagline: "Authentic Kenyan Flavours & Open-Kitchen Hospitality",
  town: "Murang'a Town",
  county: "Murang'a County, Central Kenya",
  address: "Murang'a 4 Deekei, Murang'a, Kenya",
  plusCode: "75H5+9W Murang'a",
  phone: "0700 173251",
  formattedPhone: "+254 700 173251",
  rating: 4.0,
  reviewCount: 112,
  priceRange: "Ksh 1–500 per person",
  hoursText: "Open daily · 6:00 AM – 9:00 PM",
  openingTime: "6:00 AM",
  closingTime: "9:00 PM",
  services: ["Dine-in", "Takeaway", "Table Reservations", "Executive Meetings"],
  highlights: [
    "Transparent Open Kitchen Theatre",
    "Town-Famous Chapati Beef & Samosas",
    "Signature Pork with Sweet Plantains",
    "Unhurried Town Center Meeting Atmosphere"
  ]
};

export const KITCHEN_STATIONS: KitchenStation[] = [
  {
    id: "tava-griddle",
    name: "The Artisan Tava Griddle",
    tagline: "Layered, Flaky Chapatis Made Fresh on Order",
    icon: "🫓",
    imageSrc: openKitchenChefImg,
    chefAction: "Rolling chilled wheat dough, brushing with pure ghee, and blistering golden layers on the seasoned cast-iron tava.",
    secret: "Each chapati is rolled with multiple delicate spiral folds to guarantee separation of layers when torn.",
    soundCue: "Sizzle of dough touching the seasoned iron tava",
    popularDishes: ["Chapati Beef Stew", "Fresh Tava Chapati", "Chapo Ndondo"]
  },
  {
    id: "stew-station",
    name: "The Slow-Simmered Stew Pots",
    tagline: "Rich Tomato-Onion Gravy & Local Tender Beef",
    icon: "🍲",
    imageSrc: chapatiBeefImg,
    chefAction: "Gentle 3-hour simmer of tender beef cuts with ripe highland plum tomatoes, caramelized sweet onions, garlic, and fresh dhania.",
    secret: "No artificial bouillon cubes—deep flavor comes from long bone broth reductions and Mt. Kenya highland aromatics.",
    soundCue: "Rhythmic bubbling of hearty beef gravy",
    popularDishes: ["Chapati Beef Stew", "Ugali Beef & Sukuma", "Matoke Beef Stew"]
  },
  {
    id: "pork-station",
    name: "The Sizzling Pork & Plantain Station",
    tagline: "Visitor's Crown Jewel for 3+ Years",
    icon: "🥩",
    imageSrc: porkPlantainsImg,
    chefAction: "Searing prime pork cuts with fresh ginger, cracked black pepper, and pairing with sweet golden fried matoke plantains.",
    secret: "Ripened Murang'a plantains are quickly flash-caramelized to create a sweet contrast against savory seasoned pork.",
    soundCue: "Crisp crackle of ginger-glazed pork in high heat",
    popularDishes: ["Pork Delicacy with Sweet Plantains", "Wet-Fry Pork Platter"]
  },
  {
    id: "samosa-fryer",
    name: "The Golden Samosa Fryer",
    tagline: "Murang'a's Crunchiest Pastry (12+ Reviews)",
    icon: "🥟",
    imageSrc: crispySamosasImg,
    chefAction: "Folding paper-thin pastry envelopes filled with seasoned minced beef, scallions, toasted cumin seeds, and frying to a blistered crunch.",
    secret: "The pastry is rolled ultra-thin by hand every morning at 5:30 AM before the town wakes up.",
    soundCue: "Crunch when sliced or bitten fresh",
    popularDishes: ["Crispy Beef Samosas", "Spiced Vegetable Samosas"]
  },
  {
    id: "chai-bar",
    name: "The Highland Chai & Kahawa Bar",
    tagline: "Fresh Highland Milk & Pounded Ginger Root",
    icon: "☕",
    imageSrc: masalaChaiImg,
    chefAction: "Steeping loose-leaf Central Kenya black tea in fresh dairy milk with hand-crushed ginger, cinnamon bark, and green cardamom.",
    secret: "Crushed fresh raw ginger is boiled together with the milk to extract soothing natural oils.",
    soundCue: "Whistling kettle and aroma of fresh ginger",
    popularDishes: ["Kenyan Spiced Masala Chai", "Deekei Kahawa Tungu", "Fresh Passion Juice"]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "chapati-beef",
    name: "Chapati Beef Stew",
    category: "signatures",
    price: 250,
    description: "Our signature flaky, golden layered chapatis served with slow-simmered tender beef stew cooked in rich tomato-onion gravy and fresh coriander. Served with crisp kachumbari.",
    popularHighlight: "Customer Favorite",
    prepTime: "12-15 mins",
    dietary: "Halal / Local Beef",
    imageAlt: "Golden layered Kenyan chapatis served with tender beef stew in rich tomato gravy",
    imageSrc: chapatiBeefImg,
    badge: "Menu Highlight",
    ingredients: ["Local grass-fed beef", "Hand-rolled wheat dough", "Ripe plum tomatoes", "Coriander (Dhania)", "Pure ghee", "Kachumbari"],
    spiceLevel: "Mild",
    pairing: "Pairs magnificently with a steaming mug of Kenyan Masala Chai.",
    portion: "2 Large Chapatis + Generous Bowl of Beef Stew + Salad",
    originStory: "A cornerstone of Kenyan hospitality. Our chefs roll each chapati immediately as your order is logged."
  },
  {
    id: "crispy-samosas-pair",
    name: "Crispy Beef Samosas (Pair of 2)",
    category: "bites",
    price: 100,
    description: "Praised across 12+ Google reviews as the crunchiest in Murang'a! Crisp hand-rolled pastry filled with seasoned minced beef, scallions, cumin, and fresh cilantro with lime.",
    popularHighlight: "Top Reviewed (12+ mentions)",
    prepTime: "5 mins",
    dietary: "Handmade Pastry",
    imageAlt: "Crispy golden triangular beef samosas with fresh lime and chili garnish",
    imageSrc: crispySamosasImg,
    badge: "Most Loved",
    ingredients: ["Spiced minced beef", "Spring onions", "Toasted cumin seeds", "Coriander", "Crisp handmade pastry", "Fresh lime"],
    spiceLevel: "Medium",
    pairing: "Perfect starter alongside a cold glass of fresh passion fruit juice.",
    portion: "2 Large Crisp Triangular Samosas",
    originStory: "Hand-folded daily since 2018 using our proprietary cumin-scented pastry crust."
  },
  {
    id: "pork-plantains",
    name: "Pork Delicacy with Sweet Plantains",
    category: "pork",
    price: 380,
    description: "Succulent pan-fried pork seasoned with ginger, garlic, and cracked pepper, paired with caramelized golden plantains (matoke) and sauteed fresh sukuma wiki greens.",
    popularHighlight: "Visitor's Top Choice",
    prepTime: "15-20 mins",
    dietary: "Pork Specialty",
    imageAlt: "Succulent spiced fried pork chunks with golden caramelized sweet plantains and greens",
    imageSrc: porkPlantainsImg,
    badge: "Chef Specialty",
    ingredients: ["Tender prime pork cuts", "Sweet ripe Murang'a plantains", "Fresh ginger root", "Garlic cloves", "Black peppercorns", "Sukuma wiki"],
    spiceLevel: "Medium",
    pairing: "Recommended with chilled mineral water or freshly pressed passion juice.",
    portion: "400g Savory Pork + 5 Caramelized Plantain Slices + Sautéed Greens",
    originStory: "Created after visitors asked for a traditional Mt. Kenya pork delicacy combined with the natural sweetness of local bananas."
  },
  {
    id: "ugali-beef-sukuma",
    name: "Hot Ugali, Beef Stew & Greens",
    category: "staples",
    price: 240,
    description: "Firm stone-ground white maize ugali served piping hot with tender simmered beef cubes and farm-fresh highland collard greens (sukuma wiki).",
    popularHighlight: "Daily Fuel",
    prepTime: "10 mins",
    dietary: "Wholesome Classic",
    imageAlt: "Steaming hot white ugali with tender beef stew and fresh sauteed greens",
    imageSrc: ugaliSukumaImg,
    badge: "Kenyan Soul Food",
    ingredients: ["Stone-ground white maize meal", "Tender beef cubes", "Highland collard greens", "Caramelized onions", "Beef bone broth"],
    spiceLevel: "Mild",
    pairing: "A tall glass of cold beverage or hot tea.",
    portion: "Generous Mound of Hot Ugali + Rich Beef Bowl + Collard Greens",
    originStory: "The definitive everyday fuel for hardworking Kenyans in the heart of Murang'a county."
  },
  {
    id: "wet-fry-pork-ugali",
    name: "Wet-Fry Pork Platter with Ugali",
    category: "pork",
    price: 350,
    description: "Tender pork cuts pan-glazed with ripe plum tomatoes, sweet red onions, and bird's eye chili, served with hot ugali and kachumbari.",
    popularHighlight: "Local Craving",
    prepTime: "15-18 mins",
    dietary: "Pork Specialty",
    imageAlt: "Sizzling wet-fry pork with onions, tomatoes and steaming hot ugali",
    imageSrc: porkPlantainsImg,
    ingredients: ["Pork belly & loin cuts", "Tomatoes", "Red onions", "Bird's eye chili", "Stone-milled ugali", "Fresh kachumbari"],
    spiceLevel: "Zesty",
    pairing: "Ice-cold soda or fresh tropical juice.",
    portion: "Sizzling Pork Bowl + Freshly Made Ugali",
    originStory: "Cooked in high heat on the wok right in front of the open dining counter."
  },
  {
    id: "chicken-pilau",
    name: "Swahili Chicken Pilau",
    category: "signatures",
    price: 320,
    description: "Aromatic basmati rice cooked gently in slow-simmered bone broth with toasted whole cloves, cardamom, cumin seeds, cinnamon bark, and spiced chicken.",
    popularHighlight: "Weekend Special",
    prepTime: "12 mins",
    dietary: "Aromatic Fragrance",
    imageAlt: "Aromatic spiced chicken pilau rice with fresh kachumbari tomato onion salad",
    imageSrc: chickenPilauImg,
    ingredients: ["Long-grain basmati rice", "Tender farm chicken", "Cardamom pods", "Cloves", "Cinnamon", "Cumin", "Kachumbari"],
    spiceLevel: "Mild",
    pairing: "Spicy kachumbari and a slice of ripe banana.",
    portion: "Fragrant Mountain of Pilau + Chicken Cut + Kachumbari",
    originStory: "Coastal spice heritage brought to the Mt. Kenya highlands."
  },
  {
    id: "veggie-samosas-pair",
    name: "Spiced Vegetable Samosas (Pair of 2)",
    category: "bites",
    price: 80,
    description: "Golden blistered pastry triangles stuffed with spiced potatoes, green garden peas, shredded carrots, and aromatic garam masala.",
    popularHighlight: "Vegetarian Pick",
    prepTime: "5 mins",
    dietary: "100% Vegetarian",
    imageAlt: "Golden fried vegetable samosas served with tangy tamarind dip",
    imageSrc: crispySamosasImg,
    ingredients: ["Highland potatoes", "Garden green peas", "Carrots", "Garam masala", "Coriander", "Pastry crust"],
    spiceLevel: "Medium",
    pairing: "Masala Chai or Black Spiced Coffee.",
    portion: "2 Large Pastries",
    originStory: "Loved by vegetarians and afternoon tea visitors looking for a savory crunch."
  },
  {
    id: "matoke-beef-stew",
    name: "Matoke Stew with Tender Beef",
    category: "staples",
    price: 260,
    description: "Tender green highland cooking bananas simmered gently with beef broth, sweet carrots, onions, and mild curry spices until melt-in-your-mouth soft.",
    popularHighlight: "Highland Comfort",
    prepTime: "12 mins",
    dietary: "Hearty Stew",
    imageAlt: "Traditional Kenyan matoke plantain stew with tender beef and vegetables",
    imageSrc: chapatiBeefImg,
    ingredients: ["Green cooking bananas (Matoke)", "Tender beef chunks", "Carrots", "Tomato concasse", "Mild highland curry spices"],
    spiceLevel: "Mild",
    pairing: "Flaky chapati or extra steamed spinach.",
    portion: "Deep Ceramic Bowl of Comforting Banana-Beef Stew",
    originStory: "A classic Kikuyu and Central Kenyan highland recipe that warms the soul on misty Murang'a mornings."
  },
  {
    id: "flaky-chapati-single",
    name: "Fresh Tava Chapati (Single)",
    category: "staples",
    price: 40,
    description: "Hand-rolled, multi-layered wheat chapati pan-seared to golden perfection right before your eyes in our open kitchen.",
    popularHighlight: "Freshly Made",
    prepTime: "Ready to Serve",
    dietary: "Vegetarian",
    imageAlt: "Freshly rolled golden layered Kenyan chapati on an open griddle",
    imageSrc: chapatiBeefImg,
    ingredients: ["Unbleached wheat flour", "Pure vegetable oil", "Warm water", "Pinch of salt & sugar", "Light ghee brush"],
    spiceLevel: "Mild",
    pairing: "Delicious with any stew or simply enjoyed dipped in hot tea.",
    portion: "1 Large Layered Chapati",
    originStory: "Our griddle runs continuously from 6:00 AM so your chapati is never cold or microwaved."
  },
  {
    id: "kenyan-masala-chai",
    name: "Steaming Kenyan Masala Chai",
    category: "drinks",
    price: 70,
    description: "Rich highland tea leaves boiled with fresh dairy milk, crushed ginger root, cinnamon, and whole cardamom pods.",
    popularHighlight: "Town Favorite",
    prepTime: "5 mins",
    dietary: "Fresh Milk / Spiced",
    imageAlt: "Steaming ceramic cup of spiced Kenyan milk chai with ginger and cardamom",
    imageSrc: masalaChaiImg,
    badge: "Must Try",
    ingredients: ["Murang'a dairy milk", "Highland black tea leaves", "Crushed fresh ginger root", "Cinnamon bark", "Green cardamom"],
    spiceLevel: "Mild",
    pairing: "Hot chapatis or crispy samosas.",
    portion: "Generous 350ml Ceramic Mug",
    originStory: "Brewed fresh in copper pots throughout the day to keep conversations flowing."
  },
  {
    id: "fresh-passion-juice",
    name: "Fresh Cold-Pressed Passion Juice (500ml)",
    category: "drinks",
    price: 120,
    description: "Pressed from Murang'a highland passion fruits, naturally sweet and tangy, chilled and served with ice.",
    popularHighlight: "100% Pure Fruit",
    prepTime: "3 mins",
    dietary: "Cold Pressed / Vegan",
    imageAlt: "Chilled glass carafe of fresh passion fruit juice with natural seeds and mint",
    imageSrc: passionJuiceImg,
    ingredients: ["Local Murang'a passion fruits", "Purified spring water", "Light natural cane sugar", "Fresh mint sprig"],
    spiceLevel: "Mild",
    pairing: "Cuts through rich roast pork and spicy samosas.",
    portion: "500ml Chilled Bottle",
    originStory: "Sourced directly from local smallholder orchards in Murang'a county."
  },
  {
    id: "kahawa-tungu",
    name: "Deekei Spiced Kahawa Tungu",
    category: "drinks",
    price: 60,
    description: "Traditional brewed black coffee infused with ground ginger, cinnamon, and cloves. Clean, invigorating, and perfect for meetings.",
    popularHighlight: "Meeting Brew",
    prepTime: "4 mins",
    dietary: "Sugar-free / Vegan",
    imageAlt: "Traditional glass cup of spiced Kenyan black coffee",
    imageSrc: masalaChaiImg,
    ingredients: ["Central Kenya Arabica coffee", "Ground dried ginger", "Cloves", "Cinnamon"],
    spiceLevel: "Medium",
    pairing: "Crispy beef samosas.",
    portion: "Traditional 250ml Glass Cup",
    originStory: "The favored drink for unhurried business and land discussions at Deekei."
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-unique-angel",
    author: "Unique Angel",
    role: "Google Local Guide · 13 reviews · 12 photos",
    reviewCount: 13,
    photoCount: 12,
    rating: 4,
    date: "1 month ago",
    text: "Its located at the heart of the town though its service is slow i wouldn't recommend this place if you are in a rush but if you have a meeting this is the place the meal are nice and fresh the waiting time can be long if you are in a rush but if not then this is the place to relax.",
    tags: ["location", "food", "reception"],
    helpfulCount: 4,
    verifiedVisit: true
  },
  {
    id: "rev-dickson-wachira",
    author: "Dickson G. Wachira",
    role: "Google Local Guide · 142 reviews · 1,106 photos",
    reviewCount: 142,
    photoCount: 1106,
    rating: 5,
    date: "5 years ago",
    text: "The café is within Murang'a Town and parking may be challenging especially during pick hours. The services at the hotel are great, especially with the open kitchen where you get to see and observe all that's being prepared and cooked. I love watching the fresh chapatis and stews coming straight to the tables.",
    tags: ["open kitchen", "chapatis", "food", "polite staff"],
    helpfulCount: 8,
    verifiedVisit: true
  },
  {
    id: "rev-isaac-macharia",
    author: "Isaac Macharia",
    role: "Google Local Contributor · 9 reviews · 1 photo",
    reviewCount: 9,
    photoCount: 1,
    rating: 5,
    date: "3 years ago (edited)",
    text: "The food was delicious... ambience was great and staff were very polite and helpful. Great place to grab something to eat and have a chat over a delicious meal.",
    tags: ["food", "polite staff", "reception"],
    helpfulCount: 3,
    verifiedVisit: true
  },
  {
    id: "rev-grace-wanjiru",
    author: "Grace Wanjiru",
    role: "Google Local Guide · 34 reviews · 28 photos",
    reviewCount: 34,
    photoCount: 28,
    rating: 5,
    date: "2 months ago",
    text: "Enjoy plantains served with pork! It is simply the best in Murang'a town. Portion sizes are generous and it easily stays within the Ksh 400 budget. The open kitchen cleanliness gave us total peace of mind.",
    tags: ["pork", "food", "open kitchen"],
    helpfulCount: 6,
    verifiedVisit: true
  },
  {
    id: "rev-kevin-mwangi",
    author: "Kevin Mwangi",
    role: "Verified Diner · 18 reviews",
    reviewCount: 18,
    photoCount: 6,
    rating: 5,
    date: "3 months ago",
    text: "The samosas are crispy and packed with genuine spiced beef, not just potatoes like other spots. You can see the chef frying them in the open kitchen. Authentic Murang'a warmth.",
    tags: ["samosas", "open kitchen", "food"],
    helpfulCount: 5,
    verifiedVisit: true
  },
  {
    id: "rev-peter-kariuki",
    author: "Peter Kariuki",
    role: "Google Local Guide · 57 reviews",
    reviewCount: 57,
    photoCount: 82,
    rating: 4,
    date: "6 months ago",
    text: "Very convenient spot in town for catching up with colleagues. The chapati beef was hot and savory. Honest prices for quality Kenyan comfort food.",
    tags: ["chapatis", "food", "location"],
    helpfulCount: 2,
    verifiedVisit: true
  }
];

export const POPULAR_TIMES = [
  { hour: "6 AM", label: "6a", busy: 22, note: "Fresh tea & hot samosas straight off the morning fryer" },
  { hour: "9 AM", label: "9a", busy: 48, note: "Morning breakfast & business meeting catch-ups" },
  { hour: "12 PM", label: "12p", busy: 92, note: "Peak lunch rush · Open kitchen in full theatrical swing" },
  { hour: "3 PM", label: "3p", busy: 42, note: "Relaxed afternoon tea, chapatis, coffee & discussions" },
  { hour: "6 PM", label: "6p", busy: 78, note: "Dinner crowd & takeaway pork platters" },
  { hour: "9 PM", label: "9p", busy: 18, note: "Closing time · Last orders & kitchen wrap" }
];

export const DEEKEI_MASTER_PROMPT = {
  title: "Deekei Restaurant Master AI Brand & Marketing Prompt",
  description: "Designed for marketing managers, content creators, and AI assistants to generate on-brand copy, social media campaigns, menus, and imagery for Deekei Restaurant in Murang'a.",
  systemPrompt: `You are the master brand voice and marketing strategist for "Deekei Restaurant", a beloved local dining destination located at the heart of Murang'a Town, Kenya (Plus Code: 75H5+9W Murang'a). 

BRAND IDENTITY & PROFILE:
- Location: Murang'a Town, Kenya (Murang'a 4 Deekei)
- Core Ethos: Authentic Kenyan comfort dining, genuine open-kitchen culinary theatre where guests observe their chapatis hand-rolled and stews simmered, and an unhurried, warm town-center meeting place.
- Google Rating: 4.0 Stars (112 reviews)
- Pricing Philosophy: Affordable quality (Ksh 1–500 per person), accessible to local business professionals, students, families, and travelers.
- Signatures: Soft flaky Chapati Beef, crispy handcrafted beef Samosas (12+ reviews), succulent fried Pork with sweet caramelized Plantains (Matoke), stone-ground Ugali with tender meats and sukuma wiki, fresh passion juices, and spiced Kenyan Masala Chai.
- Tone of Voice: Warm, welcoming, respectful, proud of Kenyan hospitality and Mt. Kenya highland agricultural roots, transparent, and conversational.

COMMUNICATION GUIDELINES:
1. Always weave in genuine sensory details (the crackle of fresh chapatis on the griddle, the rich aroma of slow-simmered beef stew, the golden crunch of samosas).
2. Highlight the Open Kitchen transparency—patrons can see every ingredient prepared fresh before their eyes.
3. Acknowledge our relaxed pace: We do not serve rushed fast food; meals are prepared fresh, making Deekei the premier spot in Murang'a Town to relax, catch up, and hold business discussions.
4. Keep prices grounded in Kenyan Shillings (Ksh) and highlight takeaway + dine-in options.
5. Primary Contact & Location: WhatsApp/Call: 0700 173251 · Location: Murang'a 4 Deekei · Plus Code: 75H5+9W Murang'a.`,
  socialMediaPrompt: `Create a week-long social media calendar (TikTok video concepts, Instagram Reels captions, and WhatsApp Status updates) for Deekei Restaurant in Murang'a Town. Focus on:
1. "Meet the Open Kitchen": Highlighting how fresh chapatis are hand-rolled and cooked on the hot griddle.
2. "Lunch Rush Special": Showcasing our famous Chapati Beef and Pork with Sweet Plantains under Ksh 400.
3. "The Ultimate Murang'a Samosa Test": 12+ Google reviews praise our crispy pastry.
Include Swahili/Sheng warmth ("Karibu Deekei", "Choma na Chapo moto"), Murang'a Town location markers, and WhatsApp order CTA (+254 700 173251).`,
  imagePrompt: `Cinematic documentary food photography of authentic Kenyan dining at Deekei Restaurant in Murang'a Town. Golden layered flaky chapatis steaming beside a rich, slow-simmered beef stew in an earthenware bowl, accompanied by fresh red onion-tomato kachumbari and a cup of spiced masala tea. Warm ambient lighting, rustic wooden table, lively open kitchen background where local chefs prepare fresh food. Shot on 35mm lens, shallow depth of field, authentic Kenyan culinary heritage.`
};
