import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Banner.module.css';

const Banner: React.FC = () => {
  const bannerImage = require('@/assets/Banner Images/G8.png'); //filler image

  return (
    <div className={styles.banner}>
      <Link href="home/sales" passHref>
        <div className={`${styles.banner} ${styles.bannerImage}`}>
          <Image
            src={bannerImage}
            alt="banner image"
            className={styles.bannerImage}
            layout="responsive"

            objectFit=""
            objectPosition="center"
          />
        </div>
      </Link>
    </div>
  );
};

export default Banner;

