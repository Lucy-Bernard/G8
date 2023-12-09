/*
 * Shoes Page Component
 * 
 * This component represents the page displaying products in the "Shoes" category.
 * 
 */

"use client";

import styles from "../page.module.css";
import ProductSection from "@/components/ProductSection/ProductSection";
import { useEffect, useState } from "react";
import { Product } from "@/app/home/page";

// Shoes Page Component Function
export default function ShoesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [shoesData, setShoesData] = useState<Product[]>([]);
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

  // Filter products based on the category ID (4 for Shoes)
  function filterCategory(result: Product[]) {
    const filteredTops = result.filter((product) => product.categoryId === 4);
    setShoesData(filteredTops);
  }

  return (
    <main>
      <div className={styles.main}>
        <h1>Shoes</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ProductSection title="Shoes" products={shoesData} />
        )}
      </div>
    </main>
  );
}
