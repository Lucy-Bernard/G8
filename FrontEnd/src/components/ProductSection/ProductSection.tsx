import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductSection.module.css';

export type SingleProduct ={
  productId: number,
  productName: string,
  unitPrice: number,
  imageLink: string
}

interface ProductSectionProps {
  title: string;
  products: SingleProduct[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <section className={styles.productSection}>
      <h2>{title}</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            productId={product.productId}
            productName={product.productName}
            unitPrice={product.unitPrice}
            imageLink={product.imageLink}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
