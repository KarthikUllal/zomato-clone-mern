import { ClipLoader } from "react-spinners";

export default function Loader({
  loading = true,
  size = 40,
  color = "#ef4f5f",
}) {
  if (!loading) return null;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    }}>
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  );
}