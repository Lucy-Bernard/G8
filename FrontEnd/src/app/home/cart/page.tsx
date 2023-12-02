"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./page.module.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Existing CartItem type
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

// Initial mock data for cart items
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Sample Cart Item 1",
    price: 15.99,
    quantity: 2,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Sample Cart Item 2",
    price: 45.5,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/150",
  },
  // Add more cart items if needed
];

const Cart = () => {
  // State to track cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Function to calculate total price
  const calculateTotal = (items: CartItem[]) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to format price
  const formatPrice = (price: number) => price.toFixed(2);

  // Function to handle quantity change
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to increment quantity
  const incrementQuantity = (itemId: number) => {
    handleQuantityChange(itemId, getItemQuantity(itemId) + 1);
  };

  // Function to decrement quantity
  const decrementQuantity = (itemId: number) => {
    handleQuantityChange(itemId, Math.max(1, getItemQuantity(itemId) - 1));
  };

  // Helper function to get item quantity
  const getItemQuantity = (itemId: number) => {
    return cartItems.find((item) => item.id === itemId)?.quantity || 0;
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Function to calculate and format item total
  const calculateItemTotal = (price: number, quantity: number) => {
    return formatPrice(price * quantity);
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className={styles.cartItemImage}
            />
            <div className={styles.cartItemDetails}>
              <h2>{item.name}</h2>
              <div className={styles.cartItemPrice}>
                <p>Total: ${calculateItemTotal(item.price, item.quantity)}</p>
              </div>
              <div>
                <button
                  className={styles.quantityButton}
                  onClick={() => decrementQuantity(item.id)}
                >
                  <RemoveCircleIcon />
                </button>

                <span>{item.quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => incrementQuantity(item.id)}
                >
                  <AddCircleIcon />
                </button>
              </div>
              <button
                className={styles.cartItemButton}
                onClick={() => handleRemoveItem(item.id)}
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
