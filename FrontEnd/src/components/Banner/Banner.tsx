import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Banner.module.css';

const Banner: React.FC = () => {
  const bannerImage = require('@/assets/Banner Images/sale.jpg'); //filler image

  return (
    <div className={styles.banner}>
      <Link href="home/sales" passHref>
      <div className={`${styles.banner} ${styles.bannerImage}`}> 
          <Image
            src={bannerImage}
            alt="banner image"
            className={styles.bannerImage}
            layout="responsive"
            width={500}
            height={300}
            objectFit="contain"
            objectPosition="center"
          />
        </div>
      </Link>
    </div>
  );
};

export default Banner;

