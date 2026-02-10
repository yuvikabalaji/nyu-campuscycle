"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ThreadPage() {
  const params = useParams();
  const threadId = params.threadId as string;
  const { getThreadById, sendMessage } = useStore();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const thread = getThreadById(threadId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages.length]);

  if (!thread) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center px-4">
        <p className="text-gray-600 dark:text-gray-400">Conversation not found.</p>
        <Link
          href="/messages"
          className="mt-2 text-nyu-purple hover:underline focus:ring-2 focus:ring-nyu-purple"
        >
          Back to messages
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const message = {
      id: `m-${Date.now()}`,
      sender: "buyer" as const,
      text,
      sentAt: new Date().toISOString(),
    };
    sendMessage(threadId, message);
    setInput("");
    toast("Message sent");
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:h-[calc(100vh-3.5rem)]">
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-gray-800">
        <Link
          href="/messages"
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Back to messages"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-semibold text-gray-900 dark:text-gray-100">
            {thread.sellerName}
          </h1>
          <Link
            href={`/listing/${thread.listingId}`}
            className="truncate text-sm text-nyu-purple hover:underline"
          >
            {thread.listingTitle}
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-3">
          {thread.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "buyer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.sender === "buyer"
                    ? "bg-nyu-purple text-white"
                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`mt-1 text-xs ${
                    msg.sender === "buyer"
                      ? "text-white/80"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {formatTime(msg.sentAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 p-3 dark:border-gray-800"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-nyu-purple focus:ring-2 focus:ring-nyu-purple/20 dark:border-gray-700 dark:bg-gray-800"
            aria-label="Message"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-lg bg-nyu-purple p-2 text-white hover:bg-nyu-purple-light focus:ring-2 focus:ring-nyu-purple focus:ring-offset-2 disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
