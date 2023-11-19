import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css'; // Ensure this file name matches your actual CSS module file
import Link from 'next/link';
import SearchButtonThatSlides from '../Search/Search';

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
