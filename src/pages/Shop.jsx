import { useSelector, useDispatch } from "react-redux";
import { setCategory, clearFilter } from "../redux/slices/filterSlice";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";

function Shop() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const selectedCategory = useSelector((state) => state.filter.selectedCategory);

  // get unique category names from the products list
  const allCategories = ["All"];
  products.forEach((product) => {
    if (!allCategories.includes(product.category)) {
      allCategories.push(product.category);
    }
  });

  // filter products based on selected category
  let filteredProducts = products;
  if (selectedCategory !== "All") {
    filteredProducts = products.filter((p) => p.category === selectedCategory);
  }

  return (
    <div className="shop-page">
      <h1 className="section-title">SHOP ALL PRODUCTS</h1>

      <div className="filter-bar">
        {allCategories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "filter-btn active" : "filter-btn"}
            onClick={() => dispatch(setCategory(cat))}
          >
            {cat}
          </button>
        ))}

        {selectedCategory !== "All" && (
          <button className="filter-btn clear-btn" onClick={() => dispatch(clearFilter())}>
            Clear Filters ✕
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="empty-msg">No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <Reveal as="div" delay={(index % 4) * 70} key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
