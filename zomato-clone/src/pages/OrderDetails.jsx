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

    try{
        await api.post("api/user/review", {
        restaurantId: order.restaurant._id,
        rating,
        comment
      },{
        headers : {
          Authorization : token
        }
      }
    )
      toast.success("Review submitted successfully")
      setShowReview(false);
      setRating(5);
      setComment("");
      
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (!order) return <h3 className="loading">Loading Order...</h3>;

  return (
    <div className="order-container">
      <div className="order-card">
        <h2 className="success">Order Placed Successfully</h2>

        <div className="order-info">
          <p>
            <b>Restaurant:</b> {order.restaurant.name}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <p>
            <b>Address:</b> {order.address}
          </p>
        </div>
        {order.status === "delivered" && (
          <div className="review-btn-container">
            <button
              className="show-review-btn"
              onClick={() => setShowReview(true)}
            >
              Write a Review
            </button>
          </div>
        )}
        {showReview && (
          <div className="review-form">
            <h3>Write a Review for {order.restaurant.name}</h3>
            <div className="rating-container">
              <label>Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="comment-container">
              <label>Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              ></textarea>
            </div>
            <button className="submit-btn" onClick={submitReview}>
              Submit Review
            </button>
          </div>
        )}

        <h3 className="items-title">Items Ordered</h3>

        <div className="items-list">
          {order.items.map((item) => (
            <div className="item" key={item._id}>
              {item.food.image && (
                <img src={getImageUrl(item.food.image)} alt={item.food.name} />
              )}

              <div className="item-details">
                <h4>{item.food.name}</h4>

                <p>₹{item.price}</p>

                <p>Quantity: {item.quantity}</p>
              </div>

              <div className="item-total">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        <div className="total-box">Total Amount: ₹{order.totalAmount}</div>
      </div>
    </div>
  );
}
