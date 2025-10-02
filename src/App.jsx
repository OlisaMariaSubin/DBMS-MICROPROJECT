import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup' // Import your Signup component

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
          <Link to="/">Home</Link>           {/* Use Link */}
          <Link to="/welcome">Welcome</Link>
          <Link to="/">About</Link>
          <Link to="/">Testimonials</Link>
          <Link to="/signup">Signup</Link>   {/* Signup route */}
          <Link to="/">Login</Link>
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

      {/* Hero and content as before */}
      {/* ...your existing hero content... */}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      {/* Add other routes */}
    </Routes>
  )
}

export default App
