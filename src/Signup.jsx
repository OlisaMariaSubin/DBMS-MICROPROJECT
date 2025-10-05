import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

function Signup() {
  const [role, setRole] = useState("driver"); // "driver" or "owner"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    carModel: '',
    license: '',
    parkingAddress: '',
    spotCount: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`SignUp submitted for ${role}\nName: ${formData.name}\nEmail: ${formData.email}`)
  }

  return (
    <div className="signup-bg">
      {/* Header/navbar */}
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
            <span className="search-icon">{/* SVG here */}</span>
          </div>
        </div>
      </nav>
      <div className="signup-blur-overlay"></div>
      <div className="signup-center-wrap">
        <div className="signup-card">
          <button className="signup-back">&lt;</button>
          <h1 className="signup-title">Sign Up</h1>
          {/* Sliding Bar */}
          <div className="signup-slider-bar">
            <button
              className={role === 'driver' ? 'active' : ''}
              onClick={() => setRole('driver')}
            >
              Driver
            </button>
            <button
              className={role === 'owner' ? 'active' : ''}
              onClick={() => setRole('owner')}
            >
              Owner
            </button>
            <div
              className="signup-slider-indicator"
              style={{
                left: role === 'driver' ? '10px' : 'calc(50% + 10px)'
              }}
            />
          </div>
          {/* Form changes with selection */}
          <form onSubmit={handleSubmit} className="signup-form-new">
            <div className="signup-input-wrap">
              <span className="signup-icon">👤</span>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
            <div className="signup-input-wrap">
              <span className="signup-icon">📧</span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
            <div className="signup-input-wrap">
              <span className="signup-icon">🔒</span>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="signup-input-wrap">
              <span className="signup-icon">🔒</span>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
            {/* Driver specific fields */}
            {role === 'driver' && (
              <>
                <div className="signup-input-wrap">
                  <span className="signup-icon">🚗</span>
                  <input
                    name="carModel"
                    type="text"
                    placeholder="Car Model"
                    value={formData.carModel}
                    onChange={handleChange}
                  />
                </div>
                <div className="signup-input-wrap">
                  <span className="signup-icon">🪪</span>
                  <input
                    name="license"
                    type="text"
                    placeholder="License Number"
                    value={formData.license}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* Owner specific fields */}
            {role === 'owner' && (
              <>
                <div className="signup-input-wrap">
                  <span className="signup-icon">📍</span>
                  <input
                    name="parkingAddress"
                    type="text"
                    placeholder="Parking Address"
                    value={formData.parkingAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="signup-input-wrap">
                  <span className="signup-icon">🔢</span>
                  <input
                    name="spotCount"
                    type="number"
                    placeholder="Spot Count"
                    value={formData.spotCount}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <button type="submit" className="signup-submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
