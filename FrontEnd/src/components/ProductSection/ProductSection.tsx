import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductSection.module.css";
import Link from "next/link";
import {Product} from "@/app/home/page";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

type ProductSectionProps = {
  title: string;
  products: Product[];
};

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
