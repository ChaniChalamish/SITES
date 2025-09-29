const mongoose = require("mongoose");
require("dotenv").config();

main().catch(err => console.log("Mongo error:", err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo connected successfully");
  } catch (err) {
    console.error(" Mongo connection failed:", err.message);
  }
}
