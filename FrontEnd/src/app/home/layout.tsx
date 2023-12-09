/*
 * Home Layout Component
 * 
 * This component serves as the layout for the home page. It includes the site header,
 * navigation bar, main content (passed as children), and a footer with copyright information.
 * The layout uses the Quicksand font and includes metadata for the page.
 */

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";

// Load the Quicksand font with Latin subset
const quicksand = Quicksand({ subsets: ["latin"] });

// Metadata for the home page
export const metadata: Metadata = {
  title: "G8",
  description: "",
};

// Home Layout Component Function
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <NavigationBar />
      {children}
      <footer className={styles.footer}>
        <div>&copy; 2023 G8.</div>
      </footer>
    </div>
  );
}
