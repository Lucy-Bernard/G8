// ProductCard.tsx

import React from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Product } from '@/app/home/products/page';

type ProductCardProps={
  product:Product
}

export default function ProductCard(props: ProductCardProps) {
  const product_image = require("@/assets/Product Images/" + props.product.imageLink);

  const US_dollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={styles.product_card}>
      <Image
        className={styles.product_image}
        src={product_image} // Use the imageUrl from props
        alt={props.product.productName}
        height={175}
        width={250}
      />

      <div className={styles.product_information}>
        {/* <div className={styles.category_id}>{props.categoryId}</div> */}
        <div className={styles.product_name}>{props.product.productName}</div>
        <div className={styles.unit_price}>{US_dollar.format(props.product.unitPrice)}</div>
        {/* <div className={styles.product_manufacturer}>{props.manufacturer}</div>
        <div className={styles.product_description}>{props.description}</div>
        <div className={styles.product_rating}>{props.rating}</div>
        <div className={styles.product_sku}>{props.sku}</div> */}
      </div>
    </div>
  );
};
