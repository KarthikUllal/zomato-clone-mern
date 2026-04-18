import { useState, useEffect } from "react";
import api from "../api.js";
import "./UserProfile.css";
import MyOrders from "./MyOrders.jsx";
import UserAddress from "./UserAddress.jsx";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("user-profile");
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const getUserProfile = async () => {
      if (!token) {
        return;
      }
      try {
        const res = await api.get("/api/user/profile", {
          headers: { Authorization: token },
        });
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Error Fetching user profile",
        );
      }
    };
    getUserProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile-section">
      <div className="user-profile-sidebar">
        <div className="sidebar-header">
          <div className="profile-letter">
            {user.fullname?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-name">{user.fullname}</div>
        </div>

        <div className="divider"></div>
        <div className={`my-info ${activeTab === "user-profile" ? "active" : ""}`} 
             onClick={() => setActiveTab("user-profile")}>
          My profile
        </div>
        <div className={`my-order ${activeTab === "my-orders" ? "active" : ""}`} 
             onClick={() => setActiveTab("my-orders")}>
          My Orders
        </div>
        <div className={`my-address ${activeTab === "my-address" ? "active" : ""}`} 
             onClick={() => setActiveTab("my-address")}>
          My Address
        </div>
      </div>
      
      <div className="user-profile-content">
        {activeTab === "user-profile" && (
          <div className="my-profile">
            <div className="profile-info">
              <p>Name: {user.fullname}</p>
              <p>Email: {user.email}</p>
              <p>
                Profile Created:{" "}
                {user.createdAt ? new Date(user.createdAt).toDateString() : " "}
              </p>
            </div>
          </div>
        )}
        {activeTab === "my-orders" && <MyOrders />}
        {activeTab === "my-address" && <UserAddress />}
      </div>
    </div>
  );
}