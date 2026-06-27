const mongoose = require("mongoose");

const foodLogSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Food",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FoodLog = mongoose.model("FoodLog", foodLogSchema);

module.exports = FoodLog;
