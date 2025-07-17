import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/api";

function Profile() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get(`/products/user/${id}`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Error loading your listings"));
  }, [id]);

  const handleDelete = async (prodId) => {
    if (window.confirm("Delete this product?")) {
      await API.delete(`/products/${prodId}`);
      setProducts(products.filter(p => p._id !== prodId));
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My List</h2>
      <div className="product-grid">
        {products.map(p => (
          <div key={p._id} className="product-card">
            <img src={p.imageUrl} alt={p.title} className="product-image" />
            <div className="card-content">
              <h3 className="card-title">{p.title}</h3>
              <p className="card-price">₹{p.price}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link to={`/product/${p._id}`} className="upload-button">View</Link>
                <Link to={`/edit/${p._id}`} className="upload-button">Edit</Link>
                <button onClick={() => handleDelete(p._id)} className="upload-button">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
