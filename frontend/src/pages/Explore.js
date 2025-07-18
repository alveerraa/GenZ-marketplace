import { useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

function Explore() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch products error:", err));
  }, []);

  const handleWishlist = async (productId) => {
    if (!isLoggedIn) {
      alert("Please log in to use the wishlist.");
      return;
    }

    try {
      await API.post(
        "/wishlist",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to wishlist!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  const handleCart = async (productId) => {
    if (!isLoggedIn) {
      alert("Please log in to add to cart.");
      return;
    }

    try {
      await API.post(
        "/cart",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="product-grid">
      {products.map((prod) => (
        <div key={prod._id} className="product-card" onClick={() => setSelectedProduct(prod)}>
          <img src={prod.imageUrl} alt={prod.title} />
          <div className="card-content">
            <h3>{prod.title}</h3>
            <p>₹{prod.price}</p>
            <div className="card-actions">
              <button onClick={(e) => { e.stopPropagation(); handleWishlist(prod._id); }}>❤️</button>
              <button onClick={(e) => { e.stopPropagation(); handleCart(prod._id); }}>🛒</button>
            </div>
          </div>
        </div>
      ))}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} />
            <h2>{selectedProduct.title}</h2>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Size:</strong> {selectedProduct.size}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
