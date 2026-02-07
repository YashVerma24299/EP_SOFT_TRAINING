import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductById, setProductDetail } from "./redux/ProductSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const {state} = useLocation();
  const dispatch = useDispatch();
  const {productDetail }= useSelector((s)=> s.product)
  // console.log(state)
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(false);
  // const [error, setError] =useState(null);
  const navigate = useNavigate();
  // const apicall = async () => {
  //   try {
  //     let res = await fetch(`https://dummyjson.com/products/${id}`);
  //     let response = await res.json();
  //     console.log(response);
  //     if (!res.ok) {
  //       throw new Error();
  //     }
  //     setProduct(response);
  //   } catch (e) {
  //     // setError(e.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // apicall();
    dispatch(setProductDetail(null))
    dispatch(fetchProductById(id));
  }, [id]);

  // if (loading)
  //   return (
  //     <p className="loading">
  //       Loading...
  //     </p>
  //   );
  if (!productDetail)
    return (
      <p className="loading">
        No Page Exist...
      </p>
    );



  const words = productDetail?.description.split(" ");
  const shortDesc =  words.splice(0,6).join(" ");
    
  return (
    <div className="Container">
      <button className="back" onClick={() => navigate(-1)}>← Back</button>
      <div className="card">
        <img src={productDetail.thumbnail} alt={productDetail.title} className="img" />
        <div className="info">
          <h2 className="title">{productDetail.title}</h2>
          <p className="desc">
            {desc ? productDetail.description : shortDesc}
            {words.length>5 && ( <span className="see-more" onClick={()=> setDesc(!desc)}>
              {desc ? "See less" : "...See more"}
            </span>)}
          </p>
          <p className="price">${productDetail.price}</p>
          <p className="rating">⭐ {productDetail.rating}</p>
          <p className="brand">Brand: {productDetail.brand}</p>
          <p className="category">Category: {productDetail.category}</p>
        </div>
      </div>
    </div>
  );
}
