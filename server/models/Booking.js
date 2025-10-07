const { mongoose } = require("../mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    spot_id: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpot", required: true, index: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    status: { type: String, enum: ["Booked", "CheckedIn", "Cancelled", "Completed"], default: "Booked", index: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

bookingSchema.index({ start_time: 1, end_time: 1 });

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);


