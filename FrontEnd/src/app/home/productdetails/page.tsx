"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Image from 'next/image';
import ProductCard from "@/components/ProductCard/ProductCard";
import Rating from "@mui/material/Rating";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SnackbarContent from "@mui/material/SnackbarContent";

const ProductDetails = () => {
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

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to open the snackbar
  const showSnackbar = () => {
    setOpenSnackbar(true);
  };

  // Function to close the snackbar
  const handleCloseSnackbar = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          message="Cart updated successfully!"
          style={{ backgroundColor: 'green' }}
        />
      </Snackbar>

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
      {/** convert product id into a number for add to cart button */}
      {productId && !isNaN(productId) && (
        <AddToCartButton productId={productId} onAddToCart={showSnackbar} />
      )}
    </main>
  );
};

export default ProductDetails;