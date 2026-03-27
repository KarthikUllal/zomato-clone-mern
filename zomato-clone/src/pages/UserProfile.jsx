import { useState, useEffect } from "react";
import api from "../api.js";
export default function UserProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await api.get("/api/user/profile");
        setUser(res.data.user);
      } catch (err) {
        console.log("Error Fetching user profile:", err);
      }
    };
    getUserProfile();
  }, [user]);
  return (
    <div>
      <h1>User Profile</h1>
      <p>This is the user profile page.</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Created At: {user.createdAt}</p>
    </div>
  );
}
