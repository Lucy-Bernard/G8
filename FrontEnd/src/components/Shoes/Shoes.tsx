import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; 
import styles from './Shoes.module.css'; 

interface ShoesProps {
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

const Shoes: React.FC<ShoesProps> = ({ products }) => {
  return (
    <div className={styles.topsContainer}>
      <h2>Shoes</h2>
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

export default Shoes;
