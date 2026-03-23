import { getImageUrl } from "../../../utils/imageHelper";
import "./Header.css";

export default function DetailsBanner({restaurent}) {
  return (
    <div className="details-banner">
      <img
        src={getImageUrl(restaurent.banner)}
        alt={restaurent.name}
      />
    </div>
  );
}