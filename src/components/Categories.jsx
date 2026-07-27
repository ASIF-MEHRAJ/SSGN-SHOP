import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";
import Reveal from "./Reveal";

const categoryList = [
  { name: "Sneakers", image: "https://placehold.co/200x200/1a1a1a/ffffff?text=Sneakers" },
  { name: "Apparel", image: "https://placehold.co/200x200/1a1a1a/ffffff?text=Apparel" },
  { name: "Accessories", image: "https://placehold.co/200x200/1a1a1a/ffffff?text=Accessories" },
  { name: "Bags", image: "https://placehold.co/200x200/1a1a1a/ffffff?text=Bags" },
  { name: "Socks", image: "https://placehold.co/200x200/1a1a1a/ffffff?text=Socks" },
  { name: "Equipment", image: "https://placehold.co/200x200/1a1a1a/ffffff?text=Equipment" },
];

function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goToCategory(catName) {
    dispatch(setCategory(catName));
    navigate("/shop");
  }

  return (
    <section className="categories">
      <Reveal className="categories-header">
        <h2>SHOP BY CATEGORY</h2>
        <span className="view-all" onClick={() => navigate("/shop")}>
          VIEW ALL →
        </span>
      </Reveal>

      <div className="categories-grid">
        {categoryList.map((cat, index) => (
          <Reveal
            as="div"
            className="category-item"
            delay={index * 60}
            key={cat.name}
          >
            <div onClick={() => goToCategory(cat.name)} className="category-item-inner">
              <div className="category-img-ring">
                <img src={cat.image} alt={cat.name} />
              </div>
              <p>{cat.name.toUpperCase()}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Categories;
