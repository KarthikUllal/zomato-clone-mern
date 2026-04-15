import { useNavigate } from "react-router-dom";

export default function AdminBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/admin/dashboard")}
      style={{
        padding: "10px 16px",
        background: "#111",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        width: "120px",
      }}
      onMouseOver={(e) => (e.target.style.background = "#333")}
      onMouseOut={(e) => (e.target.style.background = "#111")}
    >
      ← Back
    </button>
  );
}