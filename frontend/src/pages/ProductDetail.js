import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/api";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product", err));
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="page-container product-detail">
      <img src={product.imageUrl} alt={product.title} />
      <h2 className="product-detail-title">{product.title}</h2>
      <p className="product-detail-price">₹{product.price}</p>
      <p className="product-detail-description">{product.description}</p>
      <div className="product-detail-buttons">
        <Link to={`/edit/${product._id}`} className="edit-btn">Edit</Link>
        <button className="delete-btn">DM to Buy</button>
      </div>
    </div>
  );
}

export default ProductDetail;
