import "./Sections.css";
import { useEffect, useState } from "react";

import api from "../../../api";

export default function Reviews({ restaurantId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await api.get(`/api/user/review/${restaurantId}`);
        if (response.data.status === "SUCCESS") {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    getReviews();
  }, []);
  return (
    <div className="section-container">
      <h2>Customer Reviews</h2>

      <div className="review-card">
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <>
              <div key={review._id} className="review-item">
                <div className="left-section-username">
                  <h3>{review.username}</h3>
                </div>
                <div className="rigt-section-ratings">★{review.rating}
                  <div className="rating-date">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="review-comment">
                  <p>{review.comment}</p>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
}
