const express = require("express");
const ParkingLot = require("../models/ParkingLot");
const ParkingSpot = require("../models/ParkingSpot");
const Booking = require("../models/Booking");
const router = express.Router();

// GET /api/driver/lots
// Get all available parking lots
router.get("/lots", async (req, res) => {
  try {
    const lots = await ParkingLot.find({})
      .populate('owner_user_id', 'name email')
      .lean();
    
    return res.json({ lots });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/driver/lots/:lotId/spots
// Get available spots for a specific parking lot
router.get("/lots/:lotId/spots", async (req, res) => {
  try {
    const { lotId } = req.params;
    const { vehicleType } = req.query;
    
    let query = { lot_id: lotId, is_occupied: false };
    if (vehicleType) {
      query.vehicle_type = vehicleType;
    }
    
    const spots = await ParkingSpot.find(query)
      .populate('lot_id', 'lot_name location')
      .lean();
    
    return res.json({ spots });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/driver/spots/available
// Get all available spots across all lots
router.get("/spots/available", async (req, res) => {
  try {
    const { vehicleType, location } = req.query;
    
    let spotQuery = { is_occupied: false };
    let lotQuery = {};
    
    if (vehicleType) {
      spotQuery.vehicle_type = vehicleType;
    }
    
    if (location) {
      lotQuery.location = new RegExp(location, 'i');
    }
    
    const spots = await ParkingSpot.find(spotQuery)
      .populate({
        path: 'lot_id',
        match: lotQuery,
        select: 'lot_name location contact_name contact_email'
      })
      .lean();
    
    // Filter out spots where lot_id is null (due to location filter)
    const availableSpots = spots.filter(spot => spot.lot_id);
    
    return res.json({ spots: availableSpots });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/driver/bookings
// Create a new booking
router.post("/bookings", async (req, res) => {
  try {
    const { user_id, spot_id, start_time, end_time, amount } = req.body;
    
    if (!user_id || !spot_id || !start_time || !end_time || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    // Check if spot is still available
    const spot = await ParkingSpot.findById(spot_id);
    if (!spot || spot.is_occupied) {
      return res.status(400).json({ error: "Spot is no longer available" });
    }
    
    // Create booking
    const booking = await Booking.create({
      user_id,
      spot_id,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      amount
    });
    
    // Mark spot as occupied
    await ParkingSpot.findByIdAndUpdate(spot_id, { is_occupied: true });
    
    return res.status(201).json({ booking });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
