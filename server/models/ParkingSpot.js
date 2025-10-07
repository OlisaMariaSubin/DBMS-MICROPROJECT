const { mongoose } = require("../mongoose");

const parkingSpotSchema = new mongoose.Schema(
  {
    lot_id: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingLot", required: true, index: true },
    spot_number: { type: String, required: true, trim: true },
    vehicle_type: { type: String, enum: ["car", "bike", "EV", "other"], required: true },
    price_per_hour: { type: Number, required: true, min: 0 },
    is_occupied: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

parkingSpotSchema.index({ is_occupied: 1, vehicle_type: 1, lot_id: 1 });

module.exports = mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", parkingSpotSchema);


