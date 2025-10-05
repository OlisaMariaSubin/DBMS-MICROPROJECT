import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";

// ✅ Features Section
function FeaturesSection() {
  return (
    <section className="features-section">
      <h2 className="features-title">
        Finding parking in Kochi feels impossible?
        <br />
        With SeamlessSpot, it's guaranteed!
      </h2>

      <div className="features-cards-row">
        <div className="feature-card">
          <img src="/Img_2.png.webp" alt="Find Parking" className="feature-img" />
          <h3>
            Find Parking
            <br />
            Anytime, Anywhere
          </h3>
          <p>
            Quickly search for available parking spaces nearby through our
            mobile app, tailored to your needs.
          </p>
        </div>

        <div className="feature-card">
          <img src="/IMG.webp" alt="Book Instantly" className="feature-img" />
          <h3>
            Book Instantly
            <br />
            with Ease
          </h3>
          <p>Reserve your spot in just a few taps — no hassle, no waiting.</p>
        </div>

        <div className="feature-card">
          <img src="/IMGg.webp" alt="Park and Go" className="feature-img" />
          <h3>Park and Go</h3>
          <p>
            Enjoy a seamless parking experience with guaranteed availability and
            convenience.
          </p>
        </div>
      </div>
    </section>
  );
}

// ✅ Home Page Component with Shrinking Navbar
function Home() {
  const [headerSize, setHeaderSize] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newSize = Math.max(0.5, 1 - scrollY / 400);
      setHeaderSize(newSize);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar"
        style={{
          height: `${headerSize * 100}px`,
          fontSize: `${headerSize * 1.5}rem`,
          padding: `${headerSize * 18}px ${headerSize * 32}px`,
          transition: "height 0.3s ease, font-size 0.3s ease, padding 0.3s ease",
        }}
      >
        <div className="navbar-left">
          <img
            src={viteLogo}
            alt="Logo"
            className="navbar-logo"
            style={{
              width: `${headerSize * 48}px`,
              height: `${headerSize * 48}px`,
              transition: "width 0.3s ease, height 0.3s ease",
            }}
          />
          <span
            className="navbar-brand"
            style={{
              fontSize: `${headerSize * 2.2}rem`,
              transition: "font-size 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            SeamlessSpot
          </span>
        </div>

        <div className="navbar-center" style={{ flex: 1, justifyContent: "center", display: "flex" }}>
          <Link to="/" style={{ margin: "0 1.5rem" }}>Home</Link>
          <Link to="/signup" style={{ margin: "0 1.5rem" }}>Signup</Link>
          <Link to="/login" style={{ margin: "0 1.5rem" }}>Login</Link>
        </div>
      </nav>

      <div className="app-content">
        {/* Hero Section */}
        <div className="hero">
          <img src="/homemain.png" alt="Hero" className="hero-image" />
          <div className="hero-text-left">
            <h1>YOUR PARKING</h1>
            <h2>YOUR CHOICE</h2>
          </div>

          <div className="hero-cards" style={{ marginTop: "-80px" }}>
            <div className="hero-card">
              <h3>Parking Made Simple</h3>
              <p>
                SeamlessSpot connects drivers to private parking spaces easily,
                ensuring a hassle-free parking experience in urban areas.
              </p>
              <button>Get Started</button>
            </div>

            <div
              className="hero-card"
              style={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3>Real-Time Booking</h3>
              <p>
                Book your parking spot anytime, anywhere — from your couch, on
                the go, or right before you arrive.
              </p>
              <button onClick={() => navigate("/signup")}>Join Now</button>
            </div>
          </div>
        </div>

        {/* Cover gap above welcome section */}
        <div style={{ height: "20px", background: "#222" }} />

        {/* Welcome Section */}
        <div className="welcome-section" style={{ marginTop: "2px" }}>
          <h2>Welcome</h2>
          <p>
            Welcome to the Parking Spot Sharing System – your smart solution for
            stress-free parking. We connect drivers with available private spaces
            in real time, making parking simple, reliable, and efficient. Save
            time, reduce hassle, and make the most of every spot.
          </p>
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* Parking Intro Section */}
        <section className="parking-intro-section">
          <div className="parking-intro-content">
            <h1>Connecting You to Parking</h1>
            <p>
              SeamlessSpot connects drivers with available parking spots in
              urban settings and simplifies booking in real time.
            </p>
            <button className="parking-intro-btn">Learn More</button>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews-section">
          <div className="reviews-content">
            <h2>Reviews</h2>

            <div className="review-block">
              <h3>What Our Users Say</h3>
              <p>
                SeamlessSpot has truly transformed my parking experience. Instead
                of searching endlessly, I can now find a spot quickly and
                conveniently. - Priya S.
              </p>
            </div>
            <hr className="review-divider" />

            <div className="review-block">
              <h3>Outstanding Service</h3>
              <p>Their app is user-friendly and efficient!</p>
            </div>
            <hr className="review-divider" />

            <div className="review-block">
              <h3>Highly Recommend</h3>
              <p>Great service and friendly staff; it’s very convenient.</p>
            </div>
            <hr className="review-divider" />

            <div className="review-block">
              <h3>Top-notch Experience</h3>
              <p>SeamlessSpot made parking enjoyable; I will use it again.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ✅ Main App Component with Routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/signup"
        element={
          <div
            style={{
              minHeight: "100vh",
              backgroundImage: "url('/homemain.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            <Signup />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div
            style={{
              minHeight: "100vh",
              backgroundImage: "url('/homemain.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            <Login />
          </div>
        }
      />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
