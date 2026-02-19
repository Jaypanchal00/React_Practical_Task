import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Order placed successfully for ${formData.fullName}!`);
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <h2 style={{ marginBottom: "2rem" }}>Checkout</h2>
      
      <div className="checkout-grid" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem", alignItems: "start" }}>
        
        {/* Left Column: Shipping Details */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Shipping Details</h3>
          <form id="checkout-form" onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input 
              required
              name="fullName"
              placeholder="Full Name" 
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <input 
              required
              type="email"
              name="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleInputChange}
            />
            <input 
              required
              name="address"
              placeholder="Address" 
              value={formData.address}
              onChange={handleInputChange}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input 
                required
                name="city"
                placeholder="City" 
                value={formData.city}
                onChange={handleInputChange}
              />
              <input 
                required
                name="zip"
                placeholder="ZIP Code" 
                value={formData.zip}
                onChange={handleInputChange}
              />
            </div>

            <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Payment Method</h3>
            <label className="payment-option">
              <input type="radio" name="payment" defaultChecked /> 
              <span>Cash on Delivery (COD)</span>
            </label>
            <button type="submit" style={{ display: "none" }}></button>
          </form>
        </div>
        
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid #e5e7eb", position: "sticky", top: "100px" }}>
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>
          
          <div style={{ maxHeight: "300px", overflowY: "auto", margin: "1rem 0", paddingRight: "5px" }}>
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
                 <img src={item.thumbnail} alt={item.title} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px", background: "#f3f4f6" }} />
                 <div>
                   <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "600" }}>{item.title}</p>
                   <p style={{ margin: 0, color: "#6b7280", fontSize: "0.85rem" }}>₹{item.price}</p>
                 </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "2px solid #f3f4f6", paddingTop: "1rem", marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25rem", fontWeight: "bold", marginTop: "1rem", color: "#111827" }}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button 
              onClick={(e) => document.getElementById("checkout-form").requestSubmit()} 
              disabled={items.length === 0}
              style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", marginTop: "1.5rem" }}
          >
              Place Order
          </button>
        </div>

      </div>
    </div>
  );
}
