/*
 * Tops Page Component
 * 
 * This component represents the page displaying products in the "Tops" category.
 * It fetches data from the API, filters products based on the category ID, and renders
 * the filtered products using the ProductSection component. It also handles loading and
 * error states during the data retrieval process.
 */

"use client";

import styles from "../page.module.css";
import ProductSection from "@/components/ProductSection/ProductSection";
import { useEffect, useState } from "react";
import { Product } from "@/app/home/page";

// Tops Page Component Function
export default function TopsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [topsData, setTopsData] = useState<Product[]>([]);
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

  // Filter products based on the category ID (1 for Tops)
  function filterCategory(result: Product[]) {
    const filteredTops = result.filter((product) => product.categoryId === 1);
    setTopsData(filteredTops);
  }

  return (
    <main>
      <div className={styles.main}>
        <h1>Tops</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ProductSection title="Tops" products={topsData} />
        )}
      </div>
    </main>
  );
}
