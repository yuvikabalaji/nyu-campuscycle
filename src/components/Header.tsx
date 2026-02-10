"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, MessageCircle, ShoppingBag, User, LayoutDashboard, Package } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useStore } from "@/lib/store";
import clsx from "clsx";

export function Header() {
  const router = useRouter();
  const { savedIds, currentMode, toggleMode, setMode } = useStore();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMode = () => {
    toggleMode();
    setMobileMenuOpen(false);
    if (currentMode === "buyer") {
      router.push("/seller");
    } else {
      router.push("/market");
    }
  };

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
          className={clsx(
            "shrink-0 text-lg font-bold focus:ring-2 focus:ring-offset-2 rounded",
            isSellerMode ? "text-nyu-purple focus:ring-nyu-purple" : "text-nyu-purple focus:ring-nyu-purple"
          )}
        >
          NYU Campus Cycle
        </Link>

        <div className="hidden shrink-0 rounded-full bg-gray-100 p-0.5 dark:bg-gray-800 sm:flex">
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
          {isSellerMode && (
            <span className="hidden shrink-0 rounded-full bg-nyu-purple/20 px-2.5 py-0.5 text-xs font-medium text-nyu-purple dark:bg-nyu-purple/30 md:inline-block">
              Seller Mode
            </span>
          )}

        <div className="hidden flex-1 lg:flex lg:justify-center">
          {!isSellerMode && <SearchBar />}
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 lg:flex-initial lg:gap-2">
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
                href="/seller/listings"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-nyu-purple/20 sm:flex"
                aria-label="My Listings"
              >
                <Package className="h-4 w-4" />
                <span className="hidden md:inline">My Listings</span>
              </Link>
              <Link
                href="/seller/requests"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:text-gray-300 dark:hover:bg-nyu-purple/20 sm:flex"
                aria-label="Requests"
              >
                Requests
              </Link>
              <Link
                href="/messages"
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-nyu-purple/10 focus:ring-2 focus:ring-nyu-purple dark:hover:bg-nyu-purple/20"
                aria-label="Messages"
              >
                <MessageCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Link>
              <Link
                href="/sell"
                className="hidden rounded-lg bg-nyu-purple px-3 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2 sm:inline-flex"
              >
                Create Listing
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/saved"
                className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:hover:bg-gray-700"
                aria-label="Saved items"
              >
                <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {savedIds.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-nyu-purple text-[10px] font-medium text-white">
                    {savedIds.length > 9 ? "9+" : savedIds.length}
                  </span>
                )}
              </Link>
              <Link
                href="/messages"
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:hover:bg-gray-700"
                aria-label="Messages"
              >
                <MessageCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Link>
              <Link
                href="/market"
                className="hidden h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:hover:bg-gray-700 sm:flex"
                aria-label="Bag"
              >
                <ShoppingBag className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Link>
              <Link
                href="/sell"
                className="hidden rounded-lg bg-nyu-purple px-3 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2 sm:inline-flex"
              >
                Sell
              </Link>
            </>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:hover:bg-gray-700"
              aria-label="Profile and mode"
              aria-expanded={mobileMenuOpen}
            >
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            {mobileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                  <button
                    type="button"
                    onClick={handleToggleMode}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {isSellerMode ? (
                      <>
                        <LayoutDashboard className="h-4 w-4" />
                        Switch to Buyer Mode
                      </>
                    ) : (
                      <>
                        <Package className="h-4 w-4" />
                        Switch to Seller Mode
                      </>
                    )}
                  </button>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  {isSellerMode ? (
                    <>
                      <Link
                        href="/seller"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Seller Dashboard
                      </Link>
                      <Link
                        href="/seller/listings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Package className="h-4 w-4" />
                        My Listings
                      </Link>
                      <Link
                        href="/seller/requests"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Requests
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/market"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Market
                      </Link>
                      <Link
                        href="/saved"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Saved
                      </Link>
                      <Link
                        href="/sell"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Sell
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
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
