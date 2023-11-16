"use client";

import styles from "./page.module.css"
import Banner from "@/components/Banner/Banner";
import ProductSection from "@/components/ProductSection/ProductSection";
import { useEffect, useState } from "react";

export type Product = {
  productId: number,
  categoryId: number,
  productName: string,
  unitPrice: number,
  manufacturer: string,
  description: string,
  rating: number,
  sku: string,
  imageLink: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<Product[]>([]);
  const [topsData, setTopsData] = useState([]);
  // const [bottomsData, setBottomsData] = useState([]);
  // const [outerwearData, setOuterwearData] = useState([]);
  // const [shoesData, setShoesData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5165/api/product", {
      method: "GET",
      redirect: "follow"
    })
      .then(response => response.json())
      .then(result => setTopsData(result))
      .catch(error => console.log("Error:", error))
      .finally(() => setIsLoading(false));
  },[]);

  return (
    <main>
        <Banner />
        <div className={styles.main}>
          <h1>Home</h1>
          {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <ProductSection title="Tops" products={topsData} />
          </>
        )}
        </div>
    </main>
  );
}
