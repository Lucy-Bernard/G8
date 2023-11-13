import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NavigationBar, { PageLink } from "@/components/NavigationBar/NavigationBar";

const quicksand = Quicksand({ subsets: ["latin"] });
const links: Array<PageLink> = [
  {
    link_text: "Products",
    link_url: "products"
  },
  {
    link_text: "User Profile",
    link_url: "userprofile"
  }
]

export const metadata: Metadata = {
  title: "Frontend Setup",
  description: "A website demonstrating interaction between frontend and backend services.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> {/*this stuff goes on every page */}
      <body className={quicksand.className}>
        {/* <NavigationBar links={links} /> */}
        {children}
      </body>
    </html>
  )
}