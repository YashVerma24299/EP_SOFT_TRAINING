import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(false);
  const [error, setError] =useState(null);
  const navigate = useNavigate();
  const apicall = async () => {
    try {
      let res = await fetch(`https://dummyjson.com/products/${id}`);
      let response = await res.json();
      console.log(response);
      if (!res.ok) {
        throw new Error();
      }
      setProduct(response);
    } catch (e) {
      // setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apicall();
  }, [id]);

  if (loading)
    return (
      <p className="loading">
        Loading...
      </p>
    );
  if (!product)
    return (
      <p className="loading">
        No Page Exist...
      </p>
    );

  const words = product.description.split(" ");
  const shortDesc =  words.splice(0,6).join(" ");
    
  return (
    <div className="Container">
      <button className="back" onClick={() => navigate(-1)}>← Back</button>
      <div className="card">
        <img src={product.thumbnail} alt={product.title} className="img" />
        <div className="info">
          <h2 className="title">{product.title}</h2>
          <p className="desc">
            {desc ? product.description : shortDesc}
            {words.length>5 && ( <span className="see-more" onClick={()=> setDesc(!desc)}>
              {desc ? "See less" : "...See more"}
            </span>)}
          </p>
          <p className="price">${product.price}</p>
          <p className="rating">⭐ {product.rating}</p>
          <p className="brand">Brand: {product.brand}</p>
          <p className="category">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
}
