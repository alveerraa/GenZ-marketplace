import { useEffect, useState } from "react";
import API from "../utils/api";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    API.get("/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Cart fetch failed:", err));
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      setCart((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert("Failed to remove from cart");
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
