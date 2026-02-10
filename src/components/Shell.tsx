"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = pathname === "/market" || pathname.startsWith("/seller");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        {showSidebar && <Sidebar />}
        <main
          className="min-h-[calc(100vh-3.5rem)] w-full pb-20 lg:pb-6 lg:min-h-[calc(100vh-3.5rem)]"
          id="main-content"
        >
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
