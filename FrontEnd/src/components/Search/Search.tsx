

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
        setSearchBarResults(available)
        return false
    }

    const goToPage = () => {
        if (searchBarResults.length === 0) {
            alert('There are no matches!')
        }
     /*   if(searchBarResults[0].categoryId == 1){
            router.push('/home/tops') 
            return false
        }
        if(searchBarResults[0].categoryId == 2){
            router.push('/home/bottoms') 
            return false
        }
        if(searchBarResults[0].categoryId == 3){
            router.push('/home/outerwear') 
            return false
        }
        if(searchBarResults[0].categoryId == 4){
            router.push('/home/shoes') 
            return false
        }*/

        router.push('/home/productdetails?productId=' + searchBarResults[0].productId)
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

