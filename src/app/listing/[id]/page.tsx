"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";
import { ListingDetailSkeleton } from "@/components/skeletons/ListingDetailSkeleton";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { getListingById, savedIds, toggleSave, getOrCreateThreadForListing } =
    useStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  const listing = getListingById(id);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200 + Math.random() * 200);
    return () => clearTimeout(t);
  }, []);

  if (!listing && !loading) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center px-4">
        <p className="text-gray-600 dark:text-gray-400">Listing not found.</p>
        <Link
          href="/market"
          className="mt-2 text-nyu-purple hover:underline focus:ring-2 focus:ring-nyu-purple"
        >
          Back to market
        </Link>
      </div>
    );
  }

  if (loading || !listing) {
    return <ListingDetailSkeleton />;
  }

  const isSaved = savedIds.includes(listing.id);
  const images = listing.images.length ? listing.images : ["/placeholder.svg"];
  const priceLabel = listing.isFree ? "Free" : `$${listing.price}`;

  const handleSave = () => {
    toggleSave(listing.id);
    toast(isSaved ? "Removed from saved" : "Saved");
  };

  const handleMessageSeller = () => {
    const thread = getOrCreateThreadForListing(listing);
    router.push(`/messages/${thread.id}`);
  };

  const handleReport = () => {
    toast("Report received. Thanks for helping keep NYU Campus Cycle safe.");
  };

  return (
    <div className="mx-auto max-w-4xl px-3 pb-8 pt-4 sm:px-4">
      {/* Carousel */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 sm:aspect-video">
        <Image
          src={images[carouselIndex]}
          alt={`${listing.title} – image ${carouselIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 896px"
          priority
          unoptimized={images[carouselIndex].startsWith("data:")}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCarouselIndex((i) => (i === 0 ? images.length - 1 : i - 1))
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:ring-2 focus:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCarouselIndex((i) => (i === images.length - 1 ? 0 : i + 1))
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:ring-2 focus:ring-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCarouselIndex(i)}
                  className={`h-2 w-2 rounded-full focus:ring-2 focus:ring-white ${
                    i === carouselIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {listing.title}
          </h1>
          <p className="mt-1 text-2xl font-bold text-nyu-purple">{priceLabel}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              {listing.condition}
            </span>
            <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              {listing.category}
            </span>
            {listing.status !== "available" && (
              <span className="rounded bg-amber-100 px-2 py-1 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                {listing.status}
              </span>
            )}
          </div>
        </div>

        {/* Seller */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Seller
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {listing.seller.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Class of {listing.seller.gradYear}
            </span>
            {listing.seller.verifiedDemo && (
              <span className="inline-flex items-center gap-1 rounded bg-nyu-purple/10 px-2 py-0.5 text-xs font-medium text-nyu-purple">
                <ShieldCheck className="h-3.5 w-3.5" />
                NYU Verified (Demo)
              </span>
            )}
          </div>
        </div>

        {/* Pickup */}
        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <p className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <MapPin className="h-4 w-4" />
            Pickup
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
            {listing.pickupSpots.map((spot) => (
              <li key={spot}>{spot}</li>
            ))}
          </ul>
          {(listing.availableFrom || listing.availableTo) && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Preferred: {listing.availableFrom ?? "—"} to{" "}
              {listing.availableTo ?? "—"}
            </p>
          )}
        </div>

        {/* On-campus callout */}
        <div className="rounded-xl border border-nyu-purple/30 bg-nyu-purple/5 p-4 dark:bg-nyu-purple/10">
          <p className="text-sm font-medium text-nyu-purple dark:text-nyu-purple-light">
            On-campus pickup only — no shipping. Meet in a public spot for a
            safe exchange.
          </p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </h2>
          <p className="mt-1 whitespace-pre-wrap text-gray-600 dark:text-gray-400">
            {listing.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Heart
              className={`h-4 w-4 ${
                isSaved ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {isSaved ? "Saved" : "Save"}
          </button>
          {listing.status === "available" && (
            <>
              <button
                type="button"
                onClick={handleMessageSeller}
                className="inline-flex items-center gap-2 rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4" />
                Message Seller
              </button>
              <button
                type="button"
                onClick={() => setOfferModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Make Offer
              </button>
            </>
          )}
          <button
            type="button"
            onClick={handleReport}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Report Listing
          </button>
        </div>
      </div>

      {/* Make Offer modal (mock) */}
      {offerModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOfferModalOpen(false)}
            aria-hidden
          />
          <div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900"
            role="dialog"
            aria-label="Make offer"
          >
            <h3 className="text-lg font-semibold">Make an offer</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Demo: Enter an amount and submit. No payment is processed.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast("Offer sent! The seller will respond in Messages.");
                setOfferModalOpen(false);
              }}
              className="mt-4 space-y-3"
            >
              <input
                type="number"
                min={0}
                step={1}
                placeholder="Your offer ($)"
                className="w-full rounded border border-gray-200 px-3 py-2 text-sm focus:border-nyu-purple focus:ring-1 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(false)}
                  className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-nyu-purple py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
                >
                  Send offer
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
