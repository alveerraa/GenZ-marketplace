import { useEffect, useState } from "react";
import API from "../utils/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login to view your cart.");
      return;
    }

    API.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setCart(res.data))
      .catch((err) => {
        console.error("Cart fetch failed:", err);
        alert("Failed to load cart.");
      });
  }, [token]);

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove from cart.");
    }
  };

  return (
    <div className="product-grid">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((prod) => (
          <div key={prod._id} className="product-card">
            <img src={prod.imageUrl} alt={prod.title} />
            <div className="card-content">
              <h3>{prod.title}</h3>
              <p>₹{prod.price}</p>
              <button onClick={() => removeFromCart(prod._id)}>🗑 Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
