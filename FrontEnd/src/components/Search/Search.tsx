// SearchButtonThatSlides.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import styles from './Search.module.css';

// These keys MUST be in camel case
export type Product = {
    productId: number,
    productName: string,
    unitPrice: number
}

export type SearchBarResults = {
    productId: number,
    productName: string,
    unitPrice: number
}

const SearchButtonThatSlides: React.FC = () => {
    const router = useRouter(); // router to redirect users to other pages
    const [searchBarResults, setSearchBarResults] = useState<SearchBarResults[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [productsData, setProductsData] = useState<Product[]>([]);
    // const [bottomsData, setBottomsData] = useState([]);
    // const [outerwearData, setOuterwearData] = useState([]);
    // const [shoesData, setShoesData] = useState([]);
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

    /**
     * TO DO:: get categories and products into state
     * onchange will filter through and look for 
     * values in state
     * 
     * onchange the input will search the product_list
     * and categories that are stored in the state
     * if exact mathc is found it will go to page
     * if not will throw an exception
     * 
     * @param event 
     * @returns 
     */
    const handleChange = (event: any) => {
        const available = productsData.filter(obj => {
            return obj.productName.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setSearchBarResults(available)
        return false
    }

    const goToPage = () => {
        if (searchBarResults.length === 0) {
            alert('There are no matches!')
        }
        router.push('/product/' + searchBarResults[0].productId)
        return false
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
                      goToPage()
                    }
                  }}
            />
        </div>
    );
};
export default SearchButtonThatSlides;

