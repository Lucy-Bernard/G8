"use client";
import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import Rating from "@mui/material/Rating";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import { Product } from "@/app/home/page";

type ProductCardProps = {
  product: Product;
  productDetailsPage?: boolean;
  cartPage?: boolean;
};

export default function ProductCard(props: ProductCardProps) {
  const product_image = require(
    "@/assets/Product Images/" + props.product.imageLink,
  );

  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Don't show add to cart button on cart page or product details page
  const showAddToCart = !props.cartPage && !props.productDetailsPage;

  return (
    <div
      className={`${styles.product_card} ${
        props.productDetailsPage ? styles.product_details_page : ""
      } ${props.cartPage ? styles.cart_page : ""}`}
    >
      <div className={styles.image_container}>
        <Image
          className={styles.product_image}
          src={product_image}
          alt={props.product.productName}
          height={280}
          width={220}
          loading="lazy"
        />
      </div>

      <div className={styles.product_information}>
        <div className={styles.product_name}>{props.product.productName}</div>

        <div className={styles.rating_row}>
          <Rating
            name="read-only"
            value={props.product.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className={styles.rating_value}>{props.product.rating}</span>
        </div>

        <div className={styles.product_footer}>
          <div className={styles.unit_price}>
            {US_dollar.format(props.product.unitPrice)}
          </div>

          {showAddToCart && (
            <AddToCartButton productId={props.product.productId} />
          )}
        </div>
      </div>
    </div>
  );
}
