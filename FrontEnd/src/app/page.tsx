import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css"
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import NavigationBar, { PageLink } from "@/components/NavigationBar/NavigationBar";
import ProductSection from "@/components/ProductSection/ProductSection";

export default function Home() {
  return (

    <main>
      <Header />
      <NavigationBar />
      <Banner />
      <div className={styles.main}>
        <h1>Home</h1>
      </div>
      <ProductSection title={""} products={[]} />
    </main>
  )
}


