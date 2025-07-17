import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", price: "", size: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Could not load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${id}`, form);
      navigate(`/product/${id}`);
    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Edit Product</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        {["title", "description", "price", "size", "imageUrl"].map((field, idx) => (
          field === "description" ? (
            <textarea
              key={idx}
              name={field}
              placeholder="Description"
              value={form[field]}
              onChange={handleChange}
              required
            />
          ) : (
            <input
              key={idx}
              name={field}
              type={field === "price" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required
            />
          )
        ))}
        <button type="submit" className="upload-button">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;
