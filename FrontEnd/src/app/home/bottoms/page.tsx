/*
 * Bottoms Page Component
 * 
 * This component represents the page displaying products in the "Bottoms" category.
 * 
 */

"use client";

import styles from "../page.module.css";
import ProductSection from "@/components/ProductSection/ProductSection";
import { useEffect, useState } from "react";
import { Product } from "@/app/home/page";

// Bottoms Page Component Function
export default function BottomsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [bottomsData, setBottomsData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data from the API when the component mounts
  useEffect(() => {
    var myHeaders = new Headers();
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

  // Filter products based on the category ID (2 for Bottoms)
  function filterCategory(result: Product[]) {
    const filteredTops = result.filter((product) => product.categoryId === 2);
    setBottomsData(filteredTops);
  }

  return (
    <main>
      <div className={styles.main}>
        <h1>Bottoms</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ProductSection title="Bottoms" products={bottomsData} />
        )}
      </div>
    </main>
  );
}
