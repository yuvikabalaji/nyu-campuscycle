"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const { currentMode } = useStore();

  useEffect(() => {
    if (currentMode === "seller") {
      router.replace("/seller");
    } else {
      router.replace("/market");
    }
  }, [currentMode, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Redirecting...</p>
    </div>
  );
}
