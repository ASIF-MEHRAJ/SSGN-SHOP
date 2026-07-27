import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-page">
        <h2>Your wishlist is empty</h2>
        <p>Save the products you love here.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1 className="section-title">YOUR WISHLIST</h1>
      <div className="product-grid">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
