// src/pages/Upload.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Upload() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    size: "",
    imageUrl: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/products", form); // ✅ Don't send userId
      navigate(`/product/${res.data._id}`);
    } catch (err) {
      console.error("Upload failed:", err.response?.data);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Upload Product</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        {["title", "description", "price", "size", "imageUrl"].map((field, idx) =>
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
        )}
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
