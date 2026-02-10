"use client";

import React, { createContext, useCallback, useContext, useReducer } from "react";
import type {
  BuyerRequest,
  Filters,
  Listing,
  ListingStatus,
  Message,
  MessageThread,
  RequestStatus,
} from "@/lib/types";
import { MOCK_LISTINGS } from "@/mock/listings";
import { MOCK_THREADS } from "@/mock/threads";
import { MOCK_BUYER_REQUESTS } from "@/mock/requests";
import { DEMO_SELLER_ID } from "@/mock/listings";

export type AppMode = "buyer" | "seller";

interface StoreState {
  currentMode: AppMode;
  listings: Listing[];
  savedIds: string[];
  threads: MessageThread[];
  buyerRequests: BuyerRequest[];
  filters: Filters;
}

const initialFilters: Filters = {
  query: "",
  category: "",
  priceMin: "",
  priceMax: "",
  condition: "",
  pickupSpot: "",
  status: "",
  freeOnly: false,
};

const initialState: StoreState = {
  currentMode: "buyer",
  listings: [...MOCK_LISTINGS],
  savedIds: [],
  threads: [...MOCK_THREADS],
  buyerRequests: [...MOCK_BUYER_REQUESTS],
  filters: initialFilters,
};

type StoreAction =
  | { type: "SET_MODE"; payload: AppMode }
  | { type: "SET_FILTERS"; payload: Partial<Filters> }
  | { type: "SEARCH"; payload: string }
  | { type: "TOGGLE_SAVE"; payload: string }
  | { type: "CREATE_LISTING"; payload: Listing }
  | { type: "UPDATE_LISTING"; payload: { id: string; updates: Partial<Listing> } }
  | { type: "DELETE_LISTING"; payload: string }
  | { type: "MARK_LISTING_STATUS"; payload: { listingId: string; status: ListingStatus } }
  | { type: "SEND_MESSAGE"; payload: { threadId: string; message: Message } }
  | { type: "ADD_THREAD"; payload: MessageThread }
  | { type: "SET_REQUEST_STATUS"; payload: { requestId: string; status: RequestStatus } };

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, currentMode: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SEARCH":
      return { ...state, filters: { ...state.filters, query: action.payload } };
    case "TOGGLE_SAVE": {
      const id = action.payload;
      const savedIds = state.savedIds.includes(id)
        ? state.savedIds.filter((s) => s !== id)
        : [...state.savedIds, id];
      return { ...state, savedIds };
    }
    case "CREATE_LISTING":
      return { ...state, listings: [action.payload, ...state.listings] };
    case "UPDATE_LISTING": {
      const { id, updates } = action.payload;
      return {
        ...state,
        listings: state.listings.map((l) =>
          l.id === id
            ? { ...l, ...updates, updatedAt: new Date().toISOString() }
            : l
        ),
      };
    }
    case "DELETE_LISTING":
      return {
        ...state,
        listings: state.listings.filter((l) => l.id !== action.payload),
      };
    case "MARK_LISTING_STATUS": {
      const { listingId, status } = action.payload;
      return {
        ...state,
        listings: state.listings.map((l) =>
          l.id === listingId ? { ...l, status, updatedAt: new Date().toISOString() } : l
        ),
      };
    }
    case "SEND_MESSAGE": {
      const { threadId, message } = action.payload;
      return {
        ...state,
        threads: state.threads.map((t) =>
          t.id === threadId ? { ...t, messages: [...t.messages, message] } : t
        ),
      };
    }
    case "ADD_THREAD":
      return { ...state, threads: [action.payload, ...state.threads] };
    case "SET_REQUEST_STATUS": {
      const { requestId, status } = action.payload;
      return {
        ...state,
        buyerRequests: state.buyerRequests.map((r) =>
          r.id === requestId ? { ...r, status } : r
        ),
      };
    }
    default:
      return state;
  }
}

