import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; // Import your ProductCard component
import styles from './Outerwear.module.css'; // Add your CSS styles

interface OuterwearProps {
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

const Outerwear: React.FC<OuterwearProps> = ({ products }) => {
  return (
    <div className={styles.outerwearsContainer}>
      <h2>Outerwear</h2>
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

export default Outerwear;