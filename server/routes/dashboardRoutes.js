const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getCalorieTarget } = require("../utils/calorieCalculator");
const FoodLog = require("../models/FoodLog");

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
router.get("/summary", protect, async (req, res) => {
  try {
    const user = req.user;
    const { bmr, tdee } = getCalorieTarget(user);

    // Get today's date string
    const today = new Date().toISOString().split("T")[0];

    // Find all food logs for today, populated with food details
    const logs = await FoodLog.find({
      userId: user._id,
      date: today,
    }).populate("foodId");

    // Aggregate consumed nutrients
    let consumed = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    logs.forEach((log) => {
      if (log.foodId) {
        const qty = log.quantity;
        consumed += log.foodId.calories * qty;
        protein += log.foodId.protein * qty;
        carbs += log.foodId.carbs * qty;
        fat += log.foodId.fat * qty;
      }
    });

    res.json({
      calories: {
        consumed: Math.round(consumed),
        target: tdee,
      },
      macros: {
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
      },
      bmr,
      tdee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

