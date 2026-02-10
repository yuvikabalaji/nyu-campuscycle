"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { ListingCard } from "@/components/ListingCard";
import { ListingCardSkeleton } from "@/components/skeletons/ListingCardSkeleton";
import { FilterDrawer } from "@/components/FilterDrawer";
import { EmptyState } from "@/components/empty-states/EmptyState";
import type { Listing, Filters } from "@/lib/types";

function filterListings(listings: Listing[], filters: Filters): Listing[] {
  return listings.filter((listing) => {
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      const match =
        listing.title.toLowerCase().includes(q) ||
        listing.description.toLowerCase().includes(q) ||
        listing.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.category && listing.category !== filters.category) return false;
    if (
      filters.priceMin !== "" &&
      filters.priceMin !== undefined &&
      listing.price < Number(filters.priceMin)
    )
      return false;
    if (
      filters.priceMax !== "" &&
      filters.priceMax !== undefined &&
      listing.price > Number(filters.priceMax)
    )
      return false;
    if (filters.condition && listing.condition !== filters.condition)
      return false;
    if (
      filters.pickupSpot &&
      !listing.pickupSpots.includes(filters.pickupSpot)
    )
      return false;
    if (filters.status && listing.status !== filters.status) return false;
    if (filters.freeOnly && !listing.isFree) return false;
    return true;
  });
}

const SKELETON_COUNT = 8;

export default function MarketPage() {
  const { listings, filters, setFilters, setMode } = useStore();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMode("buyer");
  }, [setMode]);

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "",
      priceMin: "",
      priceMax: "",
      condition: "",
      pickupSpot: "",
      status: "",
      freeOnly: false,
    });
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250 + Math.random() * 150);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () => filterListings(listings, filters),
    [listings, filters]
  );

  return (
    <div className="px-3 py-4 sm:px-4 lg:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Browse listings
        </h1>
        <button
          type="button"
          onClick={() => setFilterDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:hidden"
          aria-label="Open filters"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <FilterDrawer open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} />

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Search className="h-12 w-12" />}
          title="No listings match"
          description="Try adjusting your search or filters."
          action={
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
