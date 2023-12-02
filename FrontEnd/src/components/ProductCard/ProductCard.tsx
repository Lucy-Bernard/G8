"use client";

import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { Product } from "@/app/home/page";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useContext, useState } from "react";

type ProductCardProps = {
  product: Product;
  productDetailsPage?: boolean; // Add a prop to indicate the ProductDetails page
};

export default function ProductCard(props: ProductCardProps) {
  const product_image = require("@/assets/Product Images/" +
    props.product.imageLink);

  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={`${styles.product_card} ${props.productDetailsPage ? styles.product_details_page : ''}`}>
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
          <div className={styles.product_name}>
            {props.product.productName}
          </div>

          <div className={styles.unit_price}>
            {US_dollar.format(props.product.unitPrice)}
          </div>
        </div>
        <AddToCartButton productId={props.product.productId} />
      </div>
    </div>
  );
}
