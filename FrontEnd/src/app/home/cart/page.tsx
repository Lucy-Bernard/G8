import React from 'react';
import Link from 'next/link';
import styles from "./page.module.css";

const Cart = () => {
  return (
    <div className={styles.test}>
      <h1>Cart</h1>
      <Link href="/home/checkout" passHref>
        <button type="button">Go to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
