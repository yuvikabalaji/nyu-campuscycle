"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Heart, MessageCircle, User, LayoutDashboard, Package, Inbox } from "lucide-react";
import { useStore } from "@/lib/store";
import clsx from "clsx";

const buyerNavItems = [
  { href: "/market", label: "Market", icon: Store },
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

const sellerNavItems = [
  { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/listings", label: "Listings", icon: Package },
  { href: "/seller/requests", label: "Requests", icon: Inbox },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { currentMode } = useStore();
  const navItems = currentMode === "seller" ? sellerNavItems : buyerNavItems;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:hidden"
      aria-label="Main navigation"
    >
      <div className="flex justify-around">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/market"
              ? pathname === "/market"
              : href === "/seller"
                ? pathname === "/seller"
                : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex flex-col items-center gap-0.5 py-2 px-3 text-xs font-medium focus:ring-2 focus:ring-nyu-purple focus:ring-inset",
                isActive
                  ? "text-nyu-purple"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
