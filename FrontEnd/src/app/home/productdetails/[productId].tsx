// "use client";

// import styles from "../page.module.css";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Product } from "@/app/home/page"

// type ProductDetailsProps = {
//     productId: string;
//     unitPrice: number;
// };

// export default function ProductDetails(props: ProductDetailsProps) {

//   const [productDetails, setProductDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);


//   const US_dollar = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   });
  
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
//       <div className={styles.product_card}>

//       </div>
//       <h1>Product Details</h1>
//       {productDetails ? (
//         <div>
//           <h2>{productDetails.productName}</h2>
//           <p>Price: ${productDetails.unitPrice}</p>
//           {/* Add more details as needed */}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </main>
//   );
// };

