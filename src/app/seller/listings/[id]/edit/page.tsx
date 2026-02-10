"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LISTING_CATEGORIES,
  CONDITIONS,
  PICKUP_SPOTS,
} from "@/lib/types";
import type { Listing, ListingCategory, Condition, PickupSpot } from "@/lib/types";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";
import { DEMO_SELLER_ID } from "@/mock/listings";

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { getListingById, updateListing } = useStore();
  const { toast } = useToast();
  const listing = getListingById(id);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [isFree, setIsFree] = React.useState(false);
  const [category, setCategory] = React.useState<ListingCategory | "">("");
  const [condition, setCondition] = React.useState<Condition | "">("Good");
  const [pickupSpots, setPickupSpots] = React.useState<PickupSpot[]>([]);
  const [availableFrom, setAvailableFrom] = React.useState("");
  const [availableTo, setAvailableTo] = React.useState("");

  useEffect(() => {
    if (listing) {
      setTitle(listing.title);
      setDescription(listing.description);
      setPrice(listing.isFree ? "" : String(listing.price));
      setIsFree(listing.isFree);
      setCategory(listing.category);
      setCondition(listing.condition);
      setPickupSpots(listing.pickupSpots);
      setAvailableFrom(listing.availableFrom ?? "");
      setAvailableTo(listing.availableTo ?? "");
    }
  }, [listing]);

  if (!listing) {
    return (
      <div className="px-3 py-6">
        <p className="text-gray-600 dark:text-gray-400">Listing not found.</p>
        <Link href="/seller/listings" className="mt-2 text-nyu-purple hover:underline">
          Back to My Listings
        </Link>
      </div>
    );
  }

  if (listing.seller.id !== DEMO_SELLER_ID) {
    return (
      <div className="px-3 py-6">
        <p className="text-gray-600 dark:text-gray-400">You can only edit your own listings.</p>
        <Link href="/seller/listings" className="mt-2 text-nyu-purple hover:underline">
          Back to My Listings
        </Link>
      </div>
    );
  }

  const togglePickupSpot = (spot: PickupSpot) => {
    setPickupSpots((prev) =>
      prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updates: Partial<Listing> = {
      title,
      description,
      price: isFree ? 0 : (price ? Number(price) : 0),
      isFree,
      category: category as ListingCategory,
      condition: condition as Condition,
      pickupSpots,
      availableFrom: availableFrom || undefined,
      availableTo: availableTo || undefined,
    };
    updateListing(id, updates);
    toast("Listing updated successfully");
    router.push("/seller/listings");
  };

  return (
    <div className="mx-auto max-w-xl px-3 py-6 sm:px-4">
      <Link
        href="/seller/listings"
        className="text-sm font-medium text-nyu-purple hover:underline"
      >
        Back to My Listings
      </Link>
      <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Edit listing
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ListingCategory)}
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">Select...</option>
            {LISTING_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Condition *
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as Condition)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            className="rounded border-gray-300 text-nyu-purple focus:ring-nyu-purple"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Free item</span>
        </label>
        {!isFree && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price ($) *
            </label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Pickup locations *
          </label>
          <div className="space-y-2">
            {PICKUP_SPOTS.map((spot) => (
              <label key={spot} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={pickupSpots.includes(spot)}
                  onChange={() => togglePickupSpot(spot)}
                  className="rounded border-gray-300 text-nyu-purple focus:ring-nyu-purple"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{spot}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Available from (optional)
            </label>
            <input
              type="text"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              placeholder="e.g. Mon 2pm"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Available to (optional)
            </label>
            <input
              type="text"
              value={availableTo}
              onChange={(e) => setAvailableTo(e.target.value)}
              placeholder="e.g. Fri 6pm"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Photos: editing images is demo-only; changes are not saved in this MVP.
        </p>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
          >
            Save changes
          </button>
          <Link
            href="/seller/listings"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
