const { mongoose } = require("../mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, enum: ["UPI", "CreditCard", "DebitCard", "Wallet", "NetBanking", "Cash", "Other"], required: true },
    status: { type: String, enum: ["Success", "Failed", "Pending"], default: "Pending", index: true },
    payment_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

paymentSchema.index({ payment_date: 1 });

module.exports = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);


