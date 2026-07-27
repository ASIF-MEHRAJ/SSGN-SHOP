import { useReveal } from "../hooks/useReveal";

// Wrap any section/element to have it rise+fade in as the user scrolls to it.
// `delay` (ms) lets siblings stagger. `as` lets you pick the wrapper tag.
function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
