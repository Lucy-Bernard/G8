import Image from "next/image";
import styles from "./ProductCard.module.css";
import { Product } from "@/app/products/page";

export default function ProductCard(props: Product) {
  const product_image = require("@/assets/Product Images/" + props.productName + ".webp");

  const US_dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <div className={styles.product_card}>
      <Image
        className={styles.product_image}
        src={product_image}
        alt={props.productName}
        height="175"
        width="250"
      />

      <div className={styles.product_information}>
        <div className={styles.product_name}>
          {props.productName}
        </div>

        <div className={styles.unit_price}>
          {US_dollar.format(props.unitPrice)}
        </div>
      </div>
    </div>
  );
}