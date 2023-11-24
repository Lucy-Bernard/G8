import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductSection.module.css";
import Link from "next/link";
import { Product } from "@/app/home/page";

type ProductSectionProps ={
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({title, products}) => {
  return (
    <section className={styles.productSection}>
      <h2>{title}</h2>
      
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
