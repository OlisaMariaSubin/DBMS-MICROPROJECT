import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import viteLogo from "/vite.svg";
import "./Signup.css";

function MySpots() {
  const navigate = useNavigate();
  const [headerSize, setHeaderSize] = useState(1);
  const [spots, setSpots] = useState([]);
  const [form, setForm] = useState({
    lotName: "",
    location: "",
    vehicleType: "",
    pricePerHour: "",
    capacity: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newSize = Math.max(0.35, 1 - scrollY / 300);
      setHeaderSize(newSize);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleAddSpot(e) {
    e.preventDefault();
    const ownerId = localStorage.getItem("userId");
    if (!ownerId) {
      alert("Please login as an owner first.");
      return;
    }
    const capacity = Number(form.capacity) || 0;
    const price = Number(form.pricePerHour) || 0;
    const spots = Array.from({ length: capacity }).map((_, i) => ({
      spot_number: `${form.lotName.substring(0,1).toUpperCase()}${i + 1}`,
      vehicle_type: form.vehicleType || "car",
      price_per_hour: price,
    }));
    fetch("/api/owner/lots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner_user_id: ownerId,
        lot_name: form.lotName,
        location: form.location,
        capacity,
        spots,
      }),
    })
      .then(async (r) => {
        let data;
        try {
          const ct = r.headers.get("content-type") || "";
          data = ct.includes("application/json") ? await r.json() : { error: await r.text() };
        } catch (_) {
          data = { error: "Empty or invalid server response" };
        }
        if (!r.ok) throw new Error(data?.error || "Failed to create lot");
        setSpots((s) => [
          {
            id: data.lot_id,
            lotName: form.lotName,
            location: form.location,
            vehicleType: form.vehicleType,
            pricePerHour: price,
            capacity,
          },
          ...s,
        ]);
        setForm({ lotName: "", location: "", vehicleType: "", pricePerHour: "", capacity: "" });
        alert("Lot and spots created.");
      })
      .catch((e) => alert(e.message));
  }

  return (
    <div style={{ minHeight: "100vh", background: "rgba(34,34,34,0.95)" }}>
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
          {!localStorage.getItem("userEmail") && (<Link to="/login" style={{ margin: "0 1.5rem" }}>Login</Link>)}
          <Link to="/my-spots" style={{ margin: "0 1.5rem", fontWeight: 600 }}>My Spots</Link>
        </div>
        <UserMenu/>
      </nav>

      <div className="signup-container" style={{ marginTop: "140px", background: "rgba(0,0,0,0.85)", color: "#fff" }}>
        <h1 style={{ textAlign: "center" }}>Manage My Spots</h1>
        <form className="signup-form" onSubmit={handleAddSpot}>
          <label>Parking Lot Name</label>
          <input name="lotName" value={form.lotName} onChange={handleChange} placeholder="e.g., City Center Lot" required />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} placeholder="e.g., MG Road, Kochi" required />

          <label>Vehicle Type</label>
          <select name="vehicleType" value={form.vehicleType} onChange={handleChange} required>
            <option value="" disabled>Select type</option>
            <option value="car">Car (4 Wheeler)</option>
            <option value="bike">Bike (2 Wheeler)</option>
            <option value="EV">EV</option>
            <option value="other">Other</option>
          </select>

          <label>Price per hour (₹)</label>
          <input type="number" name="pricePerHour" value={form.pricePerHour} onChange={handleChange} min="0" step="1" required />

          <label>Capacity (spots)</label>
          <input type="number" name="capacity" value={form.capacity} onChange={handleChange} min="0" step="1" required />

          <button type="submit">Add Spot</button>
        </form>

        {spots.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <h3 style={{ marginTop: 0 }}>Your Spots</h3>
            <div style={{ display: "grid", gap: 12 }}>
              {spots.map((s) => (
                <div key={s.id} style={{ background: "#1b1c2e", borderRadius: 12, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong>{s.lotName}</strong>
                      <div style={{ color: "#bfc9db" }}>{s.location}</div>
                      <div style={{ color: "#bfc9db" }}>Type: {s.vehicleType} • ₹{s.pricePerHour}/hr • Capacity: {s.capacity}</div>
                    </div>
                    <div>
                      <button style={{ background: "#2a2b44" }} onClick={() => alert("Edit coming soon")}>Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MySpots;


