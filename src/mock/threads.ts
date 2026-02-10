import type { MessageThread } from "@/lib/types";

// Demo threads aligned with the 5 sample listings.
export const MOCK_THREADS: MessageThread[] = [
  // Listing 1 - Calculus textbook @ Bobst
  {
    id: "t1",
    listingId: "1",
    listingTitle: "Calculus textbook for MATH-UA 121",
    buyerName: "You",
    sellerName: "You",
    messages: [
      {
        id: "m1",
        sender: "buyer",
        text: "Is this still available?",
        sentAt: "2025-02-05T10:00:00Z",
      },
      {
        id: "m2",
        sender: "seller",
        text: "Yes! I can do Bobst tomorrow afternoon.",
        sentAt: "2025-02-05T10:15:00Z",
      },
      {
        id: "m3",
        sender: "buyer",
        text: "Perfect, I'll be there around 2. See you!",
        sentAt: "2025-02-05T10:20:00Z",
      },
    ],
  },

  // Listing 2 - MacBook @ Kimmel
  {
    id: "t2",
    listingId: "2",
    listingTitle: "MacBook Air M1 2020 - 8GB/256GB",
    buyerName: "You",
    sellerName: "Jordan",
    messages: [
      {
        id: "m4",
        sender: "buyer",
        text: "Would you take $600?",
        sentAt: "2025-02-06T09:00:00Z",
      },
      {
        id: "m5",
        sender: "seller",
        text: "Lowest I can do is $620. It's in great shape.",
        sentAt: "2025-02-06T09:30:00Z",
      },
    ],
  },

  // Listing 3 - Mattress topper @ 7th St
  {
    id: "t3",
    listingId: "3",
    listingTitle: "Twin XL mattress topper (memory foam)",
    buyerName: "You",
    sellerName: "Sam",
    messages: [
      {
        id: "m6",
        sender: "seller",
        text: "Hey, when works for pickup? I'm in 7th St dorm.",
        sentAt: "2025-02-07T11:00:00Z",
      },
      {
        id: "m7",
        sender: "buyer",
        text: "Tomorrow after 4pm?",
        sentAt: "2025-02-07T11:05:00Z",
      },
      {
        id: "m8",
        sender: "seller",
        text: "Sounds good, lobby at 4:30?",
        sentAt: "2025-02-07T11:10:00Z",
      },
      {
        id: "m9",
        sender: "buyer",
        text: "Done. See you then!",
        sentAt: "2025-02-07T11:12:00Z",
      },
    ],
  },

  // Listing 4 - Desk chair @ Third North
  {
    id: "t4",
    listingId: "4",
    listingTitle: "Office desk chair (mesh back)",
    buyerName: "You",
    sellerName: "Casey",
    messages: [
      {
        id: "m10",
        sender: "buyer",
        text: "Does it recline and do the armrests adjust?",
        sentAt: "2025-02-08T14:00:00Z",
      },
      {
        id: "m11",
        sender: "seller",
        text: "Yes, both tilt and armrests are adjustable.",
        sentAt: "2025-02-08T14:15:00Z",
      },
    ],
  },

  // Listing 5 - Free hangers @ Tandon
  {
    id: "t5",
    listingId: "5",
    listingTitle: "Assorted hangers (20 pack) - FREE",
    buyerName: "You",
    sellerName: "Riley",
    messages: [
      {
        id: "m12",
        sender: "buyer",
        text: "I'll swing by Tandon lobby after class to grab these.",
        sentAt: "2025-02-09T09:00:00Z",
      },
    ],
  },
];
