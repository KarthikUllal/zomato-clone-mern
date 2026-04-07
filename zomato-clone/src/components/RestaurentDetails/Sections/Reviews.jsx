import "./Sections.css";
import { useEffect, useState } from "react";

import api from "../../../api"


export default function Reviews({restaurantId}) {
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
            <div key={review._id} className="review-item">
              <h4>{review.username} ★{review.rating}</h4>
              <p>{review.date}</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
