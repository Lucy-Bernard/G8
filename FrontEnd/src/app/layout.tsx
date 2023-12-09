/*
 * Root Layout Component
 * 
 * This component represents the root layout of the application, serving as the base
 * structure for all pages. It includes global styles, font loading, and context providers.
 */

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./user";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
