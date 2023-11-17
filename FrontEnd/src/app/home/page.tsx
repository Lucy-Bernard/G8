"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css"
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
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
  const [productsData, setProductsData] = useState<Product[]>([]);
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
      .then(result => setProductsData(result))
      .catch(error => console.log("Error:", error))
      .finally(() => setIsLoading(false));
  },[]);

  return (
    <main>
        <NavigationBar />
        <Banner />
        <div className={styles.main}>
          <h1>Home</h1>
          {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
          <ProductSection title="Products" products={productsData} />
        </>
        )}
        </div>
        <footer>
          
        </footer>
    </main>
  );
}
