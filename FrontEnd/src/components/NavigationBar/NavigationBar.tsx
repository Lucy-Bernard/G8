import React from "react";
import Link from "next/link";
import styles from "./NavigationBar.module.css";

/**
 * The NavigationBar component is a React functional component designed to provide a user-friendly navigation menu for a website.
 * It features links to various product categories such as Tops, Bottoms, Outerwear, and Shoes, using Next.js's Link for efficient client-side routing.
 * The component's styling is managed through a CSS module, NavigationBar.module.css, ensuring a consistent and isolated visual presentation.
 */
type NavigationBarProps = {};

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <nav className={styles.navigationBar}>
      <ul className={styles["navbar-nav"]}>
        <li className={styles["nav-item"]}>
          <Link href="/home/tops" className={styles["nav-link"]}>
            Tops
          </Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link href="/home/bottoms" className={styles["nav-link"]}>
            Bottoms
          </Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link href="/home/outerwear" className={styles["nav-link"]}>
            Outerwear
          </Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link href="/home/shoes" className={styles["nav-link"]}>
            Shoes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
