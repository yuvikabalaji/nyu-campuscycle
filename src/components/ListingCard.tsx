"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";
import type { Listing } from "@/lib/types";
import clsx from "clsx";

interface ListingCardProps {
  listing: Listing;
  showMessage?: boolean;
}

export function ListingCard({ listing, showMessage = true }: ListingCardProps) {
  const router = useRouter();
  const { savedIds, toggleSave, getOrCreateThreadForListing } = useStore();
  const { toast } = useToast();
  const isSaved = savedIds.includes(listing.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(listing.id);
    toast(isSaved ? "Removed from saved" : "Saved");
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const thread = getOrCreateThreadForListing(listing);
    router.push(`/messages/${thread.id}`);
  };

  const priceLabel = listing.isFree ? "Free" : `$${listing.price}`;
  const firstImage = listing.images[0] ?? "/placeholder.svg";

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800">
        <Image
          src={firstImage}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <button
          type="button"
          onClick={handleSave}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow hover:bg-white focus:ring-2 focus:ring-nyu-purple dark:bg-gray-800/90 dark:hover:bg-gray-800"
          aria-label={isSaved ? "Unsave" : "Save"}
        >
          <Heart
            className={clsx(
              "h-5 w-5",
              isSaved ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
            )}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="font-semibold text-gray-900 line-clamp-2 dark:text-gray-100">
          {listing.title}
        </p>
        <p className="mt-1 text-lg font-bold text-nyu-purple">
          {priceLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            {listing.condition}
          </span>
          {listing.pickupSpots[0] && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              {listing.pickupSpots[0]}
            </span>
          )}
        </div>
        {showMessage && listing.status === "available" && (
          <button
            type="button"
            onClick={handleMessage}
            className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <MessageCircle className="h-4 w-4" />
            Message
          </button>
        )}
      </div>
    </Link>
  );
}
