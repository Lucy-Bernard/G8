import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const router = useRouter();
  const productId = router.query.productId;

  // Fetch product details based on the productId and manage state with useState

  useEffect(() => {
    // Fetch product details using productId
    // Update state with the fetched product details
  }, [productId]);

  if (!productId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      {/* Display product details using the state */}
    </div>
  );
};

export default ProductDetails;
