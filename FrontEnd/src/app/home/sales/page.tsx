import React from "react";
import Link from "next/link";
import styles from "../page.module.css";

const sales = () => {
  return (
    <div className={styles.test}>
      <h1>sales</h1>
      <Link href="/home/sales" passHref></Link>
    </div>
  );
};

export default sales;
