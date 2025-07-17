import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import EditProduct from "./pages/EditProduct";
import Info from "./pages/Info";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Explore from "./pages/Explore";


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/mylist/:id" element={<Profile />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/info" element={<Info />} />
          <Route path="/wishlist" element={<Wishlist />} />
<Route path="/cart" element={<Cart />} />
<Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
