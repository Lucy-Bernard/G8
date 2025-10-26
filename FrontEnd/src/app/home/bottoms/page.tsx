/*
 * Bottoms Page Component
 *
 * This page displays all products in the "Bottoms" category.
 * Products are fetched from the API and rendered using the ProductCard component.
 */

"use client";

import styles from "../tops/page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/app/home/page";

export default function BottomsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [bottomsData, setBottomsData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:5165/api/product", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => filterCategory(result))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter products to show only Bottoms (categoryId === 2)
  function filterCategory(result: Product[]) {
    const filteredBottoms = result.filter((product) => product.categoryId === 2);
    setBottomsData(filteredBottoms);
  }

  return (
    <main>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Bottoms</h1>
        {isLoading ? (
          <p className={styles.message}>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.productsGrid}>
            {bottomsData.map((product) => (
              <Link
                key={product.productId}
                href={`/home/productdetails?productId=${product.productId}`}
                className={styles.productLink}
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

