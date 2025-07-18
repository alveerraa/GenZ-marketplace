import { Link, useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ clear token too
    navigate("/login");
    window.location.reload(); // ✅ Force state refresh
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Gen-Z Market</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user && <Link to="/upload">Upload</Link>}
        <Link to="/wishlist">❤️ Wishlist</Link>
        <Link to="/cart">🛒 Cart</Link>
        {user && <Link to={`/mylist/${user._id}`}>My List</Link>}
        <Link to="/info">Info</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        )}
        <button className="theme-toggle" onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
