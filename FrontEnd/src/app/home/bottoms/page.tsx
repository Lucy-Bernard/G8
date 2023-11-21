"use client";

import styles from "../page.module.css";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import ProductSection from "@/components/ProductSection/ProductSection";
import { useEffect, useState } from "react";

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

export default function BottomsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [bottomsData, setBottomsData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  function filterCategory(result: Product[]) {
    const filteredTops = result.filter((product) => product.categoryId === 2);
    setBottomsData(filteredTops);
  }

  return (
    <main>
      <NavigationBar />
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
