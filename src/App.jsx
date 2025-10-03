import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'

// Features Section (Dubai-style)
function FeaturesSection() {
  return (
    <section className="features-section">
      <h2 className="features-title">
        Finding parking in Dubai feels impossible?<br />
        With eXpace, it's guaranteed!
      </h2>
      <div className="features-cards-row">
        <div className="feature-card">
          <img src="/feature1.png" alt="Find Parking" className="feature-img" />
          <h3>Find Parking<br />Anytime, Anywhere</h3>
          <p>
            Quickly search for available parking spaces nearby through our mobile app, tailored to your needs.
          </p>
        </div>
        <div className="feature-card">
          <img src="/feature2.png" alt="Book Instantly" className="feature-img" />
          <h3>Book Instantly<br />with Ease</h3>
          <p>
            Reserve your spot in just a few taps — no hassle, no waiting.
          </p>
        </div>
        <div className="feature-card">
          <img src="/feature3.png" alt="Park and Go" className="feature-img" />
          <h3>Park and Go</h3>
          <p>
            Enjoy a seamless parking experience with guaranteed availability and convenience.
          </p>
        </div>
      </div>
    </section>
  );
}

// Home page component
function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={viteLogo} alt="Logo" className="navbar-logo" />
          <span className="navbar-brand">SeamlessSpot</span>
        </div>
        <div className="navbar-center">
          <Link to="/">Home</Link>
          <Link to="/welcome">Welcome</Link>
          <Link to="/about">About</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="navbar-right">
          <div className="navbar-search">
            <input type="text" placeholder="Search" />
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" />
                <line x1="15" y1="15" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </nav>

      <div className="hero">
        <img 
          src="/homemain.png" 
          alt="Hero"
          className="hero-image"
        />
        <div className="hero-text-left">
          <h1>YOUR PARKING</h1>
          <h2>YOUR CHOICE</h2>
        </div>
        <div className="hero-cards">
          <div className="hero-card">
            <h3>Parking Made Simple</h3>
            <p>
              SeamlessSpot connects drivers to private parking spaces easily, ensuring a hassle-free parking experience in urban areas.
            </p>
            <button>Get Started</button>
          </div>
          <div className="hero-card">
            <h3>Real-Time Booking</h3>
            <p>
              Book your spot anytime, anywhere.
            </p>
            <button>Join Now</button>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome</h2>
        <p>
          Welcome to the Parking Spot Sharing System – your smart solution for stress-free parking. We connect drivers with available private spaces in real time, making parking simple, reliable, and efficient. Save time, reduce hassle, and make the most of every spot.
        </p>
      </div>

      {/* Features Section (NEW, Dubai style) */}
      <FeaturesSection />

      {/* Connecting You to Parking Section */}
      <section className="parking-intro-section">
        <div className="parking-intro-content">
          <h1>
            Connecting You to Parking
          </h1>
          <p>
            SeamlessSpot is your go-to valet parking service designed to connect drivers with available parking spots in urban settings.<br/>
            Our app simplifies the process of finding and booking parking spaces in real time.
          </p>
          <p>
            With features such as secure login, integrated payments, and booking history,<br/>
            SeamlessSpot is committed to providing a hassle-free parking experience tailored for busy cities like Aluva, Kakkanad, and Edappally. Join us today!
          </p>
          <button className="parking-intro-btn">Learn More</button>
        </div>
      </section>

      <section className="reviews-section">
        <div className="reviews-content">
          <h2>Reviews</h2>
          <div className="review-block">
            <h3>What Our Users Say</h3>
            <p>
              SeamlessSpot has truly transformed my parking experience. Instead of searching endlessly, I can now find a spot quickly and conveniently, which has been a lifesaver. - Priya S.
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
  )
}

// Main App component with routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      {/* Add other routes here if needed */}
    </Routes>
  )
}

export default App
