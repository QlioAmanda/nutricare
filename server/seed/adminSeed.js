require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@nutricare.com" });
    
    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit();
    }

    // Create admin user
    await User.create({
      name: "Admin",
      email: "admin@nutricare.com",
      password: "admin123", // Will be hashed by User model pre-save hook
      role: "admin",
      // Provide defaults for required fields even if admin doesn't need them
      age: 30,
      weight: 70,
      height: 170,
      gender: "male",
      activityLevel: "moderate"
    });

    console.log("Admin seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
