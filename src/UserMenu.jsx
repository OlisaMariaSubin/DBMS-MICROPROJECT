import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName") || userEmail;

  if (!userEmail) return null;

  return (
    <div
      className="navbar-right"
      style={{ position: "relative", marginRight: 16 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{ padding: "6px 10px", background: "#2a2b44", borderRadius: 12 }}>
        Hello, {userName}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            background: "#1b1c2e",
            borderRadius: 10,
            padding: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            marginTop: 8,
            minWidth: 140,
          }}
        >
          <button
            style={{ background: "#2a2b44", width: "100%" }}
            onClick={() => {
              localStorage.removeItem("userRole");
              localStorage.removeItem("userEmail");
              localStorage.removeItem("userName");
              navigate("/");
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;


