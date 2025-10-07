const express = require("express");
const ParkingLot = require("../models/ParkingLot");
const ParkingSpot = require("../models/ParkingSpot");
const mongoose = require("mongoose");
const router = express.Router();

// POST /api/owner/lots
// Creates a parking lot and optional spots
router.post("/lots", async (req, res) => {
  try {
    const { owner_user_id, lot_name, location, capacity, contact_name, contact_email, spots } = req.body;
    if (!owner_user_id || !lot_name || !location || capacity === undefined) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Create the parking lot first
    const lot = await ParkingLot.create({ 
      owner_user_id, 
      lot_name, 
      location, 
      capacity, 
      contact_name, 
      contact_email 
    });

    // Create spots if provided
    if (Array.isArray(spots) && spots.length > 0) {
      const docs = spots.map((s) => ({
        lot_id: lot._id,
        spot_number: s.spot_number,
        vehicle_type: s.vehicle_type,
        price_per_hour: s.price_per_hour,
        is_occupied: false,
      }));
      
      try {
        await ParkingSpot.insertMany(docs);
      } catch (spotError) {
        // If spot creation fails, we could optionally delete the lot
        // For now, we'll just log the error and continue
        console.error("Error creating spots:", spotError);
      }
    }

    return res.status(201).json({ lot_id: lot._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/owner/lots
// Get parking lots for a specific owner
router.get("/lots/:ownerId", async (req, res) => {
  try {
    const { ownerId } = req.params;
    const lots = await ParkingLot.find({ owner_user_id: ownerId })
      .populate('owner_user_id', 'name email')
      .lean();
    
    return res.json({ lots });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/owner/lots/:lotId/spots
// Get spots for a specific parking lot
router.get("/lots/:lotId/spots", async (req, res) => {
  try {
    const { lotId } = req.params;
    const spots = await ParkingSpot.find({ lot_id: lotId })
      .populate('lot_id', 'lot_name location')
      .lean();
    
    return res.json({ spots });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;


