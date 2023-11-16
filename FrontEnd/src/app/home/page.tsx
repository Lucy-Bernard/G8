import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css"
import Banner from "@/components/Banner/Banner";
import ProductSection from "@/components/ProductSection/ProductSection";
import Products from "../products/page";

export default function Home() {
  
  return (
    <main>
      <Banner />
      <div className={styles.main}>
        <h1>Home</h1>
        <ProductSection title={"Tops"} products={topsProducts}/>
      </div>
    </main>
  )
}