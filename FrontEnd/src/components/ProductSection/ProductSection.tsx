import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductSection.module.css";
import Link from "next/link";
import { Product } from "@/app/home/page";

type ProductSectionProps = {
  title: string;
  products: Product[];
};

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <section className={styles.productSection}>
      {products.map((product) => (
        <Link
          className={styles.link}
          key={product.productId}
          href={`/home/productdetails?productId=${product.productId}`}
        >
          <ProductCard key={product.productId} product={product} />
        </Link>
      ))}
    </section>
  );
};

export default ProductSection;
