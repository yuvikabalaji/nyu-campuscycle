"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { MessageCircle } from "lucide-react";

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diff < 604800000) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  const { threads } = useStore();

  if (threads.length === 0) {
    return (
      <div className="px-3 py-6 sm:px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Messages
        </h1>
        <EmptyState
          icon={<MessageCircle className="h-12 w-12" />}
          title="No messages yet"
          description="When you contact a seller, your conversations will appear here."
          action={
            <Link
              href="/market"
              className="inline-block rounded-lg bg-nyu-purple px-4 py-2 text-sm font-medium text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2"
            >
              Browse listings
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-3 py-4 sm:px-4">
      <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Messages
      </h1>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {threads.map((thread) => {
          const last = thread.messages[thread.messages.length - 1];
          const preview = last?.text?.slice(0, 50) ?? "No messages yet";
          const otherName =
            last?.sender === "seller" ? thread.sellerName : thread.buyerName;
          return (
            <li key={thread.id}>
              <Link
                href={`/messages/${thread.id}`}
                className="flex gap-3 px-2 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {otherName}
                    </span>
                    {last && (
                      <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(last.sentAt)}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-gray-600 dark:text-gray-400">
                    {thread.listingTitle}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-500">
                    {preview}
                    {preview.length >= 50 ? "…" : ""}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
