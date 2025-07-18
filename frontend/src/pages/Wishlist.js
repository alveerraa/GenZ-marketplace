import { useEffect, useState } from "react";
import API from "../utils/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login to view your wishlist.");
      return;
    }

    API.get("/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setWishlist(res.data))
      .catch((err) => {
        console.error("Wishlist fetch failed:", err);
        alert("Failed to load wishlist.");
      });
  }, [token]);

  const removeFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove from wishlist.");
    }
  };

  return (
    <div className="product-grid">
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((prod) => (
          <div key={prod._id} className="product-card">
            <img src={prod.imageUrl} alt={prod.title} />
            <div className="card-content">
              <h3>{prod.title}</h3>
              <p>₹{prod.price}</p>
              <button onClick={() => removeFromWishlist(prod._id)}>🗑 Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
