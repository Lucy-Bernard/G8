import React from 'react';
import Link from 'next/link';
import styles from './NavigationBar.module.css';

type NavigationBarProps = {
  // Define any props you might need
};

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const scrollToSection = (sectionId: string) => {
    // Ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={styles.navigationBar}>
      <ul className={styles['navbar-nav']}>
        {/* still need to implement sections once main page is created */}
        <li className={styles['nav-item']}>
          <button>Top</button>
        </li>
        <li className={styles['nav-item']}>
          <button>Bottom</button>
        </li>
        <li className={styles['nav-item']}>
          <button>Outerwear</button>
        </li>
        <li className={styles['nav-item']}>
          <button>Shoe</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
