"use client";

/*
 * React component representing a search button with sliding functionality.
 * This component provides a search input that fetches and filters product data,
 * and allows users to navigate to product details based on the search results.
 */
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./Search.module.css";

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

export type SearchBarResults = {
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

const SearchButtonThatSlides: React.FC = () => {
  const router = useRouter(); // router to redirect users to other pages
  const [searchBarResults, setSearchBarResults] = useState<SearchBarResults[]>(
    []
  );
  // State to manage search bar results and loading status
  const [isLoading, setIsLoading] = useState(true);
  const [productsData, setProductsData] = useState<Product[]>([]);

  // State to handle errors
  const [error, setError] = useState<string | null>(null);

    /*
   * Fetches product data from the server upon component mount.
   * Sets loading state, updates product data, and handles errors.
   */
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:5165/api/product", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setProductsData(result);
        setSearchBarResults(result);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

    /*
   * Handles the change event of the search input.
   * Filters product data based on the input value and updates the search results.
   */
  const handleChange = (event: any) => {
    const available = productsData.filter((obj) => {
      return obj.productName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    console.log(available);
    setSearchBarResults(available);
    return false;
  };


    /*
   * Navigates to the product details page based on the search results.
   * Shows an alert if there are no matches.
   */

  const goToPage = (target: any) => {
    if (searchBarResults.length === 0) {
      alert("There are no matches!");
    }

    if (window.location.href.indexOf("?productId=") === -1) {
      router.push(
        "/home/productdetails?productId=" + searchBarResults[0].productId
      );
      target.value = "";
    } else {
      /*
       * since the router.push(..) is pushing to the same url with different query paramters, this is how to reload the page with the new url and appropriate query parameter
       */
      location.href =
        location.origin +
        location.pathname +
        "?productId=" +
        searchBarResults[0].productId;
    }
  };

  return (
    <div className={styles.searchButton}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search"
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            goToPage(event.target);
          }
        }}
      />
    </div>
  );
};
export default SearchButtonThatSlides;
