import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";


export default function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });

  //this useState to handle checkbox state
  const [isChecked, setiIChecked] = useState(false);

  //Closing Signup page functionality
  const closeSignupPage = () =>{
    navigate(-1)
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/user", user);

      if (response.data.status === 1) {
        toast.success(response.data.message);

        setUser({ fullname: "", email: "" });

        //Redirect to login page
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h2>Sign Up</h2>
          <button className="close-btn" onClick={closeSignupPage}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-controls">
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-controls">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="check-terms">
            <input
              type="checkbox"
              required
              checked={isChecked}
              onChange={(e) => setiIChecked(e.target.checked)}
            />
            <span>
              I agree to Zomato's <a href="#">Terms</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </div>

          <div className="form-controls">
            <button type="submit" className="btn-create-account" disabled={!isChecked}>
              Create Account
            </button>
          </div>

          <div className="break">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <div className="form-controls">
            <button type="button" className="btn-login">
              Sign In with Google
            </button>
          </div>

          <div className="break">
            <hr />
          </div>

          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
