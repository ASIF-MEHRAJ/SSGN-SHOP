import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  // ids from the URL are strings, product ids are numbers, so convert
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="not-found-inline">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  // related products = same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  function handleWishlistClick() {
    dispatch(toggleWishlist(product));
  }

  return (
    <div className="product-details-page">
      <div className="product-details-top">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-rating">⭐ {product.rating} rating</p>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-desc">{product.description}</p>

          {product.stock > 0 ? (
            <p className="stock-msg in-stock">In Stock ({product.stock} left)</p>
          ) : (
            <p className="stock-msg out-stock">Out of Stock</p>
          )}

          <div className="details-buttons">
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button
              className={isInWishlist ? "btn btn-secondary active" : "btn btn-secondary"}
              onClick={handleWishlistClick}
            >
              {isInWishlist ? "♥ In Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="product-section">
          <h2 className="section-title">RELATED PRODUCTS</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
