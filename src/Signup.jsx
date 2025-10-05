import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`SignUp submitted\nName: ${formData.name}\nEmail: ${formData.email}`)
  }

  return (
    <div className="signup-bg">
      <div className="signup-blur-overlay"></div>
      {/* Main NAVBAR HEADER */}
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
              {/* SVG icon here if desired */}
            </span>
          </div>
        </div>
      </nav>
      {/* Signup Card Center */}
      <div className="signup-center-wrap">
        <div className="signup-card">
          <button className="signup-back">&lt;</button>
          <h1 className="signup-title">Sign Up</h1>
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
            <button type="submit" className="signup-submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
