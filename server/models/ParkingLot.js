const { mongoose } = require("../mongoose");

const parkingLotSchema = new mongoose.Schema(
  {
    owner_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    lot_name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true, min: 0 },
    contact_name: { type: String },
    contact_email: { type: String },
  },
  { timestamps: true }
);

parkingLotSchema.index({ lot_name: "text", location: "text" });

module.exports = mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);


