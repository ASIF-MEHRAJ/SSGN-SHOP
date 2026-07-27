import Reveal from "./Reveal";

function Features() {
  // just a static list, no need for redux here
  const featureList = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders over $120" },
    { icon: "↺", title: "Easy Returns", desc: "30-day return policy" },
    { icon: "✔", title: "Authenticity", desc: "100% authentic products" },
    { icon: "🔒", title: "Secure Payments", desc: "Safe & encrypted checkout" },
  ];

  return (
    <section className="features">
      {featureList.map((feature, index) => (
        <Reveal as="div" className="feature-item" delay={index * 80} key={index}>
          <span className="feature-icon">{feature.icon}</span>
          <div>
            <h4>{feature.title}</h4>
            <p>{feature.desc}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

export default Features;
