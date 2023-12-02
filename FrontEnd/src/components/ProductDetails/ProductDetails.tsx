// import React, { useEffect, useState } from "react";
// import styles from "./ProductDetails.module.css";

// type ProductDetailsProps = {
//     productId: number;
//     productName: string;
//     unitPrice: number;
//     manufacturer: string;
//     description: string;
//     rating: number;
//     sku: string;
//     imageLink: string;
// };

// const ProductDetails = (props: ProductDetailsProps) => {
//   const [productDetails, setProductDetails] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     fetch(`http://localhost:5165/api/product/${props.productId}`, {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     })
//       .then((response) => response.json())
//       .then((result) => setProductDetails(result))
//       .catch((error) => setError(error.message))
//       .finally(() => setIsLoading(false));
//   }, [props.productId]);

//   return (
//     <main>
//       <h1>Product Details</h1>
//       {productDetails ? (
//         <div>
//             <img src={productDetails?.imageLink} alt={productDetails?.productName} />
//             <h2>{productDetails.productName}</h2>
//             <p>Price: ${productDetails.unitPrice} </p>
//             <div className={styles.product_manufacturer}>
//                 <p>Manufacturer: {productDetails.manufacturer} </p></div>
//             <div className={styles.product_description}>
//                 <p>Description: {productDetails.description} </p></div>
//             <div className={styles.product_rating}>
//                 <p>Rating: {productDetails.rating} </p></div>
//             <div className={styles.product_sku}>
//                 <p>SKU: {productDetails.sku} </p></div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </main>
//   );
// };

// export default ProductDetails;
