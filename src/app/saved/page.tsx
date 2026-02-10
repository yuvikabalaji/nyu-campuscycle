"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { ListingCard } from "@/components/ListingCard";
import { EmptyState } from "@/components/empty-states/EmptyState";

export default function SavedPage() {
  const { listings, savedIds } = useStore();
  const savedListings = listings.filter((l) => savedIds.includes(l.id));

  if (savedListings.length === 0) {
    return (
      <div className="px-3 py-6 sm:px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Saved
        </h1>
        <EmptyState
          icon={<Heart className="h-12 w-12" />}
          title="No saved items"
          description="Save listings you like by tapping the heart. They’ll show up here."
          action={
            <Link
              href="/market"
              className="inline-block rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
            >
              Browse listings
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-3 py-4 sm:px-4">
      <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Saved ({savedListings.length})
      </h1>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {savedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} showMessage={true} />
        ))}
      </div>
    </div>
  );
}
