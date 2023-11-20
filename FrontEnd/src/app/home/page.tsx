"use client";

import styles from "./page.module.css";
import Banner from "@/components/Banner/Banner";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import ProductSection from "@/components/ProductSection/ProductSection";
import {useEffect, useState} from "react";
import Link from "next/link";

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [topsData, setTopsData] = useState<Product[]>([]);
  const [bottomsData, setBottomsData] = useState<Product[]>([]);
  const [outerwearData, setOuterwearData] = useState<Product[]>([]);
  const [shoesData, setShoesData] = useState<Product[]>([]);
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

  function filterCategory(result:Product[]){
    result.map((product)=>{
      if (product.categoryId == 1) {
        setTopsData([...topsData, product]);
      }
      if (product.categoryId == 2) {
        setBottomsData([...bottomsData, product]);
      }
      if (product.categoryId == 3) {
        setOuterwearData([...outerwearData, product]);
      }
      if (product.categoryId == 4) {
        setShoesData([...shoesData, product]);
      }
    })
  }

  return (
    <main>
      <NavigationBar />
      <Banner />
      <div className={styles.main}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <ProductSection title="Tops" products={topsData} />
            <ProductSection title="Bottoms" products={bottomsData} />
            <ProductSection title="Outerwear" products={outerwearData} />
            <ProductSection title="Shoes" products={shoesData} />
          </>
        )}
      </div>
    </main>
  );
}
