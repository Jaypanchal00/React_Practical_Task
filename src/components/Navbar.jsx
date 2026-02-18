import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.length;
  const dispatch = useDispatch();

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">MyShop</Link>
        
        <div className="navbar-links">
          {token && <Link to="/" className="nav-link">Home</Link>}
          {token && <Link to="/cart" className="nav-link">Cart ({cartCount})</Link>}

          {!token ? (
            <Link to="/login" className="nav-link btn-login">Login</Link>
          ) : (
            <button className="btn-logout" onClick={() => dispatch(logout())}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
