// Categories from PRD
export const LISTING_CATEGORIES = [
  "Textbooks & Course Materials",
  "Electronics",
  "Dorm Essentials",
  "Small Furniture",
  "Misc",
] as const;
export type ListingCategory = (typeof LISTING_CATEGORIES)[number];

export const CONDITIONS = ["New", "Like New", "Good", "Fair"] as const;
export type Condition = (typeof CONDITIONS)[number];

export const PICKUP_SPOTS = [
  "Bobst Library",
  "Kimmel Center",
  "Tandon",
  "Dorm Lobby (7th St)",
  "Dorm Lobby (Third North)",
  "Palladium",
  "Weinstein",
  "Other (message me)",
] as const;
export type PickupSpot = (typeof PICKUP_SPOTS)[number];

export const LISTING_STATUSES = ["available", "pending", "sold"] as const;
export type ListingStatus = (typeof LISTING_STATUSES)[number];

export interface Seller {
  id: string;
  name: string;
  gradYear: number;
  verifiedDemo: boolean;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  category: ListingCategory;
  condition: Condition;
  images: string[];
  pickupSpots: PickupSpot[];
  availableFrom?: string;
  availableTo?: string;
  status: ListingStatus;
  seller: Seller;
  postedAt: string;
  updatedAt: string;
  /** Seller-facing: mock view count */
  viewCount?: number;
  /** Seller-facing: mock saves count */
  savesCount?: number;
}

export const REQUEST_STATUSES = ["new", "accepted", "declined"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export interface BuyerRequest {
  id: string;
  listingId: string;
  buyerName: string;
  buyerGradYear?: number;
  message: string;
  offerPrice?: number;
  status: RequestStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: "buyer" | "seller";
  text: string;
  sentAt: string;
}

export interface MessageThread {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  sellerName: string;
  messages: Message[];
}

export interface Filters {
  query: string;
  category: ListingCategory | "";
  priceMin: number | "";
  priceMax: number | "";
  condition: Condition | "";
  pickupSpot: PickupSpot | "";
  status: ListingStatus | "";
  freeOnly: boolean;
}
