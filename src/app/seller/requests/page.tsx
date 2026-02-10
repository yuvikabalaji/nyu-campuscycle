"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Check, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";
import { DEMO_SELLER_ID } from "@/mock/listings";
import { EmptyState } from "@/components/empty-states/EmptyState";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SellerRequestsPage() {
  const router = useRouter();
  const { getRequestsForSeller, getListingById, acceptRequest, declineRequest, getOrCreateThreadForListing } = useStore();
  const { toast } = useToast();

  const requests = getRequestsForSeller(DEMO_SELLER_ID);
  const newRequests = requests.filter((r) => r.status === "new");

  const handleAccept = (requestId: string) => {
    acceptRequest(requestId);
    toast("Offer accepted");
  };

  const handleDecline = (requestId: string) => {
    declineRequest(requestId);
    toast("Offer declined");
  };

  const handleMessageBuyer = (listingId: string) => {
    const listing = getListingById(listingId);
    if (listing) {
      const thread = getOrCreateThreadForListing(listing);
      router.push(`/messages/${thread.id}`);
    }
  };

  if (requests.length === 0) {
    return (
      <div className="px-3 py-6 sm:px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Buyer Requests
        </h1>
        <EmptyState
          title="No new buyer requests yet"
          description="When buyers message you or make offers on your listings, they’ll show up here."
        />
      </div>
    );
  }

  return (
    <div className="px-3 py-6 sm:px-4 lg:px-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Buyer Requests
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {newRequests.length} new request(s)
      </p>

      <ul className="mt-6 space-y-4">
        {requests.map((req) => {
          const listing = getListingById(req.listingId);
          return (
            <li
              key={req.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {req.buyerName}
                    {req.buyerGradYear != null && (
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        Class of {req.buyerGradYear}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm font-medium text-nyu-purple">
                    {listing?.title ?? req.listingId}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {req.message}
                  </p>
                  {req.offerPrice != null && req.offerPrice > 0 && (
                    <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Offer: ${req.offerPrice}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    {formatDate(req.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {req.status === "new" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAccept(req.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-nyu-purple px-3 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
                      >
                        <Check className="h-4 w-4" />
                        Accept Offer
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDecline(req.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        <X className="h-4 w-4" />
                        Decline
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleMessageBuyer(req.listingId)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message Buyer
                  </button>
                </div>
              </div>
              {req.status !== "new" && (
                <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status: {req.status}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
