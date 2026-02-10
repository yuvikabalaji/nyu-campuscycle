"use client";

import React from "react";
import { X } from "lucide-react";
import {
  LISTING_CATEGORIES,
  CONDITIONS,
  PICKUP_SPOTS,
  LISTING_STATUSES,
} from "@/lib/types";
import { useStore } from "@/lib/store";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function FilterDrawer({ open, onClose }: FilterDrawerProps) {
  const { filters, setFilters } = useStore();

  const resetFilters = () => {
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

  const hasActiveFilters =
    filters.category ||
    filters.condition ||
    filters.pickupSpot ||
    filters.status ||
    filters.freeOnly ||
    (filters.priceMin !== "" && filters.priceMin !== undefined) ||
    (filters.priceMax !== "" && filters.priceMax !== undefined);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto border-l border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:hidden"
        role="dialog"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:hover:bg-gray-700"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 p-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  category: e.target.value as typeof filters.category,
                })
              }
              className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-sm focus:border-nyu-purple focus:ring-1 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">All</option>
              {LISTING_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Min $
              </label>
              <input
                type="number"
                min={0}
                value={filters.priceMin === "" ? "" : filters.priceMin}
                onChange={(e) =>
                  setFilters({
                    priceMin:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                placeholder="0"
                className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-sm focus:border-nyu-purple focus:ring-1 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Max $
              </label>
              <input
                type="number"
                min={0}
                value={filters.priceMax === "" ? "" : filters.priceMax}
                onChange={(e) =>
                  setFilters({
                    priceMax:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                placeholder="Any"
                className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-sm focus:border-nyu-purple focus:ring-1 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Condition
            </label>
            <select
              value={filters.condition}
              onChange={(e) =>
                setFilters({
                  condition: e.target.value as typeof filters.condition,
                })
              }
              className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-sm focus:border-nyu-purple focus:ring-1 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">All</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Pickup
            </label>
            <select
              value={filters.pickupSpot}
              onChange={(e) =>
                setFilters({
                  pickupSpot: e.target.value as typeof filters.pickupSpot,
                })
              }
              className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-sm focus:border-nyu-purple focus:ring-1 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">Any</option>
              {PICKUP_SPOTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  status: e.target.value as typeof filters.status,
                })
              }
              className="w-full rounded border border-gray-200 bg-white px-2 py-1.5 text-sm focus:border-nyu-purple focus:ring-1 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">All</option>
              {LISTING_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={filters.freeOnly}
              onChange={(e) => setFilters({ freeOnly: e.target.checked })}
              className="rounded border-gray-300 text-nyu-purple focus:ring-nyu-purple"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Free items only
            </span>
          </label>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Clear filters
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-nyu-purple py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
