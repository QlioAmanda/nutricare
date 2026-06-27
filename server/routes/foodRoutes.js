const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const { protect, admin } = require("../middleware/auth");

// @desc    Get all foods (search supported)
// @route   GET /api/foods?search=keyword
// @access  Public
router.get("/", async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};

    const foods = await Food.find(keyword).limit(50);
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a food
// @route   POST /api/foods
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, calories, protein, carbs, fat } = req.body;

  try {
    const foodExists = await Food.findOne({ name });
    if (foodExists) {
      return res.status(400).json({ message: "Food already exists" });
    }

    const food = await Food.create({
      name,
      calories,
      protein,
      carbs,
      fat,
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a food
// @route   PUT /api/foods/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  const { name, calories, protein, carbs, fat } = req.body;

  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      food.name = name || food.name;
      food.calories = calories || food.calories;
      food.protein = protein || food.protein;
      food.carbs = carbs || food.carbs;
      food.fat = fat || food.fat;

      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a food
// @route   DELETE /api/foods/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      await food.deleteOne();
      res.json({ message: "Food removed" });
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
