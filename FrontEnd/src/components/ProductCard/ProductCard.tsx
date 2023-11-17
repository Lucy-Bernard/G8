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

const ProductCard: React.FC<ProductCardProps> = ({ productId, categoryId, productName, unitPrice, manufacturer, description, rating, sku, imageLink }) => {
  const US_dollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={styles.product_card}>
      <Image
        className={styles.product_image}
        src={imageLink} // Use the imageUrl from props
        alt={productName}
        height={175}
        width={250}
      />

      <div className={styles.product_information}>
        <div className={styles.product_id}>{productId}</div>
        <div className={styles.category_id}>{categoryId}</div>
        <div className={styles.product_name}>{productName}</div>
        <div className={styles.unit_price}>{US_dollar.format(unitPrice)}</div>
        <div className={styles.product_manufacturer}>{manufacturer}</div>
        <div className={styles.product_description}>{description}</div>
        <div className={styles.product_rating}>{rating}</div>
        <div className={styles.product_sku}>{sku}</div>
      </div>
    </div>
  );
};

export default ProductCard;
