import type { BuyerRequest } from "@/lib/types";

// Demo requests mapped onto the 5 sample listings.
export const MOCK_BUYER_REQUESTS: BuyerRequest[] = [
  // Listing 1 - Calculus textbook @ Bobst
  {
    id: "req1",
    listingId: "1",
    buyerName: "Morgan",
    buyerGradYear: 2027,
    message:
      "Is this still available? Can I pick up at Bobst tomorrow afternoon?",
    offerPrice: 55,
    status: "new",
    createdAt: "2025-02-09T09:00:00Z",
  },
  {
    id: "req2",
    listingId: "1",
    buyerName: "Taylor",
    buyerGradYear: 2025,
    message:
      "Would you take $50? I can meet at Bobst any day this week.",
    offerPrice: 50,
    status: "new",
    createdAt: "2025-02-09T10:30:00Z",
  },

  // Listing 2 - MacBook @ Kimmel
  {
    id: "req3",
    listingId: "2",
    buyerName: "Casey",
    buyerGradYear: 2025,
    message:
      "Would you take $620 for the MacBook? Cash, can pick up at Kimmel today.",
    offerPrice: 620,
    status: "new",
    createdAt: "2025-02-09T11:00:00Z",
  },
  {
    id: "req4",
    listingId: "2",
    buyerName: "Riley",
    buyerGradYear: 2027,
    message:
      "Is the battery still good? Roughly how many charge cycles does it have?",
    status: "new",
    createdAt: "2025-02-09T08:15:00Z",
  },

  // Listing 3 - Mattress topper @ 7th St
  {
    id: "req5",
    listingId: "3",
    buyerName: "Jordan",
    buyerGradYear: 2026,
    message:
      "Interested in the mattress topper. Any stains or tears I should know about?",
    status: "accepted",
    createdAt: "2025-02-08T14:00:00Z",
  },

  // Listing 5 - Free hangers @ Tandon
  {
    id: "req6",
    listingId: "5",
    buyerName: "Quinn",
    buyerGradYear: 2026,
    message:
      "I'll take the free hangers! Can we meet near Tandon lobby later today?",
    status: "new",
    createdAt: "2025-02-08T18:00:00Z",
  },
];
