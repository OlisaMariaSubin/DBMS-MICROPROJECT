import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import viteLogo from "/vite.svg";
import "./Signup.css";

function Booking() {
  const navigate = useNavigate();

  // UI state
  const [headerSize, setHeaderSize] = useState(1);
  const [step, setStep] = useState(1); // 1=details, 2=payment, 3=review, 4=confirmation
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Data state
  const [parkingLots, setParkingLots] = useState([]);
  const [availableSpots, setAvailableSpots] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Form state
  const [vehicleType, setVehicleType] = useState(""); // "car" | "bike" | "EV" | "other"
  const [hours, setHours] = useState("");
  const [location, setLocation] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationList, setShowLocationList] = useState(false);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState(""); // card, wallet, netbanking
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [wallet, setWallet] = useState({ provider: "", mobile: "" });
  const [netbanking, setNetbanking] = useState({ bank: "" });

  // Shrinking header effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newSize = Math.max(0.35, 1 - scrollY / 300);
      setHeaderSize(newSize);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch parking lots on component mount
  useEffect(() => {
    fetchParkingLots();
  }, []);

  // Fetch available spots when lot or vehicle type changes
  useEffect(() => {
    if (selectedLot && vehicleType) {
      fetchAvailableSpots();
    }
  }, [selectedLot, vehicleType]);

  const fetchParkingLots = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/driver/lots");
      const data = await response.json();
      if (response.ok) {
        setParkingLots(data.lots);
      } else {
        console.error("Failed to fetch parking lots:", data.error);
      }
    } catch (error) {
      console.error("Error fetching parking lots:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSpots = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/driver/lots/${selectedLot._id}/spots?vehicleType=${vehicleType}`);
      const data = await response.json();
      if (response.ok) {
        setAvailableSpots(data.spots);
      } else {
        console.error("Failed to fetch available spots:", data.error);
      }
    } catch (error) {
      console.error("Error fetching available spots:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLocations = useMemo(() => {
    if (!locationQuery) return [];
    const q = locationQuery.toLowerCase();
    return parkingLots.filter((lot) => lot.location.toLowerCase().includes(q));
  }, [locationQuery, parkingLots]);

  const price = useMemo(() => {
    const parsedHours = Number(hours);
    if (!selectedSpot || !parsedHours || parsedHours <= 0) return 0;
    return parsedHours * selectedSpot.price_per_hour;
  }, [selectedSpot, hours]);

  function validateStep1() {
    const e = {};
    const parsed = Number(hours);
    if (!vehicleType) e.vehicleType = "Select a vehicle type";
    if (!selectedLot) e.lot = "Choose a parking lot";
    if (!selectedSpot) e.spot = "Select a parking spot";
    if (!hours) e.hours = "Enter booking hours";
    else if (!Number.isFinite(parsed) || parsed <= 0) e.hours = "Hours must be a positive number";
    else if (parsed > 72) e.hours = "Max 72 hours allowed";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!paymentMethod) e.paymentMethod = "Select a payment method";
    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(card.number.replaceAll(" ", ""))) e.cardNumber = "Enter 16-digit card number";
      if (!card.name.trim()) e.cardName = "Enter name on card";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "Use MM/YY";
      if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = "Enter valid CVV";
    }
    if (paymentMethod === "wallet") {
      if (!wallet.provider) e.walletProvider = "Select wallet";
      if (!/^\d{10}$/.test(wallet.mobile)) e.walletMobile = "Enter 10-digit mobile";
    }
    if (paymentMethod === "netbanking") {
      if (!netbanking.bank) e.bank = "Choose a bank";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(4, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function resetPayment() {
    setCard({ number: "", name: "", expiry: "", cvv: "" });
    setWallet({ provider: "", mobile: "" });
    setNetbanking({ bank: "" });
  }

  const onConfirmPay = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + (Number(hours) * 60 * 60 * 1000));
      
      const response = await fetch("/api/driver/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          spot_id: selectedSpot._id,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          amount: price
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setStep(4);
      } else {
        alert(`Booking failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          {!localStorage.getItem("userEmail") && (
          <Link to="/login" style={{ margin: "0 1.5rem" }}>Login</Link>
          )}
          {localStorage.getItem("userRole") === "owner" ? (
            <Link to="/my-spots" style={{ margin: "0 1.5rem", fontWeight: 600 }}>My Spots</Link>
          ) : (
            <Link to="/booking" style={{ margin: "0 1.5rem", fontWeight: 600 }}>Booking</Link>
          )}
        </div>
        <UserMenu/>
      </nav>

      <div
        className="signup-container"
        style={{
          marginTop: "140px",
          background: "rgba(0,0,0,0.85)",
          color: "#fff",
        }}
      >
        <h1 style={{ color: "#fff", textAlign: "center" }}>Book a Parking Spot</h1>

        {/* Stepper */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, fontSize: "0.95rem", color: "#bfc9db" }}>
          <span style={{ fontWeight: step === 1 ? 700 : 500 }}>1. Details</span>
          <span style={{ fontWeight: step === 2 ? 700 : 500 }}>2. Payment</span>
          <span style={{ fontWeight: step === 3 ? 700 : 500 }}>3. Review</span>
          <span style={{ fontWeight: step === 4 ? 700 : 500 }}>4. Done</span>
        </div>

        {step === 1 && (
          <form className="signup-form" onSubmit={(e) => { e.preventDefault(); goNext(); }}>
            <label>Vehicle Type</label>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="" disabled>Select type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="EV">Electric Vehicle</option>
              <option value="other">Other</option>
            </select>
            {errors.vehicleType && <small style={{ color: "#ff7b7b" }}>{errors.vehicleType}</small>}

            <label>Location</label>
            <input
              type="text"
              placeholder="Start typing location (e.g., Kochi)"
              value={locationQuery}
              onChange={(e) => { setLocationQuery(e.target.value); setShowLocationList(true); }}
              onFocus={() => setShowLocationList(true)}
            />
            {showLocationList && filteredLocations.length > 0 && (
              <div style={{ background: "#23243a", borderRadius: 8, padding: 8, maxHeight: "200px", overflowY: "auto" }}>
                {filteredLocations.map((lot) => (
                  <div
                    key={lot._id}
                    style={{ padding: "8px 10px", cursor: "pointer", borderRadius: 6 }}
                    onClick={() => { setSelectedLot(lot); setLocation(lot.location); setLocationQuery(lot.location); setShowLocationList(false); }}
                  >
                    <div style={{ fontWeight: "bold" }}>{lot.lot_name}</div>
                    <div style={{ fontSize: "0.9em", color: "#bfc9db" }}>{lot.location}</div>
                  </div>
                ))}
              </div>
            )}
            {errors.lot && <small style={{ color: "#ff7b7b" }}>{errors.lot}</small>}

            {selectedLot && vehicleType && (
              <>
                <label>Available Spots</label>
                {loading ? (
                  <div style={{ padding: "10px", textAlign: "center", color: "#bfc9db" }}>Loading spots...</div>
                ) : availableSpots.length > 0 ? (
                  <div style={{ background: "#23243a", borderRadius: 8, padding: 8, maxHeight: "200px", overflowY: "auto" }}>
                    {availableSpots.map((spot) => (
                      <div
                        key={spot._id}
                        style={{ 
                          padding: "8px 10px", 
                          cursor: "pointer", 
                          borderRadius: 6,
                          background: selectedSpot?._id === spot._id ? "#007bff" : "transparent"
                        }}
                        onClick={() => setSelectedSpot(spot)}
                      >
                        <div style={{ fontWeight: "bold" }}>Spot {spot.spot_number}</div>
                        <div style={{ fontSize: "0.9em", color: "#bfc9db" }}>
                          ₹{spot.price_per_hour}/hour
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "10px", textAlign: "center", color: "#ff7b7b" }}>
                    No available spots for {vehicleType} at this location
                  </div>
                )}
                {errors.spot && <small style={{ color: "#ff7b7b" }}>{errors.spot}</small>}
              </>
            )}

            <label>Hours for Parking</label>
            <input
              type="number"
              placeholder="e.g. 2"
              min="1"
              max="72"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            {errors.hours && <small style={{ color: "#ff7b7b" }}>{errors.hours}</small>}

            {/* Dynamic Price */}
            {selectedSpot && (
              <div style={{ marginTop: 6, padding: "10px 12px", background: "#1b1c2e", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Estimated Total</span>
                  <strong>₹ {price || 0}</strong>
                </div>
                <small style={{ color: "#bfc9db" }}>
                  {selectedSpot.price_per_hour}/hour × {hours || 0} hours
                </small>
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Continue to Payment"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="signup-form" onSubmit={(e) => { e.preventDefault(); goNext(); }}>
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => { setPaymentMethod(e.target.value); setErrors({}); resetPayment(); }}
            >
              <option value="" disabled>Select payment method</option>
              <option value="card">Credit/Debit Card</option>
              <option value="wallet">Mobile Wallet</option>
              <option value="netbanking">Net Banking</option>
            </select>
            {errors.paymentMethod && <small style={{ color: "#ff7b7b" }}>{errors.paymentMethod}</small>}

            {paymentMethod === "card" && (
              <div style={{ display: "grid", gap: 12 }}>
                <input
                  type="text"
                  placeholder="Card Number (16 digits)"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />
                {errors.cardNumber && <small style={{ color: "#ff7b7b" }}>{errors.cardNumber}</small>}
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />
                {errors.cardName && <small style={{ color: "#ff7b7b" }}>{errors.cardName}</small>}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
                {(errors.expiry || errors.cvv) && (
                  <small style={{ color: "#ff7b7b" }}>{errors.expiry || errors.cvv}</small>
                )}
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div style={{ display: "grid", gap: 12 }}>
                <select value={wallet.provider} onChange={(e) => setWallet({ ...wallet, provider: e.target.value })}>
                  <option value="" disabled>Select provider</option>
                  <option value="Paytm">Paytm</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Google Pay">Google Pay</option>
                </select>
                {errors.walletProvider && <small style={{ color: "#ff7b7b" }}>{errors.walletProvider}</small>}
                <input
                  type="text"
                  placeholder="Registered Mobile Number"
                  value={wallet.mobile}
                  onChange={(e) => setWallet({ ...wallet, mobile: e.target.value })}
                />
                {errors.walletMobile && <small style={{ color: "#ff7b7b" }}>{errors.walletMobile}</small>}
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div style={{ display: "grid", gap: 12 }}>
                <select value={netbanking.bank} onChange={(e) => setNetbanking({ bank: e.target.value })}>
                  <option value="" disabled>Select your bank</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>SBI</option>
                  <option>Axis Bank</option>
                  <option>Yes Bank</option>
                </select>
                {errors.bank && <small style={{ color: "#ff7b7b" }}>{errors.bank}</small>}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button type="button" onClick={goBack} style={{ background: "#2a2b44" }}>Back</button>
              <button type="button" onClick={() => { if (validateStep2()) setStep(3); }}>Review</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="signup-form">
            <div style={{ background: "#1b1c2e", borderRadius: 12, padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>Review your booking</h3>
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Parking Lot</span>
                  <strong>{selectedLot?.lot_name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Location</span>
                  <strong>{selectedLot?.location}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Spot</span>
                  <strong>Spot {selectedSpot?.spot_number}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Vehicle Type</span>
                  <strong>{vehicleType}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Hours</span>
                  <strong>{hours}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Rate</span>
                  <strong>₹{selectedSpot?.price_per_hour}/hour</strong>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #2e3358" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }}>
                  <span>Total</span>
                  <strong>₹ {price}</strong>
                </div>
              </div>
            </div>
            <form onSubmit={onConfirmPay} style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button type="button" onClick={goBack} style={{ background: "#2a2b44" }}>Back</button>
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
        </form>
          </div>
        )}

        {step === 4 && (
          <div className="signup-form" style={{ textAlign: "center" }}>
            <h2 style={{ margin: 0 }}>Booking Confirmed</h2>
            <p style={{ color: "#bfc9db" }}>Your parking spot has been reserved.</p>
            <div style={{ background: "#1b1c2e", borderRadius: 12, padding: 16, marginTop: 8 }}>
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Parking Lot</span>
                  <strong>{selectedLot?.lot_name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Location</span>
                  <strong>{selectedLot?.location}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Spot</span>
                  <strong>Spot {selectedSpot?.spot_number}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Vehicle Type</span>
                  <strong>{vehicleType}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Hours</span>
                  <strong>{hours}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Paid</span>
                  <strong>₹ {price}</strong>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 14, justifyContent: "center" }}>
              <button onClick={() => navigate("/")}>Go to Home</button>
              <button onClick={() => navigate("/booking")}>Make another booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
