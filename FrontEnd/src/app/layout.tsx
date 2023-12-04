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
