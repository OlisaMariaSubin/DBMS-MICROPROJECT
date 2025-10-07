import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import viteLogo from "/vite.svg";
import "./Signup.css";

function Login() {
  const [formData, setFormData] = useState({
    accountType: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Shrinking header effect
  const [headerSize, setHeaderSize] = useState(1);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newSize = Math.max(0.35, 1 - scrollY / 300);
      setHeaderSize(newSize);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      let data;
      try {
        const ct = res.headers.get("content-type") || "";
        data = ct.includes("application/json") ? await res.json() : { error: await res.text() };
      } catch (_) {
        data = { error: "Empty or invalid server response" };
      }
      if (!res.ok) throw new Error(data?.error || "Login failed");
      
      // Validate that the user's role matches the selected account type
      if (data.user.role !== formData.accountType) {
        alert(`Account type mismatch. You selected ${formData.accountType} but your account is ${data.user.role}.`);
        return;
      }
      
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userName", data.user.name || "");
      localStorage.setItem("userId", data.user._id);
      alert(`Logged in as ${data.user.role}`);
      if (data.user.role === "owner") {
        navigate("/my-spots");
      } else {
        navigate("/booking");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "rgba(34,34,34,0.95)" }}>
      {/* Navbar */}
      <nav
        className="navbar"
        style={{
          height: `${headerSize * 100}px`,
          fontSize: `${headerSize * 1.5}rem`,
          padding: `${headerSize * 18}px ${headerSize * 32}px`,
          transition:
            "height 0.3s ease, font-size 0.3s ease, padding 0.3s ease",
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
        <div
          className="navbar-center"
          style={{
            flex: 1,
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Link to="/" style={{ margin: "0 1.5rem" }}>
            Home
          </Link>
          <Link to="/signup" style={{ margin: "0 1.5rem" }}>
            Signup
          </Link>
          {!localStorage.getItem("userEmail") && (
            <Link to="/login" style={{ margin: "0 1.5rem" }}>Login</Link>
          )}
        </div>
        <UserMenu/>
      </nav>

      {/* Login Form */}
      <div
        className="signup-container"
        style={{
          marginTop: "140px",
          background: "rgba(0,0,0,0.85)",
          color: "#fff",
          textAlign: "left",
        }}
      >
        <h1 style={{ color: "#fff", textAlign: "center" }}>Login</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="accountType" style={{ color: "#fff" }}>
            Driver or Place Owner?
          </label>
          <select
            id="accountType"
            name="accountType"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              marginBottom: "10px",
              marginTop: "5px",
              background: "#222",
              color: "#fff",
            }}
            required
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="driver">Driver</option>
            <option value="owner">Place Owner</option>
          </select>

          <label htmlFor="email" style={{ color: "#fff" }}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" style={{ color: "#fff" }}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
