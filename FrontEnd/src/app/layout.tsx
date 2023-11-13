import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar, { PageLink } from "@/components/NavigationBar/NavigationBar";
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner"; // Import the Banner component


const inter = Inter({ subsets: ["latin"] });
const links: Array<PageLink> = [
  {
    link_text: "Products",
    link_url: "products"
  }
];

export const metadata: Metadata = {
  title: "Frontend Setup",
  description: "A website demonstrating interaction between frontend and backend services.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
         
        <NavigationBar links={links} />
        <Banner /> 
        {children}
      </body>
    </html>
  )
}

