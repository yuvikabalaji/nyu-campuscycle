"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Heart, MessageCircle, ShoppingBag, User, LayoutDashboard, Package, Store, Inbox } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useStore } from "@/lib/store";
import clsx from "clsx";

export function Header() {
  const router = useRouter();
  const { savedIds, currentMode, toggleMode, setMode } = useStore();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const isSellerMode = currentMode === "seller";

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b backdrop-blur",
        isSellerMode
          ? "border-nyu-purple/30 bg-nyu-purple/5 dark:bg-nyu-purple/10"
          : "border-gray-200 bg-white/95 dark:border-gray-800 dark:bg-gray-900/95"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-3 sm:gap-4 sm:px-4 lg:px-6">
        <Link
          href={isSellerMode ? "/seller" : "/market"}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-nyu-purple focus:ring-offset-white dark:focus:ring-offset-gray-900"
          aria-label="NYU Campus Cycle home"
        >
          <Image
            src="/logo.png"
            alt="NYU Campus Cycle"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
        </Link>

        <div className="flex shrink-0 rounded-full bg-gray-100 p-0.5 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => {
                if (currentMode !== "buyer") {
                  setMode("buyer");
                  router.push("/market");
                }
              }}
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                currentMode === "buyer"
                  ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              )}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentMode !== "seller") {
                  setMode("seller");
                  router.push("/seller");
                }
              }}
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                currentMode === "seller"
                  ? "bg-nyu-purple text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              )}
            >
              Seller
            </button>
          </div>

        <div className="hidden flex-1 lg:flex lg:justify-center">
          {!isSellerMode && <SearchBar />}
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 lg:flex-initial lg:flex lg:gap-3">
          {!isSellerMode && (
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Open search"
              >
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}

          {isSellerMode ? (
            <>
              <Link
                href="/seller"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-nyu-purple/20 lg:inline-flex"
                aria-label="Seller Dashboard"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/seller/listings"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-nyu-purple/20 lg:inline-flex"
                aria-label="My Listings"
              >
                <Package className="h-4 w-4" />
                <span>My Listings</span>
              </Link>
              <Link
                href="/seller/requests"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-nyu-purple/20 lg:inline-flex"
                aria-label="Requests"
              >
                <Inbox className="h-4 w-4" />
                <span>Requests</span>
              </Link>
              <Link
                href="/messages"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-nyu-purple/20 lg:inline-flex"
                aria-label="Messages"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              <Link
                href="/sell"
                className="hidden rounded-lg bg-nyu-purple px-3 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2 lg:inline-flex"
              >
                Create Listing
              </Link>
              <Link
                href="/profile"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-nyu-purple/20 lg:inline-flex"
                aria-label="Profile"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/market"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-gray-800 lg:inline-flex"
                aria-label="Market"
              >
                <Store className="h-4 w-4" />
                <span>Market</span>
              </Link>
              <Link
                href="/saved"
                className="relative hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-gray-800 lg:inline-flex"
                aria-label="Saved items"
              >
                <Heart className="h-4 w-4" />
                <span>Saved</span>
                {savedIds.length > 0 && (
                  <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-nyu-purple px-1.5 text-[10px] font-medium text-white">
                    {savedIds.length > 9 ? "9+" : savedIds.length}
                  </span>
                )}
              </Link>
              <Link
                href="/messages"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-gray-800 lg:inline-flex"
                aria-label="Messages"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              <Link
                href="/profile"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-gray-800 lg:inline-flex"
                aria-label="Profile"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </>
          )}

        </div>
      </div>

      {mobileSearchOpen && !isSellerMode && (
        <div className="border-t border-gray-200 px-3 py-2 dark:border-gray-800 lg:hidden">
          <div className="flex gap-2">
            <SearchBar />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
