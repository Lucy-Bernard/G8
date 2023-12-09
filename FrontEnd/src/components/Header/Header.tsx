/*
 * Header Component
 * 
 * This component represents the header of the application, including the logo, search button,
 * user profile, and cart icons.
 */

import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import SearchButtonThatSlides from "../Search/Search";

const Header: React.FC = () => {
  const logoImage = require("@/assets/Header Images/G8.png");
  const profileImage = require("@/assets/Header Images/Profile.png");
  const cartImage = require("@/assets/Header Images/Cart.png");
  const searchImage = require("@/assets/Header Images/search.png");

  return (
    <div className={styles.headerContainer}>
      <Link href="/home">
        <div className={`${styles.logoContainer} ${styles.headerItemImage}`}>
          <Image
            src={logoImage}
            alt="Logo"
            height={60}
            width={60}
            objectFit="contain"
          />
        </div>
      </Link>
      <div className={styles.headerItemsContainer}>
        <div className={styles.headerItem}>
          <SearchButtonThatSlides />
        </div>
        <Link href="/home/userprofile">
          <div className={styles.headerItem}>
            <Image
              src={profileImage}
              alt="User Profile"
              height={35}
              width={35}
              objectFit="cover"
            />
          </div>
        </Link>
        <Link href="/home/cart">
          <div className={styles.headerItem}>
            <Image
              src={cartImage}
              alt="Cart"
              height={35}
              width={35}
              objectFit="cover"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
