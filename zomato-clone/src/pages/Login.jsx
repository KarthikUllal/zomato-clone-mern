import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import api from "../api.js";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const checkToken = async () => {
      try {
        const response = await api.get(
          "/api/user/verify-token",
          {
            headers: { Authorization: token },
          },
        );

        if (response.data.status === "SUCCESS") {
          toast.info(response.data.message);

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          localStorage.removeItem("token");

          toast.error(response.data.message || "Session expired");
        }
      } catch (error) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.", error);
      }
    };

    checkToken();
  }, [navigate]);

  // Closing Login page functionality
  const closeLoginPage = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post(
        "/api/user/send-otp",
        { email, fullname },
      );

      if (response.data.status === "NEW_USER") {
        setIsNewUser(true);
        toast.info("Please enter your full name");
        setLoading(false);
        return;
      }

      if (response.data.status === "PENDING") {
        toast.success("OTP Sent Successfully");

        navigate("/verify-otp", {
          state: { email, fullname },
        });
      }

      if (response.data.status === "FAILED") {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
    finally{
       setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
          <button className="close-btn" onClick={closeLoginPage}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-controls email-field">
            <input
              type="email"
              placeholder="Email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {isNewUser && (
            <div className="form-controls">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          )}

          <div className="form-controls">
            <button type="submit" className="btn-otp" disabled={loading}>
              <ClipLoader color="#fff" loading={loading} size={20} spacing={2} />
              Send One Time Password
            </button>
          </div>


          <div className="break">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <div className="form-controls">
            <button type="button" className="btn-login">
              Continue With Email
            </button>
          </div>

          <div className="form-controls">
            <button type="button" className="btn-login">
              Sign In with Google
            </button>
          </div>

          <div className="break">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <div className="login-footer">
            <p>
              New to Zomato? <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
