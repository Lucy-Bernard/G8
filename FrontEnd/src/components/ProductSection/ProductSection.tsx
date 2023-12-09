/*
 * ProductSection Component
 * 
 * This component represents a section containing a title and a list of products displayed
 * using the ProductCard component. It utilizes the Next.js Link component to create links
 * to individual product details pages. The component receives a title and an array of products
 * as props to populate the section.
 */

import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductSection.module.css";
import Link from "next/link";
import { Product } from "@/app/home/page";

// Define the props for the ProductSection component
type ProductSectionProps = {
  title: string;
  products: Product[];
};

// ProductSection Component Function
const ProductSection: React.FC<ProductSectionProps> = (
  props: ProductSectionProps
) => {
  return (
    <section className={styles.productSection}>
      {props.products.map((product, index) => (
        <Link
          className={styles.link}
          key={index}
          href={`/home/productdetails?productId=${product.productId}`}
        >
          <ProductCard key={product.productId} product={product} />
        </Link>
      ))}
    </section>
  );
};

export default ProductSection;
