"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { PickupSpot } from "@/lib/types";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import {
  LISTING_CATEGORIES,
  CONDITIONS,
  PICKUP_SPOTS,
} from "@/lib/types";
import type { Listing, ListingCategory, Condition } from "@/lib/types";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";
import { DEMO_SELLER_ID } from "@/mock/listings";

const DEMO_SELLER = {
  id: DEMO_SELLER_ID,
  name: "You",
  gradYear: 2026,
  verifiedDemo: true,
};

const step1Schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  category: z.enum(LISTING_CATEGORIES as unknown as [string, ...string[]]),
  condition: z.enum(CONDITIONS as unknown as [string, ...string[]]),
  isFree: z.boolean(),
  price: z.number().min(0).optional(),
}).refine((data) => !data.isFree || data.price === undefined || data.price === 0, {
  message: "Free items must have price 0",
  path: ["price"],
}).refine((data) => data.isFree || (typeof data.price === "number" && data.price >= 0), {
  message: "Price must be 0 or greater",
  path: ["price"],
});

type Step1Values = z.infer<typeof step1Schema>;

const STEPS = 4;

export default function SellPage() {
  const router = useRouter();
  const { createListing, currentMode, setMode } = useStore();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // Post a listing is only in seller mode; redirect buyer to seller dashboard
  useEffect(() => {
    if (currentMode === "buyer") {
      setMode("seller");
      router.replace("/seller");
    }
  }, [currentMode, setMode, router]);
  const [images, setImages] = useState<string[]>([]);
  const [pickupSpots, setPickupSpots] = useState<PickupSpot[]>([]);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");

  const form1 = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: "",
      category: "" as ListingCategory,
      condition: "Good" as Condition,
      isFree: false,
      price: undefined,
    },
  });


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImages((prev) => [...prev, dataUrl].slice(0, 10));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const canNextStep1 = () => {
    const values = form1.getValues();
    if (!values.title || values.title.length < 3) return false;
    if (!values.category) return false;
    if (!values.condition) return false;
    if (!values.isFree && (values.price === undefined || values.price < 0)) return false;
    return true;
  };

  const canNextStep2 = () => images.length >= 1;
  const canNextStep3 = () => pickupSpots.length >= 1;

  const togglePickupSpot = (spot: PickupSpot) => {
    setPickupSpots((prev) =>
      prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]
    );
  };

  const handlePublish = () => {
    const step1 = form1.getValues();
    const listingImages = images.length ? images : ["/placeholder.svg"];
    const now = new Date().toISOString();
    const id = `listing-${Date.now()}`;
    const listing: Listing = {
      id,
      title: step1.title,
      description: "",
      price: step1.isFree ? 0 : (step1.price ?? 0),
      isFree: step1.isFree,
      category: step1.category as ListingCategory,
      condition: step1.condition as Condition,
      images: listingImages,
      pickupSpots,
      availableFrom: availableFrom || undefined,
      availableTo: availableTo || undefined,
      status: "available",
      seller: DEMO_SELLER,
      postedAt: now,
      updatedAt: now,
    };
    createListing(listing);
    toast("Listing posted");
    router.push(`/listing/${id}`);
  };

  if (currentMode === "buyer") return null;

  return (
    <div className="mx-auto max-w-xl px-3 py-6 sm:px-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Post a listing
      </h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Step {step} of {STEPS}
      </p>

      <div className="mt-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                {...form1.register("title")}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
                placeholder="e.g. Calculus textbook 9th ed"
              />
              {form1.formState.errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {form1.formState.errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                {...form1.register("category")}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
              >
                <option value="">Select...</option>
                {LISTING_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {form1.formState.errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {form1.formState.errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Condition *
              </label>
              <select
                {...form1.register("condition")}
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
                {...form1.register("isFree")}
                className="rounded border-gray-300 text-nyu-purple focus:ring-nyu-purple"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Free item
              </span>
            </label>
            {!form1.watch("isFree") && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price ($) *
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  {...form1.register("price", { valueAsNumber: true })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
                />
                {form1.formState.errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {form1.formState.errors.price.message}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add at least one photo (demo: files stored in browser only).
            </p>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-8 dark:border-gray-700 dark:bg-gray-800/50">
              <Upload className="h-10 w-10 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Click or drag to upload
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square">
                    <Image
                      src={src}
                      alt={`Upload ${i + 1}`}
                      fill
                      className="rounded-lg object-cover"
                      unoptimized={src.startsWith("data:")}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                      aria-label="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {images.length < 1 && (
              <p className="text-sm text-red-600">Add at least one photo to continue.</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Where can buyers pick up? (On-campus only.)
            </p>
            <div className="space-y-2">
              {PICKUP_SPOTS.map((spot) => (
                <label key={spot} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pickupSpots.includes(spot)}
                    onChange={() => togglePickupSpot(spot)}
                    className="rounded border-gray-300 text-nyu-purple focus:ring-nyu-purple"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {spot}
                  </span>
                </label>
              ))}
            </div>
            {pickupSpots.length < 1 && (
              <p className="text-sm text-red-600">Select at least one pickup location.</p>
            )}
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
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {form1.getValues("title")}
            </p>
            <p className="text-nyu-purple font-semibold">
              {form1.getValues("isFree")
                ? "Free"
                : `$${form1.getValues("price")}`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {form1.getValues("category")} · {form1.getValues("condition")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pickup: {pickupSpots.join(", ")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {images.length} photo(s)
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        {step < STEPS ? (
          <button
            type="button"
            onClick={() => {
              if (step === 1 && !canNextStep1()) {
                form1.trigger();
                return;
              }
              if (step === 2 && !canNextStep2()) return;
              if (step === 3 && !canNextStep3()) return;
              setStep((s) => s + 1);
            }}
            className="inline-flex items-center gap-1 rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePublish}
            className="rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
}
