const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const FoodLog = require("../models/FoodLog");
const Food = require("../models/Food");

// @desc    Add food to daily log
// @route   POST /api/tracker
// @access  Private
router.post("/", protect, async (req, res) => {
  const { foodId, quantity, date } = req.body;

  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const log = await FoodLog.create({
      userId: req.user._id,
      foodId,
      quantity: quantity || 1,
      date: date || new Date().toISOString().split("T")[0],
    });

    // Return log with food details populated
    const populated = await FoodLog.findById(log._id).populate("foodId");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get food logs for a specific date
// @route   GET /api/tracker?date=YYYY-MM-DD
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];

    const logs = await FoodLog.find({
      userId: req.user._id,
      date,
    }).populate("foodId");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get food log history grouped by date
// @route   GET /api/tracker/history
// @access  Private
router.get("/history", protect, async (req, res) => {
  try {
    const logs = await FoodLog.find({ userId: req.user._id })
      .populate("foodId")
      .sort({ date: -1 });

    // Group logs by date
    const history = logs.reduce((acc, log) => {
      const date = log.date;
      if (!acc[date]) {
        acc[date] = {
          date,
          totalCalories: 0,
          foods: [],
        };
      }

      const calories = log.foodId ? log.foodId.calories * log.quantity : 0;
      acc[date].totalCalories += calories;
      
      acc[date].foods.push({
        _id: log._id,
        foodName: log.foodId?.name || "Unknown",
        quantity: log.quantity,
        calories: Math.round(calories),
      });

      return acc;
    }, {});

    // Convert object to array and return
    res.json(Object.values(history));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a food log entry
// @route   DELETE /api/tracker/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const log = await FoodLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    if (log.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await log.deleteOne();
    res.json({ message: "Log removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
