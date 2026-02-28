import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLayout.css";
import { toast } from "react-toastify";
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "1234";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="admin-login-container">
      <form className="admin-login-box" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
