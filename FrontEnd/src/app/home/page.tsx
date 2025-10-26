/*
 * Home Page Component
 *
 * This component represents the home page of the online store. It fetches products
 * from the API and displays them in a 4x4 grid layout with 4 products per category.
 *
 * Layout:
 * - Row 1: Tops (4 items)
 * - Row 2: Bottoms (4 items)
 * - Row 3: Shoes (4 items)
 * - Row 4: Outerwear (4 items)
 */

"use client";

import styles from "./page.module.css";
import Banner from "@/components/Banner/Banner";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the Product type
export type Product = {
  productId: number;
  categoryId: number;
  productName: string;
  unitPrice: number;
  manufacturer: string;
  description: string;
  rating: number;
  sku: string;
  imageLink: string;
};

// Define the Home component
export default function Home() {
  // State variables to manage loading, product data, and errors
  const [isLoading, setIsLoading] = useState(true);
  const [topsData, setTopsData] = useState<Product[]>([]);
  const [bottomsData, setBottomsData] = useState<Product[]>([]);
  const [shoesData, setShoesData] = useState<Product[]>([]);
  const [outerwearData, setOuterwearData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
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

  // Filter and categorize products, limiting to 4 items per category
  function filterCategory(result: Product[]) {
    setTopsData(result.filter((p) => p.categoryId === 1).slice(0, 4));
    setBottomsData(result.filter((p) => p.categoryId === 2).slice(0, 4));
    setShoesData(result.filter((p) => p.categoryId === 4).slice(0, 4));
    setOuterwearData(result.filter((p) => p.categoryId === 3).slice(0, 4));
  }

  return (
    <main>
      <Banner />
      <div className={styles.main}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.gridContainer}>
            {/* Row 1: Tops */}
            <div className={styles.categoryRow}>
              <h2 className={styles.categoryTitle}>Tops</h2>
              <div className={styles.productGrid}>
                {topsData.map((product) => (
                  <Link
                    key={product.productId}
                    href={`/home/productdetails?productId=${product.productId}`}
                    className={styles.productLink}
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Row 2: Bottoms */}
            <div className={styles.categoryRow}>
              <h2 className={styles.categoryTitle}>Bottoms</h2>
              <div className={styles.productGrid}>
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
            </div>

            {/* Row 3: Shoes */}
            <div className={styles.categoryRow}>
              <h2 className={styles.categoryTitle}>Shoes</h2>
              <div className={styles.productGrid}>
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
            </div>

            {/* Row 4: Outerwear */}
            <div className={styles.categoryRow}>
              <h2 className={styles.categoryTitle}>Outerwear</h2>
              <div className={styles.productGrid}>
                {outerwearData.map((product) => (
                  <Link
                    key={product.productId}
                    href={`/home/productdetails?productId=${product.productId}`}
                    className={styles.productLink}
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

