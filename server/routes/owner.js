const express = require("express");
const ParkingLot = require("../models/ParkingLot");
const ParkingSpot = require("../models/ParkingSpot");
const mongoose = require("mongoose");
const router = express.Router();

// POST /api/owner/lots
// Creates a parking lot and optional spots in one transaction
router.post("/lots", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { owner_user_id, lot_name, location, capacity, contact_name, contact_email, spots } = req.body;
    if (!owner_user_id || !lot_name || !location || capacity === undefined) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const lot = await ParkingLot.create([{ owner_user_id, lot_name, location, capacity, contact_name, contact_email }], { session });
    const lotId = lot[0]._id;

    if (Array.isArray(spots) && spots.length > 0) {
      const docs = spots.map((s) => ({
        lot_id: lotId,
        spot_number: s.spot_number,
        vehicle_type: s.vehicle_type,
        price_per_hour: s.price_per_hour,
        is_occupied: false,
      }));
      await ParkingSpot.insertMany(docs, { session });
    }

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ lot_id: lotId });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;


