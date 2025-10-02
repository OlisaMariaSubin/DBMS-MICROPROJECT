import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`SignUp submitted\nName: ${formData.name}\nEmail: ${formData.email}`)
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={viteLogo} alt="Logo" className="navbar-logo" />
          <span className="navbar-brand">SeamlessSpot</span>
        </div>
        <div className="navbar-center">
          <a href="#">Home</a>
          <a href="#">Welcome</a>
          <a href="#">About</a>
          <a href="#">Testimonials</a>
          <a href="#">Signup</a>
          <a href="#">Login</a>
        </div>
        <div className="navbar-right">
          <div className="navbar-search">
            <input type="text" placeholder="Search" />
            <span className="search-icon">
              {/* SVG icon here */}
            </span>
          </div>
        </div>
      </nav>

      <div className="signup-container">
        <h1>Create your account</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="name">Full Name</label>
          <input 
            id="name"
            name="name" 
            type="text" 
            placeholder="Your full name" 
            value={formData.name} 
            onChange={handleChange} 
            required
          />

          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            name="email" 
            type="email" 
            placeholder="you@example.com" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            id="password"
            name="password" 
            type="password" 
            placeholder="Enter password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup