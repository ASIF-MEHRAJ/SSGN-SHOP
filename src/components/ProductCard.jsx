import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const [justAdded, setJustAdded] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const lowStock = product.stock > 0 && product.stock <= 5;

  function handleAddToCart(e) {
    e.preventDefault(); // stop the link from firing
    dispatch(addToCart(product));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  }

  function handleWishlistClick(e) {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 350);
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image-wrap">
          <img src={product.image} alt={product.name} loading="lazy" />
          {lowStock && <span className="stock-tag">Only {product.stock} left</span>}
          <button
            className={isInWishlist ? "wish-btn active" : "wish-btn"}
            onClick={handleWishlistClick}
          >
            <span className={heartPop ? "wish-heart pop" : "wish-heart"}>♥</span>
          </button>
        </div>

        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-rating">⭐ {product.rating}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      <button
        className={justAdded ? "add-cart-btn added" : "add-cart-btn"}
        onClick={handleAddToCart}
      >
        {justAdded ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
