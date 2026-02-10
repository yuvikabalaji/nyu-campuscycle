"use client";

import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

interface SearchBarProps {
  variant?: "full" | "icon";
  onOpenDrawer?: () => void;
}

export function SearchBar({ variant = "full", onOpenDrawer }: SearchBarProps) {
  const { filters, search } = useStore();
  const [localQuery, setLocalQuery] = useState(filters.query);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      search(localQuery.trim());
      if (variant === "icon" && onOpenDrawer) onOpenDrawer();
    },
    [localQuery, search, variant, onOpenDrawer]
  );

  if (variant === "icon") {
    return (
      <Link
        href="/market"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-nyu-purple dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </Link>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden
        />
        <input
          type="search"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search keywords or ISBN..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-400"
          aria-label="Search listings"
        />
      </div>
    </form>
  );
}
