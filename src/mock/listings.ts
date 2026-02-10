import type { Listing } from "@/lib/types";

// Unsplash: real photos that match each item. Format photo-{id}?w=&h=&fit=crop
const size = "400";
const u = (id: string, h = "400") =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${h}&fit=crop`;

// Local images (your provided assets) for calculator, office chair, hangers.
const local = (path: string) => path;

// Curated images for the 5 demo listings (Unsplash for textbook/laptop/mattress; local for chair/hangers).
const IMG = {
  // 1) Calculus textbook – stack of books
  textbook: u("1495446815901-a7297e633e8d", "500"),
  // 2) MacBook – laptop on desk
  laptop: u("1496181133206-80ce9b88a853"),
  // 3) Mattress topper – bed / mattress
  mattress: u("1522771739844-6a9f6d5f14af"),
  // 4) Office desk chair – your provided image
  deskChair: local("/images/office-chair.png"),
  // 5) Hangers – your provided image
  hangers: local("/images/hangers.png"),
  // Calculator – your provided image (for future use)
  calculator: local("/images/calculator.png"),
} as const;

/** Demo seller (current user in seller mode) */
export const DEMO_SELLER_ID = "seller_demo_1";
const sellerDemo = {
  id: DEMO_SELLER_ID,
  name: "You",
  gradYear: 2026,
  verifiedDemo: true,
};

const sellers = [
  sellerDemo,
  { id: "s2", name: "Jordan", gradYear: 2026, verifiedDemo: true },
  { id: "s3", name: "Sam", gradYear: 2024, verifiedDemo: true },
  { id: "s4", name: "Casey", gradYear: 2025, verifiedDemo: true },
  { id: "s5", name: "Riley", gradYear: 2027, verifiedDemo: true },
];

// Demo: keep only 5 listings, each with a different category and pickup spot.
export const MOCK_LISTINGS: Listing[] = [
  // 1) Textbook @ Bobst
  {
    id: "1",
    title: "Calculus textbook for MATH-UA 121",
    description:
      "Single semester of use, some neat highlighting. No torn pages.",
    price: 60,
    isFree: false,
    category: "Textbooks & Course Materials",
    condition: "Good",
    images: [IMG.textbook],
    pickupSpots: ["Bobst Library"],
    status: "available",
    seller: sellers[0],
    postedAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-02-01T10:00:00Z",
    viewCount: 24,
    savesCount: 3,
  },

  // 2) Laptop @ Kimmel
  {
    id: "2",
    title: "MacBook Air M1 2020 - 8GB/256GB",
    description:
      "Great condition, battery health around 90%. Includes original charger.",
    price: 650,
    isFree: false,
    category: "Electronics",
    condition: "Like New",
    images: [IMG.laptop],
    pickupSpots: ["Kimmel Center"],
    status: "available",
    seller: sellers[1],
    postedAt: "2025-02-02T14:00:00Z",
    updatedAt: "2025-02-02T14:00:00Z",
    viewCount: 89,
    savesCount: 12,
  },

  // 3) Mattress topper @ 7th St dorm
  {
    id: "3",
    title: "Twin XL mattress topper (memory foam)",
    description: "2\" memory foam topper. Used one year, very clean.",
    price: 35,
    isFree: false,
    category: "Dorm Essentials",
    condition: "Good",
    images: [IMG.mattress],
    pickupSpots: ["Dorm Lobby (7th St)"],
    status: "available",
    seller: sellers[2],
    postedAt: "2025-02-03T09:00:00Z",
    updatedAt: "2025-02-03T09:00:00Z",
    viewCount: 18,
    savesCount: 4,
  },

  // 4) Desk chair @ Third North
  {
    id: "4",
    title: "Office desk chair (mesh back)",
    description: "Ergonomic chair with adjustable height and tilt.",
    price: 55,
    isFree: false,
    category: "Small Furniture",
    condition: "Good",
    images: [IMG.deskChair],
    pickupSpots: ["Dorm Lobby (Third North)"],
    status: "available",
    seller: sellers[3],
    postedAt: "2025-02-04T11:00:00Z",
    updatedAt: "2025-02-04T11:00:00Z",
    viewCount: 21,
    savesCount: 5,
  },

  // 5) Free hangers @ Tandon
  {
    id: "5",
    title: "Assorted hangers (20 pack) - FREE",
    description:
      "Mix of velvet and plastic hangers. Perfect for a new dorm closet.",
    price: 0,
    isFree: true,
    category: "Misc",
    condition: "Good",
    images: [IMG.hangers],
    pickupSpots: ["Tandon"],
    status: "available",
    seller: sellers[4],
    postedAt: "2025-02-05T16:00:00Z",
    updatedAt: "2025-02-05T16:00:00Z",
    viewCount: 32,
    savesCount: 9,
  },
];
