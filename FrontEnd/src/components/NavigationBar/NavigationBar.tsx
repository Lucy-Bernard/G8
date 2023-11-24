import React from 'react';
import Link from 'next/link';
import styles from './NavigationBar.module.css';

type NavigationBarProps = {
};

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <nav className={styles.navigationBar}>
      <ul className={styles['navbar-nav']}>
        <li className={styles['nav-item']}>
          <Link href="/home/tops" className={styles['nav-link']}>Tops</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link href="/home/bottoms" className={styles['nav-link']}>Bottoms</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link href="/home/outerwear" className={styles['nav-link']}>Outerwear</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link href="/home/shoes" className={styles['nav-link']}>Shoes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
