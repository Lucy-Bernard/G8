import React from 'react';
 
import Image from 'next/image';
import styles from './Banner.module.css';

 

const Banner: React.FC = () => {
   // const bannerImage = '/assets/Banner Images/banner.png';
   const bannerImage = require("@/assets/Banner Images/banner.png")
  
    return (
      //will wait to implement the arrows until we figure out
      //all of the images we want
      <div className={styles.banner}>
        <div className={styles.arrowContainer}>
          <div className={styles.arrow}>{'<'}</div>
          <div className={styles.arrow}>{'>'}</div>
        </div>
        <Image
          src={bannerImage}
          alt="banner image"
          className={styles.bannerImage}
          layout="responsive"
          width={500}
          height={300}
          objectFit="contain" // or "contain", depending on your design
          objectPosition="center" // adjust as needed
        />
      </div>
    );
  };
  
 
export default Banner;  
