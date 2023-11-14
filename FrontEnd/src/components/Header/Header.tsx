 
import React from 'react';
 
import Image from 'next/image';
import styles from './Header.module.css';
// ... (other imports)

const Header: React.FC = () => {
 
 
 const topLeftImage = require("@/assets/Header Images/G8.png")
 
  const topRightImage1 = require("@/assets/Header Images/Profile.png")
 
  const topRightImage2 = require("@/assets/Header Images/Cart.png")

  return (
    <div className={styles.container}>
      <div className={`${styles.topLeftImage} ${styles.image}`}>
        <Image
          src={topLeftImage}
          alt="Logo"
          height={70}
          width={70}
          objectFit="contain" // or "contain", depending on your design
          objectPosition="left top" // adjust as needed
          
        />
      </div>
      <div className={`${styles.topRightImages} ${styles.headImages}`}>
        <Image
          src={topRightImage1}
          alt="User Profile"
          height={40}
          width={50}
          objectFit="cover"
          objectPosition="right top"
        />
        <Image
          src={topRightImage2}
          alt="Cart"
          height={40}
          width={40}
          objectFit="cover"
          objectPosition="right top"
        />
      </div>
    </div>
  );
};

 
export default Header;






