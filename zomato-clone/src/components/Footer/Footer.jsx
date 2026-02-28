import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h1>Zomato</h1>
        </div>
        <div className="footer-dropdowns">
          <select name="footer-country-dropdown" id="">
            <option value="india">India</option>
            <option value="uae">UAE</option>
          </select>

          <select name="footer-language-dropdown" id="">
            <option value="english">English</option>
            <option value="kannada">Kannada</option>
          </select>
        </div>
      </div>

      {/*Middle Links */}
      <div className="footer-links">
        <div className="footer-column">
          <h3>ABOUT ZOMATO</h3>
          <a href="#">Who We Are</a>
          <a href="#">Blog</a>
          <a href="#">Work With Us</a>
          <a href="#">Investor Relations</a>
          <a href="#">Report Fraud</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="footer-column">
          <h3>ZOMAVERSE</h3>
          <a href="#">Zomato</a>
          <a href="#">Blinkit</a>
          <a href="#">Feeding India</a>
          <a href="#">Zomato Live</a>
        </div>

        <div className="footer-column">
          <h3>FOR RESTAURANTS</h3>
          <a href="#">Partner With Us</a>
          <a href="#">Apps For You</a>
        </div>

        <div className="footer-column">
          <h3>LEARN MORE</h3>
          <a href="#">Privacy</a>
          <a href="#">Security</a>
          <a href="#">Terms</a>
        </div>

        <div className="footer-column">
          <h3>SOCIAL LINKS</h3>

          <div className="social-icons">
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-facebook"></i>
          </div>

          <div className="app-buttons">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="" />
          </div>
        </div>
      </div>
      <hr />

      {/* Bottom Text */}
      <div className="footer-bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. 2008–2026 ©
          Zomato™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
