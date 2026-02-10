"use client";

import React from "react";
import Link from "next/link";
import { Store, Heart, MessageCircle, Settings } from "lucide-react";

const DEMO_USER = { name: "You", gradYear: 2026 };

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-xl px-3 py-6 sm:px-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Profile
      </h1>
      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {DEMO_USER.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Class of {DEMO_USER.gradYear}
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Demo mode — no account linked.
        </p>
      </div>
      <nav className="mt-6 space-y-1" aria-label="Profile links">
        <Link
          href="/market"
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <Store className="h-5 w-5 text-gray-500" />
          <span>Browse market</span>
        </Link>
        <Link
          href="/saved"
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <Heart className="h-5 w-5 text-gray-500" />
          <span>Saved</span>
        </Link>
        <Link
          href="/messages"
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <MessageCircle className="h-5 w-5 text-gray-500" />
          <span>Messages</span>
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-nyu-purple dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <Settings className="h-5 w-5 text-gray-500" />
          <span>About and launch plan</span>
        </Link>
      </nav>
    </div>
  );
}