interface StoreContextValue extends StoreState {
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  setFilters: (filters: Partial<Filters>) => void;
  search: (query: string) => void;
  toggleSave: (listingId: string) => void;
  createListing: (listing: Listing) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  markListingStatus: (listingId: string, status: ListingStatus) => void;
  sendMessage: (threadId: string, message: Message) => void;
  addThread: (thread: MessageThread) => void;
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  getListingById: (id: string) => Listing | undefined;
  getThreadById: (id: string) => MessageThread | undefined;
  getOrCreateThreadForListing: (listing: Listing) => MessageThread;
  getListingsBySellerId: (sellerId: string) => Listing[];
  getRequestsForSeller: (sellerId: string) => BuyerRequest[];
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const setMode = useCallback((mode: AppMode) => {
    dispatch({ type: "SET_MODE", payload: mode });
  }, []);

  const toggleMode = useCallback(() => {
    dispatch({ type: "SET_MODE", payload: state.currentMode === "buyer" ? "seller" : "buyer" });
  }, [state.currentMode]);

  const setFilters = useCallback((payload: Partial<Filters>) => {
    dispatch({ type: "SET_FILTERS", payload });
  }, []);

  const search = useCallback((query: string) => {
    dispatch({ type: "SEARCH", payload: query });
  }, []);

  const toggleSave = useCallback((listingId: string) => {
    dispatch({ type: "TOGGLE_SAVE", payload: listingId });
  }, []);

  const createListing = useCallback((listing: Listing) => {
    dispatch({ type: "CREATE_LISTING", payload: listing });
  }, []);

  const updateListing = useCallback((id: string, updates: Partial<Listing>) => {
    dispatch({ type: "UPDATE_LISTING", payload: { id, updates } });
  }, []);

  const deleteListing = useCallback((id: string) => {
    dispatch({ type: "DELETE_LISTING", payload: id });
  }, []);

  const markListingStatus = useCallback((listingId: string, status: ListingStatus) => {
    dispatch({ type: "MARK_LISTING_STATUS", payload: { listingId, status } });
  }, []);

  const sendMessage = useCallback((threadId: string, message: Message) => {
    dispatch({ type: "SEND_MESSAGE", payload: { threadId, message } });
  }, []);

  const addThread = useCallback((thread: MessageThread) => {
    dispatch({ type: "ADD_THREAD", payload: thread });
  }, []);

  const acceptRequest = useCallback((requestId: string) => {
    dispatch({ type: "SET_REQUEST_STATUS", payload: { requestId, status: "accepted" } });
  }, []);

  const declineRequest = useCallback((requestId: string) => {
    dispatch({ type: "SET_REQUEST_STATUS", payload: { requestId, status: "declined" } });
  }, []);

  const getListingById = useCallback(
    (id: string) => state.listings.find((l) => l.id === id),
    [state.listings]
  );

  const getThreadById = useCallback(
    (id: string) => state.threads.find((t) => t.id === id),
    [state.threads]
  );

  const getOrCreateThreadForListing = useCallback(
    (listing: Listing): MessageThread => {
      const existing = state.threads.find((t) => t.listingId === listing.id);
      if (existing) return existing;
      const newThread: MessageThread = {
        id: `t-${listing.id}-${Date.now()}`,
        listingId: listing.id,
        listingTitle: listing.title,
        buyerName: "You",
        sellerName: listing.seller.name,
        messages: [],
      };
      dispatch({ type: "ADD_THREAD", payload: newThread });
      return newThread;
    },
    [state.threads]
  );

  const getListingsBySellerId = useCallback(
    (sellerId: string) => state.listings.filter((l) => l.seller.id === sellerId),
    [state.listings]
  );

  const getRequestsForSeller = useCallback(
    (sellerId: string) => {
      const sellerListingIds = new Set(
        state.listings.filter((l) => l.seller.id === sellerId).map((l) => l.id)
      );
      return state.buyerRequests.filter((r) => sellerListingIds.has(r.listingId));
    },
    [state.listings, state.buyerRequests]
  );

  const value: StoreContextValue = {
    ...state,
    setMode,
    toggleMode,
    setFilters,
    search,
    toggleSave,
    createListing,
    updateListing,
    deleteListing,
    markListingStatus,
    sendMessage,
    addThread,
    acceptRequest,
    declineRequest,
    getListingById,
    getThreadById,
    getOrCreateThreadForListing,
    getListingsBySellerId,
    getRequestsForSeller,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
