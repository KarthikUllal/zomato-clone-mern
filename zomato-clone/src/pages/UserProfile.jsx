import { useState, useEffect } from "react";
import api from "../api.js";
import "./UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }
      try {
        const res = await api.get("/api/user/profile", {
            headers: { Authorization: token },
        });
        setUser(res.data.user);
      } catch (err) {
        console.log("Error Fetching user profile:", err);
      }
    };
    getUserProfile();
  }, [user]);
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p>This is the user profile page.</p>
      <p>Username: {user.fullname}</p>
      <p>Email: {user.email}</p>
      <p>Created At: {user.createdAt}</p>
    </div>
  );
}
