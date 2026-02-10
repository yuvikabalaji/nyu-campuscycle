import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { ToastProvider } from "@/components/Toast";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = {
  title: "NYU Campus Cycle – Campus Marketplace",
  description: "Campus-only secondhand marketplace for NYU students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StoreProvider>
          <ToastProvider>
            <Shell>{children}</Shell>
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
