import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "emilys", password: "emilyspass" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
     console.log(form);  
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: "500", fontSize: "0.9rem" }}>Username</label>
            <input
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: "500", fontSize: "0.9rem" }}>Password</label>
            <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
        </div>
        <button 
          type="submit" 
          style={{ 
            marginTop: "1rem",
            backgroundColor: "white",
            color: "#111827",
            border: "1px solid #e5e7eb" 
          }}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <p style={{ color: "#ef4444", textAlign: "center", margin: 0 }}>{error}</p>}
      </form>

      <div style={{ marginTop: '1rem', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
        <p><strong>Demo Credentials:</strong></p>
        <p>Username: emilys</p>
        <p>Password: emilyspass</p>
      </div>
    </div>
  );
}
