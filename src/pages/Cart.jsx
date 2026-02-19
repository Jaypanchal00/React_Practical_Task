import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>Your cart is empty.</p>
          <Link to="/" style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid">
             {items.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                     <div className="card-image-container">
                        <img src={item.thumbnail} alt={item.title} />
                     </div>
                     <h4>{item.title}</h4>
                     <p>₹{item.price}</p>
                     
                     <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
                        <button 
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          disabled={item.quantity <= 1}
                          style={{ padding: "0.2rem 0.6rem" }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          style={{ padding: "0.2rem 0.6rem" }}
                        >
                          +
                        </button>
                     </div>

                     <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        style={{ marginTop: "0.5rem", borderColor: "#ef4444", color: "#ef4444" }}
                     >
                        Remove
                     </button>
                </div>
            ))}
        </div>
      )}

      {items.length > 0 && (
        <div style={{ marginTop: "2rem", textAlign: "right", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
          <h3>Subtotal: ₹{total.toFixed(2)}</h3>
          <button 
            onClick={() => navigate("/checkout")}
            style={{ fontSize: "1.1rem", padding: "0.8rem 1.5rem" }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
