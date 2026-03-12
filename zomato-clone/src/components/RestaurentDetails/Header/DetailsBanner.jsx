import "./Header.css";

export default function DetailsBanner({restaurent}) {
  return (
    <div className="details-banner">
      <img
        src={`http://localhost:8000/${restaurent.banner}`}
        alt={restaurent.name}
      />
    </div>
  );
}