import { useEffect, useState } from "react";
import API from "../utils/api"; // make sure path is correct

function Explore() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Fetch products error:", err));
  }, []);

  const handleWishlist = async (productId) => {
    try {
      await API.post("/wishlist", { productId });
      alert("Added to wishlist!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  const handleCart = async (productId) => {
    try {
      await API.post("/cart", { productId });
      alert("Added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="product-grid">
      {products.map(prod => (
        <div key={prod._id} className="product-card">
          <img src={prod.imageUrl} alt={prod.title} />
          <div className="card-content">
            <h3 className="card-title">{prod.title}</h3>
            <p className="card-price">₹{prod.price}</p>

            {/* ❤️ Wishlist & 🛒 Cart Buttons */}
            <div className="card-actions">
              <button onClick={() => handleWishlist(prod._id)}>❤️</button>
              <button onClick={() => handleCart(prod._id)}>🛒</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Explore;






