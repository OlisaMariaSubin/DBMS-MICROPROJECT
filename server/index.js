require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./mongoose");
const User = require("./models/User");
const ParkingLot = require("./models/ParkingLot");
const ParkingSpot = require("./models/ParkingSpot");
const Booking = require("./models/Booking");
const Payment = require("./models/Payment");
const { findAvailableSpotByCityAndType, lotSummary } = require("./aggregations");
const authRoutes = require("./routes/auth");
const ownerRoutes = require("./routes/owner");
const driverRoutes = require("./routes/driver");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/driver", driverRoutes);

// Example availability endpoint using aggregation
app.get("/api/availability", async (req, res) => {
  try {
    const { city = "", vehicleType = "car" } = req.query;
    const spot = await findAvailableSpotByCityAndType(city, vehicleType);
    res.json({ spot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example lot summary endpoint
app.get("/api/lots/:lotId/summary", async (req, res) => {
  try {
    const lotId = req.params.lotId;
    const summary = await lotSummary(require("mongoose").Types.ObjectId.createFromHexString(lotId));
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function start() {
  await connectMongo();
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});


