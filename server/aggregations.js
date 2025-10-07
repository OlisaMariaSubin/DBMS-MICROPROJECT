const ParkingSpot = require("./models/ParkingSpot");

// Find one available spot by city (substring match), vehicle type, with lot info
async function findAvailableSpotByCityAndType(cityQuery, vehicleType) {
  const pipeline = [
    { $match: { is_occupied: false, vehicle_type: vehicleType } },
    {
      $lookup: {
        from: "parkinglots",
        localField: "lot_id",
        foreignField: "_id",
        as: "lot",
      },
    },
    { $unwind: "$lot" },
    { $match: { "lot.location": { $regex: cityQuery, $options: "i" } } },
    { $limit: 1 },
  ];
  const result = await ParkingSpot.aggregate(pipeline).exec();
  return result[0] || null;
}

// Summarize a lot: total spots, occupied/free counts, average price per hour
async function lotSummary(lotId) {
  const pipeline = [
    { $match: { lot_id: lotId } },
    {
      $group: {
        _id: "$lot_id",
        totalSpots: { $sum: 1 },
        occupiedSpots: { $sum: { $cond: ["$is_occupied", 1, 0] } },
        freeSpots: { $sum: { $cond: ["$is_occupied", 0, 1] } },
        avgPricePerHour: { $avg: "$price_per_hour" },
      },
    },
  ];
  const result = await ParkingSpot.aggregate(pipeline).exec();
  return result[0] || { totalSpots: 0, occupiedSpots: 0, freeSpots: 0, avgPricePerHour: 0 };
}

module.exports = { findAvailableSpotByCityAndType, lotSummary };


