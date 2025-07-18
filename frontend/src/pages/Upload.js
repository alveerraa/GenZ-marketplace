// frontend/src/pages/Upload.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useAuth();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !price || !file || !user?._id) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("userId", user._id);
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product uploaded successfully!");
        setTitle(""); setDescription(""); setPrice(""); setSize(""); setFile(null);
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Product</h2>
        {!user ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            Please <strong>log in</strong> to upload a product.
          </p>
        ) : (
          <form onSubmit={handleUpload} className="upload-form" encType="multipart/form-data">
            <div className="input-group">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label>Product Title *</label>
            </div>
            <div className="input-group">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              <label>Description</label>
            </div>
            <div className="input-group">
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <label>Price (₹) *</label>
            </div>
            <div className="input-group">
              <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
              <label>Size (e.g. M, L, XL)</label>
            </div>
            <div className="file-input-wrapper">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <button type="submit" className="upload-btn">📤 Upload</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Upload;
