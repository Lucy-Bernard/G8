import React, { useState } from "react";
import styles from "./AddToCartButton.module.css";
import { useUser } from "@/app/user";

type AddToCartButtonProps = {
  productId: number;
  onAddToCart: () => void;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = (
  props: AddToCartButtonProps
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {user, setUser} = useUser();

  const handleAddToCart = async () => {
    console.log("Add to Cart Clicked for Product:", props.productId);

    const userId = user?.userId;

    fetch(`http://localhost:5165/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        productId: props.productId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add to cart");
        }
        return response.text();
      })
      .then(() => console.log("Product added to cart"))
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <button onClick={handleAddToCart} className={styles.addToCartButton}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;

function onAddToCart() {
  throw new Error("Function not implemented.");
}