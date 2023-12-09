"use client";

import styles from "./page.module.css";
import Banner from "@/components/Banner/Banner";
import ProductSection from "@/components/ProductSection/ProductSection";
import {useEffect, useState} from "react";
import {withRouter, NextRouter} from "next/router";

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

export default function Home(props: {router: NextRouter}) {
  const [isLoading, setIsLoading] = useState(true);
  const [topsData, setTopsData] = useState<Product[]>([]);
  const [bottomsData, setBottomsData] = useState<Product[]>([]);
  const [outerwearData, setOuterwearData] = useState<Product[]>([]);
  const [shoesData, setShoesData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [badgeNumber, setBadgeNumber] = useState(0);

  // Sends API call to get products from the database
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

  // Separates products based on their categories to display on the home page
  function filterCategory(result: Product[]) {
    const newTopsData: Product[] = [];
    const newBottomsData: Product[] = [];
    const newOuterwearData: Product[] = [];
    const newShoesData: Product[] = [];

    result.forEach((product) => {
      if (newTopsData.length < 4 && product.categoryId === 1) {
        newTopsData.push(product);
      } else if (newBottomsData.length < 4 && product.categoryId === 2) {
        newBottomsData.push(product);
      } else if (newOuterwearData.length < 4 && product.categoryId === 3) {
        newOuterwearData.push(product);
      } else if (newShoesData.length < 4 && product.categoryId === 4) {
        newShoesData.push(product);
      }
    });

    setTopsData(newTopsData);
    setBottomsData(newBottomsData);
    setOuterwearData(newOuterwearData);
    setShoesData(newShoesData);
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
          <>
            <div className={styles.headerDiv}>
              <h2>Tops</h2>
              <ProductSection title="Tops" products={topsData} />
            </div>
            <div className={styles.headerDiv}>
              <h2>Bottoms</h2>
              <ProductSection title="Bottoms" products={bottomsData} />
            </div>
            <div className={styles.headerDiv}>
              <h2>Outerwear</h2>
              <ProductSection title="Outerwear" products={outerwearData} />
            </div>
            <div className={styles.headerDiv}>
              <h2>Shoes</h2>
              <ProductSection title="Shoes" products={shoesData} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
