import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      alert("This product is already in your cart!");
      return;
    }

    dispatch(addToCart(product));
    alert("Product added to cart!");
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <h4>{product.title}</h4>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}
