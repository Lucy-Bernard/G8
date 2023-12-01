"use client"

import React, { useState } from "react";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const ProductDetailsPage = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);


  return (
    <div>
      <ProductDetails productId={1} unitPrice={0} imageLink={""} productName={""} manufacturer={""} description={""} rating={0} sku={""} />
    </div>
  );
};

export default ProductDetailsPage;