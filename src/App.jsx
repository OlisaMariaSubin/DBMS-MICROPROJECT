import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          {/* Replace with your logo SVG or image */}
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
            
            {/* SVG search icon */}
            <input type="text" placeholder="Search" />
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2"/>
                <line x1="15" y1="15" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            
          </div>
        </div>
      </nav>
      <img 
        src="/homemain.png" 
        alt="Hero"
        style={{
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        display: "block"
      }}
    />
    </div>
  )
}

export default App