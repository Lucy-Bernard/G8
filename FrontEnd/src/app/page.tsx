import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css"
import NavigationBar, { PageLink } from "@/components/NavigationBar/NavigationBar";

export default function Home() {
  return (

    <main>
      <NavigationBar />
      <div className={styles.main}>
        <h1>Home</h1>
      </div>
      
    </main>
  )
}


