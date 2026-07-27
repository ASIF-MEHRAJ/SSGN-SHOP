import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/slices/searchSlice";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  // total number of items in cart (counting quantity)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const prevCartCount = useRef(cartCount);
  const prevWishlistCount = useRef(wishlistCount);
  const [cartBump, setCartBump] = useState(false);
  const [wishBump, setWishBump] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (cartCount !== prevCartCount.current) {
      setCartBump(true);
      prevCartCount.current = cartCount;
      const t = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  useEffect(() => {
    if (wishlistCount !== prevWishlistCount.current) {
      setWishBump(true);
      prevWishlistCount.current = wishlistCount;
      const t = setTimeout(() => setWishBump(false), 400);
      return () => clearTimeout(t);
    }
  }, [wishlistCount]);

  function handleSearchChange(e) {
    const value = e.target.value;
    setInputValue(value);
    dispatch(setSearchTerm(value));

    // send them to search page while typing
    if (value.trim() !== "") {
      navigate("/search");
    }
  }

  return (
    <nav className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      <div className="navbar-left">
        <Link to="/" className="logo">
          <span className="logo-icon">V</span> SGSIN
        </Link>
      </div>

      <div className={menuOpen ? "navbar-links open" : "navbar-links"}>
        <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="/Shop" onClick={() => setMenuOpen(false)}>SHOP</Link>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search products..."
            value={inputValue}
            onChange={handleSearchChange}
          />
        </div>

        <Link to="/wishlist" className="icon-link">
          <span className={wishBump ? "icon-glyph bump" : "icon-glyph"}>♥</span>
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>

        <Link to="/cart" className="icon-link">
          <span className={cartBump ? "icon-glyph bump" : "icon-glyph"}>🛒</span>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        <button
          className={menuOpen ? "menu-btn open" : "menu-btn"}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
