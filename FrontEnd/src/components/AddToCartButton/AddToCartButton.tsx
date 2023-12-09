/*
 * AddToCartButton Component
 * 
 * This React component represents a button for adding a product to the user's cart.
 */

import React, { useState } from "react";
import styles from "./AddToCartButton.module.css";

type AddToCartButtonProps = {
  productId: number;
};

/*
* Handles the click event for the "Add to Cart" button.
* Sends a request to the server to add the specified product to the user's cart.
*/
const AddToCartButton: React.FC<AddToCartButtonProps> = (
  props: AddToCartButtonProps
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async () => {
    console.log("Add to Cart Clicked for Product:", props.productId);

    const userId = 1; // This gets updated to the actual userId later

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

  /*
   * Renders the AddToCartButton component.
   * 
   * The component displays a button with the text "Add to Cart" and triggers the handleAddToCart function on click.
   */
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