import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = "Format: MM/YY";
    if (!/^\d{3,4}$/.test(form.cvv)) newErrors.cvv = "Enter a valid CVV";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const generatedId = "SSGN-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderPlaced(true);
    dispatch(clearCart());
  };

  if (orderPlaced) {
    return (
      <div className="empty-page">
        <h2>Order Confirmed</h2>
        <p>
          Thanks {form.fullName || "there"}, your order <strong>{orderId}</strong> has been placed successfully.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-page">
        <h2>Your cart is empty</h2>
        <p>Add something to your cart before checking out.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="section-title">CHECKOUT</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h3 className="checkout-subtitle">Shipping Details</h3>

          <div className="checkout-field">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="checkout-input"
            />
            {errors.fullName && <span className="checkout-error">{errors.fullName}</span>}
          </div>

          <div className="checkout-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="checkout-input"
            />
            {errors.email && <span className="checkout-error">{errors.email}</span>}
          </div>

          <div className="checkout-field">
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={form.address}
              onChange={handleChange}
              className="checkout-input"
            />
            {errors.address && <span className="checkout-error">{errors.address}</span>}
          </div>

          <div className="checkout-row">
            <div className="checkout-field">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="checkout-input"
              />
              {errors.city && <span className="checkout-error">{errors.city}</span>}
            </div>

            <div className="checkout-field">
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={form.zip}
                onChange={handleChange}
                className="checkout-input"
              />
              {errors.zip && <span className="checkout-error">{errors.zip}</span>}
            </div>
          </div>

          <h3 className="checkout-subtitle">Payment</h3>

          <div className="checkout-field">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              className="checkout-input"
            />
            {errors.cardNumber && <span className="checkout-error">{errors.cardNumber}</span>}
          </div>

          <div className="checkout-row">
            <div className="checkout-field">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                className="checkout-input"
              />
              {errors.expiry && <span className="checkout-error">{errors.expiry}</span>}
            </div>

            <div className="checkout-field">
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleChange}
                className="checkout-input"
              />
              {errors.cvv && <span className="checkout-error">{errors.cvv}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary checkout-btn">
            Place Order
          </button>
        </form>

        <div className="cart-summary checkout-order-summary">
          <h3 className="checkout-subtitle">Order Summary</h3>
          {cartItems.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Shipping: ${shipping.toFixed(2)}</p>
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
