/*
 * ProductCard Component
 * 
 * This component represents a card displaying product information. 
 */

import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { Product } from "@/app/home/page";

// Define the props for the ProductCard component
type ProductCardProps = {
  product: Product; // The product to display on the card
  productDetailsPage?: boolean; // Prop to indicate if the card is used on the ProductDetails page
  cartPage?: boolean; // Prop to indicate if the card is used on the Cart page
};

// ProductCard Component Function
export default function ProductCard(props: ProductCardProps) {
  // Dynamically import the product image based on the provided imageLink
  const product_image = require("@/assets/Product Images/" +
    props.product.imageLink);
  // Format currency using the US dollar format
  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div
      className={`${styles.product_card} ${props.productDetailsPage ? styles.product_details_page : ""
        } ${props.cartPage ? styles.cart_page : ""}`}
    >
      <Image
        className={styles.product_image}
        src={product_image}
        alt={props.product.productName}
        height={175}
        width={250}
        loading="lazy"
      />

      <div className={styles.product_information}>
        <div className={styles.product_name_price}>
          <div className={styles.product_name}>{props.product.productName}</div>

          <div className={styles.unit_price}>
            {US_dollar.format(props.product.unitPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
