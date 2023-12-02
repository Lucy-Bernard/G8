"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Image from 'next/image';
import ProductCard from "@/components/ProductCard/ProductCard";
import Rating from "@mui/material/Rating";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

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
    <main className={styles.main}>
      {productDetails ? (
        <div className={styles.product_details_container}>

          <ProductCard product={productDetails} productDetailsPage={true} />

          <div className={styles.details}>
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
              <Rating name="half-rating-read" defaultValue={productDetails.rating} precision={0.5} readOnly />
            </div>
            <div className={styles.product_sku}>
              <p>SKU: {productDetails.sku}</p>
            </div>

          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ProductDetails;
