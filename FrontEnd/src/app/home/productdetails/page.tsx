"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Rating from "@mui/material/Rating";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import Image from "next/image";

function ProductDetailsContent() {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const searchParams = useSearchParams();
  const productIdString = searchParams.get("productId");
  const productId = productIdString ? Number(productIdString) : null;

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

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!productDetails) return null;

  const product_image = require(
    "@/assets/Product Images/" + productDetails.imageLink,
  );

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        {/* Left: product image */}
        <div className={styles.imageContainer}>
          <Image
            src={product_image}
            alt={productDetails.productName}
            width={380}
            height={460}
            className={styles.image}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right: product details */}
        <div className={styles.details}>
          <h1 className={styles.productName}>{productDetails.productName}</h1>

          <p className={styles.price}>
            {US_dollar.format(productDetails.unitPrice)}
          </p>

          <div className={styles.ratingRow}>
            <Rating
              name="half-rating-read"
              defaultValue={productDetails.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className={styles.ratingValue}>{productDetails.rating}</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Manufacturer</span>
            <span className={styles.metaValue}>
              {productDetails.manufacturer}
            </span>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>SKU</span>
            <span className={styles.metaValue}>{productDetails.sku}</span>
          </div>

          <div className={styles.description}>
            <p className={styles.metaLabel}>Description</p>
            <p className={styles.descriptionText}>
              {productDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Add to cart button — full width of the wrapper */}
      {productId && !isNaN(productId) && (
        <div className={styles.cartButtonWrapper}>
          <AddToCartButton productId={productId} />
        </div>
      )}
    </main>
  );
}

export default function ProductDetails() {
  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <ProductDetailsContent />
    </Suspense>
  );
}
