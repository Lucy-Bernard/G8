"use client";

import Link from "next/link";
import React, {useState} from "react";

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
        return {...item, quantity: Math.max(1, newQuantity)};
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

  // Inline styles
  const styles = {
    cartContainer: {
      maxWidth: "800px",
      margin: "auto",
      padding: "20px",
    },
    cartItem: {
      border: "1px solid #ddd",
      padding: "15px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
    },
    cartItemImage: {
      maxWidth: "150px",
      marginRight: "20px",
      borderRadius: "4px",
    },
    cartItemDetails: {
      flexGrow: 1,
    },
    cartItemButton: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    proceedButton: {
      backgroundColor: "green",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    quantityButton: {
      backgroundColor: "white",
      color: "black",
      padding: "5px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      margin: "0 5px",
    },
  };

  return (
    <div style={styles.cartContainer}>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <img
              src={item.imageUrl}
              alt={item.name}
              style={styles.cartItemImage}
            />
            <div style={styles.cartItemDetails}>
              <h2>{item.name}</h2>
              <p>Total: ${calculateItemTotal(item.price, item.quantity)}</p>
              <div>
                <button
                  style={styles.quantityButton}
                  onClick={() => decrementQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  style={styles.quantityButton}
                  onClick={() => incrementQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <button
                style={styles.cartItemButton}
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
          <button style={styles.proceedButton}>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
