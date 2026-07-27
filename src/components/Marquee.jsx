function Marquee() {
  const items = [
    "MOVE WITHOUT LIMITS",
    "NEW DROP EVERY FRIDAY",
    "FREE SHIPPING OVER $120",
    "100% AUTHENTIC",
    "MEMBERS SHIP FIRST",
  ];

  // duplicate the list so the CSS animation can loop seamlessly
  const track = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
