"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";

// These keys MUST be in camel case
export type Product = {
  productId: number,
  productName: string,
  unitPrice: number
}

export default function Products() {
  const [is_loading, set_is_loading] = useState(true);
  const [product_list, set_product_list] = useState<Array<Product>>([]);

  useEffect(() => {
    var request_options: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://localhost:5165/api/product", request_options)
      .then(response => response.json())
      .then(result => set_product_list(result))
      .catch(error => console.log("Error: ", error))
      .finally(() => set_is_loading(false));
  }, []);

  return (
    <main className={styles.main}>
      {is_loading
        ?
        <h1>Loading...</h1>
        :
        <div className={styles.grid}>
          {product_list.map((product) => {
            return (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                unitPrice={product.unitPrice}
              />
            );
          })}
        </div>
      }
    </main>
  );
}