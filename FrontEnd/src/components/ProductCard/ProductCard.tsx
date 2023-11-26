import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import {Product} from "@/app/home/page";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard(props: ProductCardProps) {
  const product_image = require("@/assets/Product Images/" +
    props.product.imageLink);

  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleAddToCart = () => {
    console.log("Add to Cart Clicked for Product:", props.product.productId);

    const userId = 1; // Assuming user ID is 1 for now

    fetch(`http://localhost:5165/api/cart/add`, { // the error is right here, api/cart/add is wrong
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({userId: 1, productId: props.product.productId}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add to cart");
        }
        return response.text();
      })
      .then(() => console.log("Product added to cart"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={styles.product_card}>
      <Image
        className={styles.product_image}
        src={product_image}
        alt={props.product.productName}
        height={175}
        width={250}
        loading="lazy"
      />

      <div className={styles.product_information}>
        {/* <div className={styles.category_id}>{props.product.categoryId}</div> */}
        <div className={styles.product_name}>{props.product.productName}</div>
        <div className={styles.unit_price}>
          {US_dollar.format(props.product.unitPrice)}
        </div>
        {/* <div className={styles.product_manufacturer}>{props.product.manufacturer}</div>
        <div className={styles.product_description}>{props.product.description}</div>
        <div className={styles.product_rating}>{props.product.rating}</div>
        <div className={styles.product_sku}>{props.product.sku}</div> */}
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
