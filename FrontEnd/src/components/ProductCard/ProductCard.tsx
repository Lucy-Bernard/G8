// ProductCard.tsx

import React from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Product } from "@/app/home/products/page";

interface ProductCardProps {
  productId: number,
  categoryId: number,
  productName: string,
  unitPrice: number,
  manufacturer: string,
  description: string,
  rating: number,
  sku: string,
  imageLink: string
}

export default function ProductCard(props: Product) {
  
  const US_dollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={styles.product_card}>
      <Image
        className={styles.product_image}
        src={props.imageLink} // Use the imageUrl from props
        alt={props.productName}
        height={175}
        width={250}
      />

      <div className={styles.product_information}>
        <div className={styles.product_id}>{props.productId}</div>
        <div className={styles.category_id}>{props.categoryId}</div>
        <div className={styles.product_name}>{props.productName}</div>
        <div className={styles.unit_price}>{US_dollar.format(props.unitPrice)}</div>
        <div className={styles.product_manufacturer}>{props.manufacturer}</div>
        <div className={styles.product_description}>{props.description}</div>
        <div className={styles.product_rating}>{props.rating}</div>
        <div className={styles.product_sku}>{props.sku}</div>
      </div>
    </div>
  );
};
