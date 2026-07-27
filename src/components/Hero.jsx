import { Link } from "react-router-dom";
import image from "../assets/image.png"

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow-1" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-2" aria-hidden="true"></div>
      <div className="hero-grid" aria-hidden="true"></div>

      <div className="hero-left">
        <p className="hero-eyebrow">
          <span className="pulse-dot"></span> NEW COLLECTION
        </p>
        <h1 className="hero-title">
          <span className="hero-line">MOVE</span>
          <span className="hero-line">WITHOUT</span>
          <span className="hero-line">
            LIMITS<span className="dot">.</span>
          </span>
        </h1>
        <p className="hero-subtitle">
          Performance meets style. Designed for those who never slow down.
        </p>

        <div className="hero-buttons">
          <Link to="/shop" className="btn btn-primary btn-shine">
            SHOP NOW →
          </Link>
          <Link to="/shop" className="btn btn-secondary">
            EXPLORE
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>12K+</strong>
            <span>Happy runners</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <strong>4.8★</strong>
            <span>Average rating</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <strong>30-day</strong>
            <span>Free returns</span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-shoe-wrap">
          <img
            src={image}
            alt="Vortex 2.0 shoe"
            className="hero-shoe"
          />
          <span className="hero-chip hero-chip-1">🔥 Best Seller</span>
          <span className="hero-chip hero-chip-2">⭐ 4.5 (2.1k)</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
