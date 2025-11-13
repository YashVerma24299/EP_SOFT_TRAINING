import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [popup, setPopup] = useState(null);

  const navigate = useNavigate();

  const apicall = async () => {
    try {
      let res = await fetch("https://dummyjson.com/products");
      let response = await res.json();
      // console.log(response);
      setProducts(response.products);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    apicall();
  }, []);

  const totalPages = Math.ceil(products.length / itemPerPage);
  const start = (page - 1) * itemPerPage;
  const end = start + itemPerPage;
  const currentItems = products.slice(start, end);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "10rem", fontSize: "2rem" }}>
        Loading...
      </p>
    );

  function rating(value) {
    const HalfStar = Math.ceil(value);
    let cnt = 0;
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        stars.push(<span key={i}>★</span>);
      } else if (value != HalfStar && cnt == 0) {
        stars.push(<span key={i}>H</span>);
        cnt++;
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }
    return <>{stars}</>;
  }
  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Products</h2>

      <div
        style={{
          marginTop: "5vh",
          width: "100%",
          marginBottom: "1rem",
          height: "70vh",
          overflowY: "auto",
          position: "relative",
        }}
        className=""
      >
        <table style={{ width: "100%", height: "100%" }}>
          <thead style={{ position: "sticky", top: "0", left: "0" }}>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  width: "10%",
                }}
              >
                Id
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  width: "30%",
                }}
              >
                Title
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  width: "20%",
                }}
              >
                Price
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  width: "20%",
                }}
              >
                Rating
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  width: "20%",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id} style={{ textAlign: "center" }}>
                <td style={{ padding: "8px" }}>{product.id}</td>
                <td style={{ padding: "8px" }}>{product.title}</td>
                <td style={{ padding: "8px" }}>${product.price}</td>
                <td style={{ padding: "8px" }}>
                  {rating(product.rating)} {"  "}
                  {product.rating}
                </td>
                <td style={{ padding: "8px" }}>
                  <Eye
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => (setPopup(product), console.log("OP"))}
                    size={35}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#4CAF50",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
          }}
        >
          <label style={{ marginRight: "6px", fontWeight: "500" }}>Show:</label>
          <select
            value={itemPerPage}
            onChange={(e) => {
              setItemPerPage(Number(e.target.value));
            }}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {[10, 20, 30].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span style={{ marginLeft: "6px", fontWeight: "500" }}>rows</span>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {(() => {
            const buttons = [];
            for (let i = 0; i < totalPages; i++) {
              buttons.push(
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  style={{
                    padding: "6px 12px",
                    margin: "0 3px",
                    backgroundColor: page === i + 1 ? "#4CAF50" : "#e0e0e0",
                    color: page === i + 1 ? "white" : "black",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: page === i + 1 ? "bold" : "normal",
                    transition: "0.2s",
                  }}
                >
                  {i + 1}
                </button>
              );
            }
            return buttons;
          })()}
        </div>
      </div>

      {popup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "50vw",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h3>Do you want to move {popup.title}</h3>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button onClick={() => navigate(`/details/${popup.id}`)}>
                Yes
              </button>
              <button onClick={() => setPopup(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
