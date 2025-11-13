import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>Navigate</div>

      <div>
        <button
          style={{
            marginRight: "2rem",
            borderRadius: "1rem",
            padding: "5px 10px",
          }}
          onClick={() => navigate("/without_state/12345")}
        >
          Navigation without state
        </button>
        <button
          style={{ borderRadius: "1rem", padding: "5px 10px" }}
          onClick={() =>
            navigate(`/with_state/12345`, {
              state: {
                title: "A",
                desc: "B",
                rating: 4,
              },
            })
          }
        >
          Navigation with State
        </button>
      </div>
    </div>
  );
}
