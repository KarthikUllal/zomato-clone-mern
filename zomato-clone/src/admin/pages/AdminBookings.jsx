import { useEffect, useState } from "react";
import api from "../../api";
import "../styles/AdminBookings.css";
import AdminBackButton from "../components/AdminBackButton";

export default function AdminBookings() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/api/admin/bookings");
      setData(res.data.bookings);
    };
    fetch();
  }, []);

  return (
    <div className="admin-bookings-container">
      <div className="header" style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="admin-bookings-title">Table Bookings</h2>
         <AdminBackButton />
      </div>

      {data.length === 0 ? (
        <p className="no-bookings">No bookings found</p>
      ) : (
        <div className="table-wrapper" style={{
            marginTop: "20px"
        }}>
          <table className="bookings-table">

            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map(b => (
                <tr key={b._id}>
                  <td>{b.restaurant?.name}</td>
                  <td>{b.user?.fullname}</td>
                  <td>{b.user?.email}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.guests}</td>
                  <td>
                    <span className={`status-badge ${b.status}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}