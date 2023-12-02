import React, { useState } from "react";
import styles from "./AddToCartButton.module.css";

type AddToCartButtonProps = {
  productId: number;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = (props: AddToCartButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async () => {
    console.log("Add to Cart Clicked for Product:", props.productId);

    const userId = 1; // Assuming user ID is 1 for now

    fetch(`http://localhost:5165/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        productId: props.productId
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        return response.text();
      })
      .then(() => console.log("Product added to cart"))
      .catch(error => console.error('Error:', error))
      .finally(() => setIsLoading(false));
  };

  return (
    <button onClick={handleAddToCart} className={styles.addToCartButton}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;