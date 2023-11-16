// Bottoms.tsx

import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; // Import your ProductCard component
import styles from './Bottoms.module.css'; // Add your CSS styles

interface BottomsProps {
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

const Bottoms: React.FC<BottomsProps> = ({ products }) => {
  return (
    <div className={styles.bottomsContainer}>
      <h2>Bottoms</h2>
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

export default Bottoms;
