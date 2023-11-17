import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductSection.module.css';

export type SingleProduct ={
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
    </section>
  );
};

export default ProductSection;
