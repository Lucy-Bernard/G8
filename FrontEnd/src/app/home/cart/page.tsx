"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useUser } from "@/app/user";

// Existing CartItem type

export type CartItem = {
  cartItemId: number;
  productId: number;
  categoryId: number;
  quantity: number;
  productName: string;
  unitPrice: number;
  manufacturer: string;
  description: string;
  rating: number;
  sku: string;
  imageLink: string;
};

const Cart = () => {
  // State to track cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useUser();

  useEffect(() => {
    fetch(`http://localhost:5165/api/cart/${user?.userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        return response.json();
      })
      .then(setCartItems)
      .catch((error) => setError(error.message));
  }, []);
  // Function to calculate total price
  const calculateTotal = (items: CartItem[]) =>
    items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Function to format price
  const formatPrice = (price: number) => price.toFixed(2);

  // Function to handle quantity change
  const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
    newQuantity = Math.max(1, newQuantity); // Ensure the quantity is at least 1

    fetch(`http://localhost:5165/api/cart/${cartItemId}/${newQuantity}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update quantity");
        }
        return response.text();
      })
      .then(() => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.cartItemId === cartItemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to increment quantity
  const incrementQuantity = (cartItemId: number) => {
    const currentQuantity = getItemQuantity(cartItemId);
    handleQuantityChange(cartItemId, currentQuantity + 1);
  };

  // Function to decrement quantity
  const decrementQuantity = (cartItemId: number) => {
    const currentQuantity = getItemQuantity(cartItemId);
    handleQuantityChange(cartItemId, Math.max(1, currentQuantity - 1));
  };

  // Helper function to get item quantity
  const getItemQuantity = (cartItemId: number) => {
    return (
      cartItems.find((item) => item.cartItemId === cartItemId)?.quantity || 0
    );
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (cartItemId: number) => {
    fetch(`http://localhost:5165/api/cart/${cartItemId}`, {
      method: "DELETE",

      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove item from cart");
        }
        // Filter out the removed item from the cartItems state
        const updatedCartItems = cartItems.filter(
          (item) => item.cartItemId !== cartItemId
        );
        setCartItems(updatedCartItems);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to calculate and format item total
  const calculateItemTotal = (unitPrice: number, quantity: number) => {
    return formatPrice(unitPrice * quantity);
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.YourShoppingCartHeader}>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.cartItemId} className={styles.cartItem}>
            <ProductCard product={item} cartPage={true} />

            <div className={styles.cartItemDetails}>
              <h2>{item.productName}</h2>
              <p>Price: ${formatPrice(item.unitPrice)}</p>
              <p>Total: ${calculateItemTotal(item.unitPrice, item.quantity)}</p>
              <div>
                <button
                  className={styles.quantityButton}
                  onClick={() => decrementQuantity(item.cartItemId)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => incrementQuantity(item.cartItemId)}
                >
                  +
                </button>
              </div>
              <button
                className={styles.cartItemButton}
                onClick={() => handleRemoveItem(item.cartItemId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      <div>
        <h3>Total Cost: ${formatPrice(calculateTotal(cartItems))}</h3>
        <Link href="/home/cart/checkout">
          <button className={styles.proceedButton}>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;