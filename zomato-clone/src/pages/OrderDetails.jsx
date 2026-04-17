import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderDetails.css";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import { toast } from "react-toastify";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/api/orders/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        setOrder(res.data.order);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [id]);

  const submitReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    try {
      const res = await api.post(
        "/api/user/review",
        {
          restaurantId: order.restaurant._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        toast.success("Review submitted successfully");
      } else {
        toast.error("Error submitting review");
      }

      setShowReview(false);
      setRating(5);
      setComment("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!order) return <h3 className="loading">Loading Order...</h3>;

  return (
    <div className="order-page">
      <div className="order-wrapper">

        <div className="order-card">

          {/* HEADER */}
          <div className="order-header">
            <h2>Order Placed Successfully</h2>
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </div>

          {/* INFO */}
          <div className="order-info">
            <p><b>Restaurant:</b> {order.restaurant.name}</p>
            <p><b>Address:</b> {order.address}</p>
          </div>

          {/* REVIEW BUTTON */}
          {order.status === "delivered" && (
            <div className="review-btn-container">
              <button
                className="review-btn"
                onClick={() => setShowReview(true)}
              >
                Write a Review
              </button>
            </div>
          )}

          {/* REVIEW FORM */}
          {showReview && (
            <div className="review-form">
              <h3>Write a Review</h3>

              <div className="rating-container">
                <label>Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[1,2,3,4,5].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="comment-container">
                <label>Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button className="submit-btn" onClick={submitReview}>
                Submit Review
              </button>
            </div>
          )}

          {/* ITEMS */}
          <h3 className="items-title">Items Ordered</h3>

          <div className="items-list">
            {order.items.map((item) => (
              <div className="item-card" key={item._id}>

                {item.food.image && (
                  <img src={getImageUrl(item.food.image)} alt="" />
                )}

                <div className="item-details">
                  <h4>{item.food.name}</h4>
                  <p>₹{item.price}</p>
                  <span>Qty: {item.quantity}</span>
                </div>

                <div className="item-total">
                  ₹{item.price * item.quantity}
                </div>

              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="total-box">
            Total Amount: ₹{order.totalAmount}
          </div>

        </div>

      </div>
    </div>
  );
}