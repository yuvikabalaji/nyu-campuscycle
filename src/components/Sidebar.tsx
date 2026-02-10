"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LISTING_CATEGORIES,
  CONDITIONS,
  PICKUP_SPOTS,
  LISTING_STATUSES,
} from "@/lib/types";
import { useStore } from "@/lib/store";
import { LayoutDashboard, Package, Inbox, MessageCircle, Store } from "lucide-react";
import clsx from "clsx";

const sellerSidebarLinks = [
  { href: "/seller", label: "Seller Dashboard", icon: LayoutDashboard },
  { href: "/seller/listings", label: "My Listings", icon: Package },
  { href: "/seller/requests", label: "Requests", icon: Inbox },
  { href: "/messages", label: "Messages", icon: MessageCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { filters, setFilters, setMode } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const isSellerArea = pathname.startsWith("/seller");

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

  return (
    <aside
      className={clsx(
        "hidden w-64 shrink-0 border-r border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50 lg:block",
        collapsed && "w-0 overflow-hidden border-0"
      )}
      aria-label="Filters"
    >
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col overflow-y-auto py-4 pl-4 pr-2">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="mb-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          {collapsed ? "Show" : isSellerArea ? "Seller" : "Filters"}
        </button>
        {!collapsed && isSellerArea && (
          <nav className="space-y-1" aria-label="Seller navigation">
            {sellerSidebarLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === href || (href !== "/seller" && pathname.startsWith(href))
                    ? "bg-nyu-purple/15 text-nyu-purple dark:bg-nyu-purple/25"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMode("buyer");
                router.push("/market");
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <Store className="h-4 w-4" />
              Switch to Buyer Mode
            </button>
          </nav>
        )}
        {!collapsed && !isSellerArea && (
          <>
            <div className="space-y-3">
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
                          e.target.value === ""
                            ? ""
                            : Number(e.target.value),
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
                          e.target.value === ""
                            ? ""
                            : Number(e.target.value),
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
                  onChange={(e) =>
                    setFilters({ freeOnly: e.target.checked })
                  }
                  className="rounded border-gray-300 text-nyu-purple focus:ring-nyu-purple"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Free items only
                </span>
              </label>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Clear filters
              </button>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
