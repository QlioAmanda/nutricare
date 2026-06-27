const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// @desc    Get dashboard summary (Mock Data)
// @route   GET /api/dashboard/summary
// @access  Private
router.get("/summary", protect, (req, res) => {
  // In Sprint 3, this will pull real data from FoodLog and User target.
  // For now, we return mock data as requested.
  res.json({
    calories: {
      consumed: 1800,
      target: 2200,
    },
    macros: {
      protein: 55,
      carbs: 180,
      fat: 45,
    },
  });
});

module.exports = router;
