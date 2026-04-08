import "./Sections.css";
import { useEffect, useState } from "react";
import api from "../../../api";
import Loader from "../../../utils/Loder";

export default function Reviews({ restaurantId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/api/user/review/${restaurantId}`);
        if (response.data.status === "SUCCESS") {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    if (restaurantId) getReviews();
  }, [restaurantId]);

  if (loading) {
    return <Loader loading={loading} />;
  }
  return (
    <div className="review-section-container">
      <h2>Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="no-review">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-top">
                <div className="user-info">
                  <div className="avatar">
                    {review.username?.charAt(0).toUpperCase()}
                  </div>
                  <h4>{review.username}</h4>
                </div>

                <div className="rating-section">
                  <span className="stars">{"⭐".repeat(review.rating)}</span>
                  <span className="date">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
