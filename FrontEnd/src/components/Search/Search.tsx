"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import styles from './Search.module.css';


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
}

const SearchButtonThatSlides: React.FC = () => {
    const router = useRouter(); // router to redirect users to other pages
    const [searchBarResults, setSearchBarResults] = useState<SearchBarResults[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [productsData, setProductsData] = useState<Product[]>([]);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:5165/api/product", {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                setProductsData(result) 
                setSearchBarResults(result)}
                )
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

 
    const handleChange = (event: any) => {
        const available = productsData.filter(obj => {
            return obj.productName.toLowerCase().includes(event.target.value.toLowerCase())
        })
        console.log(available)
        setSearchBarResults(available)
        return false
    }
    const clearSearchBarResults = () => {
        setSearchBarResults([]);
    };

    const goToPage = (target: any) => {
        if (searchBarResults.length === 0) {
            alert('There are no matches!')
        }

        if (window.location.href.indexOf('?productId=') === -1) {
            router.push('/home/productdetails?productId=' + searchBarResults[0].productId)
            target.value = ''
        } else {
            /**
             * since the router.push(..) is pushing to the same url with different query paramters, this is how to reload the page with the new url and appropriate query parameter
             */
            location.href = location.origin + location.pathname + '?productId=' + searchBarResults[0].productId
        }
    }

  

    return (
        <div className={styles.searchButton}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
                onChange={handleChange}
                onKeyDown={event => {
                    if (event.key === 'Enter') { 
                      goToPage(event.target)
                    }
                  }}
            />
        </div>
    );
};
export default SearchButtonThatSlides;