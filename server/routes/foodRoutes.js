const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// @desc    Get all foods (search supported)
// @route   GET /api/foods?search=keyword
// @access  Public
router.get("/", async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};

    const foods = await Food.find(keyword).limit(20);
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
