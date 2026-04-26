import { useEffect, useState } from "react";
import api from "../../../api";
import { toast } from "react-toastify";

export default function BookTable({ restaurantId }) {
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState(null);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("today");
  const [loading, setLoading] = useState(true);

  const getFormattedDate = () => {
    const d = new Date();
    if (date === "tomorrow") d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const fetchSlots = async () => {
    try {
      const formattedDate = getFormattedDate();
      const res = await api.get(
        `/api/user/slots/${restaurantId}?date=${formattedDate}`,
      );
      setSlots(res.data.slots || []);
    } catch {
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) fetchSlots();
  }, [restaurantId, date]);

  const book = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const formattedDate = getFormattedDate();

      const res = await api.post(
        "/api/user/book-table",
        {
          restaurantId,
          date: formattedDate,
          time: selected,
          guests,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (res.data.status === "SUCCESS") {
        toast.success("Table booked successfully 🎉");
        setSelected(null);
        fetchSlots();
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      toast.error("Something went wrong" + err.message);
    }
  };

  if (loading) return <p>Loading slots...</p>;

  return (
    <div className="section-container booking-container">
      <h2>Select your booking details</h2>

      <div className="booking-options">
        <div className="booking-dropdown">
          <i className="fa fa-calendar"></i>
          <select value={date} onChange={(e) => setDate(e.target.value)}>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
          </select>
        </div>

        <div className="booking-dropdown">
          <i className="fa fa-user"></i>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
          </select>
        </div>
      </div>

      <div className="slot-section">
        <div className="slot-header">
          <h3>Select slot</h3>
        </div>

        {slots.length === 0 ? (
          <p className="no-review">No booking available</p>
        ) : (
          <div className="slot-grid">
            {slots.map((s, index) => (
              <div
                key={index}
                className={`slot-card ${
                  selected === s.time ? "active-slot" : ""
                } ${s.available < guests ? "disabled-slot" : ""}`}
                onClick={() => {
                  if (s.available >= guests) setSelected(s.time);
                }}
              >
                <p>{s.time}</p>
                <span>
                  {s.available === 0
                    ? "Fully booked"
                    : `${s.available} seats left`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className={`proceed-btn ${selected ? "active-btn" : ""}`}
        disabled={!selected}
        onClick={book}
      >
        {selected ? "Confirm Booking" : "Select slot & guests"}
      </button>
    </div>
  );
}
