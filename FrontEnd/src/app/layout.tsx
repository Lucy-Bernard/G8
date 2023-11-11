import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar, { PageLink } from "@/components/NavigationBar/NavigationBar";

const inter = Inter({ subsets: ["latin"] });
const links: Array<PageLink> = [
  {
    link_text: "Products",
    link_url: "products"
  }
]

export const metadata: Metadata = {
  title: "Frontend Setup",
  description: "A website demonstrating interaction between frontend and backend services.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar links={links} />
        {children}
      </body>
    </html>
  )
}