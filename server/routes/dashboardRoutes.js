const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getCalorieTarget } = require("../utils/calorieCalculator");

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
router.get("/summary", protect, async (req, res) => {
  try {
    const user = req.user;
    const { bmr, tdee } = getCalorieTarget(user);

    // consumed & macros will be replaced with real FoodLog aggregation
    // once the tracker feature is wired in this sprint.
    res.json({
      calories: {
        consumed: 0,
        target: tdee,
      },
      macros: {
        protein: 0,
        carbs: 0,
        fat: 0,
      },
      bmr,
      tdee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
