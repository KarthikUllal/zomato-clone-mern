import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./VerifyOtp.css";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, fullname } = location.state || {};
  const [otp, setOtp] = useState("");

  // Protect page on refresh
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/user/verify-otp",
      { email, otp, fullname }
    );

    if (response.data.status === "SUCCESS") {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  };

  const handleResend = async () => {
    await axios.post(
      "http://localhost:8000/api/user/send-otp",
      { email, fullname }
    );
    alert("OTP Resent Successfully");
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <div className="otp-header">
          <h2>OTP Verification</h2>
          <button className="close-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <p className="otp-description">
          One Time Password has been sent to your email,
          <br />
          <strong>{email}</strong>
          <br />
          Valid for 10 minutes.
        </p>

        <div className="otp-input-container">
          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6 digit OTP"
            className="otp-input"
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button className="verify-btn" onClick={handleVerify}>
          Verify OTP
        </button>

        <div className="otp-resend">
          Not received OTP?{" "}
          <span onClick={handleResend}>Resend Now</span>
        </div>
      </div>
    </div>
  );
}