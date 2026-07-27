import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/slices/searchSlice";
import ProductCard from "../components/ProductCard";

function SearchResults() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const term = searchTerm.toLowerCase().trim();

  const results = term
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      )
    : [];

  return (
    <div className="search-page">
      <h1 className="section-title">
        SEARCH RESULTS {searchTerm && `FOR "${searchTerm}"`}
      </h1>

      <div className="search-box-large">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {!term && <p className="empty-msg">Start typing above to search products.</p>}

      {term && results.length === 0 && (
        <p className="empty-msg">No products match "{searchTerm}".</p>
      )}

      {results.length > 0 && (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
