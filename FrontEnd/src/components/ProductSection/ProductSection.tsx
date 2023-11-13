// ProductSection.tsx

import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from "./ProductSection.module.css";

interface ProductSectionProps {
  title: string;
  products: Array<{ productName: string; imageUrl: string }>;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <section className={styles.productSection}>
      <h2>{title}</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard productId={0} unitPrice={0} key={product.productName} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
