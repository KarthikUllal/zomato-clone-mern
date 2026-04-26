import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "./MyBookings.css";

export default function MyBookings() {
  const [data, setData] = useState([]);

  const getMyBookings = async () => {
    try {
      const res = await api.get("/api/user/bookings", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setData(res.data.bookings || []);
    } catch {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  const cancel = async (id) => {
    try {
      await api.put(
        `/api/user/booking/cancel/${id}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );

      toast.success("Booking cancelled");
      getMyBookings();
    } catch {
      toast.error("Cancel failed");
    }
  };

  return (
    <div className="my-bookings-container">
      <h3 className="booking-title">My Table Bookings</h3>

      {data.length === 0 ? (
        <p className="empty-bookings">No bookings found</p>
      ) : (
        data.map((b) => (
          <div className="booking-card" key={b._id}>
            <div className="booking-row">
              <span className="booking-label">Restaurant</span>
              <span className="booking-value">{b.restaurant?.name}</span>
            </div>

            <div className="booking-row">
              <span className="booking-label">Date & Time</span>
              <span className="booking-value">
                {b.date} • {b.time}
              </span>
            </div>

            <div className="booking-row">
              <span className="booking-label">Guests</span>
              <span className="booking-value">{b.guests}</span>
            </div>

            <div className="booking-row">
              <span className="booking-label">Status</span>
              <span className={`booking-status ${b.status}`}>{b.status}</span>
            </div>

            {b.status === "confirmed" && (
              <button className="cancel-btn" onClick={() => cancel(b._id)}>
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
