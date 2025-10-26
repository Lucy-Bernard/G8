/*
 * Shoes Page Component
 *
 * This page displays all products in the "Shoes" category.
 * Products are fetched from the API and rendered using the ProductCard component.
 */

"use client";

import styles from "../tops/page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/app/home/page";

export default function ShoesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [shoesData, setShoesData] = useState<Product[]>([]);
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

  // Filter products to show only Shoes (categoryId === 4)
  function filterCategory(result: Product[]) {
    const filteredShoes = result.filter((product) => product.categoryId === 4);
    setShoesData(filteredShoes);
  }

  return (
    <main>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Shoes</h1>
        {isLoading ? (
          <p className={styles.message}>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.productsGrid}>
            {shoesData.map((product) => (
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

