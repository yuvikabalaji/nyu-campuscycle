"use client";

import React from "react";
import Link from "next/link";
import { Package, Inbox, DollarSign, TrendingUp, PlusCircle, Lightbulb } from "lucide-react";
import { useStore } from "@/lib/store";
import { DEMO_SELLER_ID } from "@/mock/listings";

export function SellerDashboardView() {
  const { getListingsBySellerId, getRequestsForSeller } = useStore();
  const listings = getListingsBySellerId(DEMO_SELLER_ID);
  const allRequests = getRequestsForSeller(DEMO_SELLER_ID);

  const activeListings = listings.filter((l) => l.status === "available").length;
  const pendingRequests = allRequests.filter((r) => r.status === "new").length;
  const soldCount = listings.filter((l) => l.status === "sold").length;
  const revenue = listings
    .filter((l) => l.status === "sold")
    .reduce((sum, l) => sum + l.price, 0);

  const recentListings = listings.slice(0, 5);
  const recentRequests = allRequests.filter((r) => r.status === "new").slice(0, 5);

  return (
    <div className="px-3 py-6 sm:px-4 lg:px-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Seller Dashboard
      </h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Package className="h-5 w-5" />
            <span className="text-sm font-medium">Active Listings</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{activeListings}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Inbox className="h-5 w-5" />
            <span className="text-sm font-medium">Pending Requests</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{pendingRequests}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Items Sold</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{soldCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <DollarSign className="h-5 w-5" />
            <span className="text-sm font-medium">Revenue Earned</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">${revenue}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">My Listings</h2>
              <Link href="/seller/listings" className="text-sm font-medium text-nyu-purple hover:underline">View all</Link>
            </div>
            {recentListings.length === 0 ? (
              <>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No listings yet. Create your first listing to start selling.</p>
                <Link href="/sell" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-nyu-purple px-3 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light">
                  <PlusCircle className="h-4 w-4" /> Create Listing
                </Link>
              </>
            ) : (
              <ul className="mt-4 space-y-2">
                {recentListings.map((l) => (
                  <li key={l.id}>
                    <Link href={`/seller/listings/${l.id}/edit`} className="flex items-center justify-between rounded-lg border border-gray-100 py-2 px-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                      <span className="truncate text-sm font-medium">{l.title}</span>
                      <span className="shrink-0 text-sm text-gray-500">{l.status}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">Recent Buyer Requests</h2>
              <Link href="/seller/requests" className="text-sm font-medium text-nyu-purple hover:underline">View all</Link>
            </div>
            {recentRequests.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No new buyer requests yet.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {recentRequests.map((r) => (
                  <li key={r.id} className="rounded-lg border border-gray-100 py-2 px-3 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{r.buyerName}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{r.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
        <aside className="w-full lg:w-72">
          <div className="rounded-xl border border-nyu-purple/20 bg-nyu-purple/5 p-4 dark:bg-nyu-purple/10">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
              <Lightbulb className="h-5 w-5 text-nyu-purple" /> Tips to sell faster
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Use clear photos and an accurate description.</li>
              <li>Price fairly. Check similar items on the market.</li>
              <li>Offer flexible pickup times at busy spots (Bobst, Kimmel).</li>
              <li>Reply to buyer messages quickly.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
