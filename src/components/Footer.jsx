import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h3 className="logo">V SGSIN</h3>
          <p>Move without limits. Performance meets style.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">Sneakers</Link>
          <Link to="/shop">Apparel</Link>
          <Link to="/shop">Accessories</Link>
          <Link to="/shop">Bags</Link>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <p>Shipping Info</p>
          <p>Returns</p>
          <p>Track Order</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Contact</p>
          <p>Careers</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SGSIN. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
