import { useSelector } from "react-redux";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";

function Home() {
  const products = useSelector((state) => state.products.items);

  // just showing the first 8 as "featured" products
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      <Hero />
      <Features />
      <Categories />

      <section className="product-section">
        <Reveal as="h2" className="section-title">FEATURED PRODUCTS</Reveal>
        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <Reveal as="div" delay={(index % 4) * 70} key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
