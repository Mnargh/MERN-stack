// mongodb connection

const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// connect function with callback
const connectDB = async () => {
  try {
    console.log("trying to connect");
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;