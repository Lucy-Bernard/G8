// Tops.tsx

import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; 
import styles from './Tops.module.css'; 

interface TopsProps {
  products: Array<{
    productId: number,
    categoryId: number,
    productName: string,
    unitPrice: number,
    manufacturer: string,
    description: string,
    rating: number,
    sku: string,
    imageLink: string
  }>;
}

const Tops: React.FC<TopsProps> = ({ products }) => {
  return (
    <div className={styles.topsContainer}>
      <h2>Tops</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            productId={product.productId}
            categoryId={product.categoryId}
            productName={product.productName}
            unitPrice={product.unitPrice}
            manufacturer={product.manufacturer}
            description={product.description}
            rating={product.rating}
            sku={product.sku}
            imageLink={product.imageLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Tops;
