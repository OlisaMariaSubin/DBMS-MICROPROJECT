const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/seamlessspot";

let isConnected = false;

async function connectMongo() {
  if (isConnected) return mongoose.connection;
  
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    return mongoose.connection;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { mongoose, connectMongo };


