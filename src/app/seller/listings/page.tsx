"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlusCircle, Pencil, Trash2, Zap, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";
import { DEMO_SELLER_ID } from "@/mock/listings";
import { EmptyState } from "@/components/empty-states/EmptyState";
import type { ListingStatus } from "@/lib/types";

const statusTabs: { value: ListingStatus | ""; label: string }[] = [
  { value: "", label: "All" },
  { value: "available", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
];

export default function SellerListingsPage() {
  const router = useRouter();
  const { getListingsBySellerId, markListingStatus, deleteListing } = useStore();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<ListingStatus | "">("");

  const listings = getListingsBySellerId(DEMO_SELLER_ID);
  const filtered =
    statusFilter === ""
      ? listings
      : listings.filter((l) => l.status === statusFilter);

  const handleMarkSold = (id: string) => {
    markListingStatus(id, "sold");
    toast("Marked as sold");
  };

  const handleDelete = (id: string) => {
    if (typeof window !== "undefined" && window.confirm("Delete this listing?")) {
      deleteListing(id);
      toast("Listing deleted");
    }
  };

  const handleBoost = () => {
    toast("Boost is coming soon (demo)");
  };

  if (listings.length === 0) {
    return (
      <div className="px-3 py-6 sm:px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          My Listings
        </h1>
        <EmptyState
          title="No listings yet"
          description="Create your first listing to start selling on campus."
          action={
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light"
            >
              <PlusCircle className="h-4 w-4" />
              Create your first listing
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-3 py-6 sm:px-4 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          My Listings
        </h1>
        <Link
          href="/sell"
          className="inline-flex items-center gap-2 rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create New Listing
        </Link>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {statusTabs.map(({ value, label }) => (
          <button
            key={value || "all"}
            type="button"
            onClick={() => setStatusFilter(value)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              statusFilter === value
                ? "bg-nyu-purple text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <Link
              href={`/listing/${listing.id}`}
              className="relative aspect-square bg-gray-100 dark:bg-gray-800"
            >
              <Image
                src={listing.images[0] ?? "/placeholder.svg"}
                alt={listing.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
                unoptimized={listing.images[0]?.startsWith("data:")}
              />
              <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                {listing.status}
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-3">
              <Link
                href={`/listing/${listing.id}`}
                className="font-semibold text-gray-900 line-clamp-2 hover:text-nyu-purple dark:text-gray-100"
              >
                {listing.title}
              </Link>
              <p className="mt-1 text-sm font-medium text-nyu-purple">
                {listing.isFree ? "Free" : `$${listing.price}`}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => router.push(`/seller/listings/${listing.id}/edit`)}
                  className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  aria-label="Edit"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                {listing.status === "available" && (
                  <button
                    type="button"
                    onClick={() => handleMarkSold(listing.id)}
                    className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    aria-label="Mark as sold"
                  >
                    <Check className="h-3 w-3" />
                    Mark Sold
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleBoost()}
                  className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  aria-label="Boost"
                >
                  <Zap className="h-3 w-3" />
                  Boost
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(listing.id)}
                  className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                  aria-label="Delete"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          No listings match this filter.
        </p>
      )}
    </div>
  );
}
