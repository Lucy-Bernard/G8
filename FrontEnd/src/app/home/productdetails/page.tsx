"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../page.module.css";


const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const product_image = require(`@/assets/Product Images/${productDetails?.imageLink}`);

  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:5165/api/product/${productId}`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setProductDetails(result))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main>
      <h1>Product Details</h1>
      {productDetails ? (
        <div>
          <div className={styles.product_productId}>
            <p>ProductId: {productId}</p>
          </div>

          <img
            className={styles.product_image}
            src={product_image}
            alt={productDetails?.productName}
            height={175}
            width={250}
            loading="lazy"
          />

          <h2>{productDetails.productName}</h2>

          <div className={styles.unit_price}>
            {US_dollar.format(productDetails.unitPrice)}
          </div>

          <div className={styles.product_manufacturer}>
            <p>Manufacturer: {productDetails.manufacturer}</p>
          </div>

          <div className={styles.product_description}>
            <p>Description: {productDetails.description}</p>
          </div>

          <div className={styles.product_rating}>
            <p>Rating: {productDetails.rating}</p>
          </div>

          <div className={styles.product_sku}>
            <p>SKU: {productDetails.sku}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ProductDetails;
