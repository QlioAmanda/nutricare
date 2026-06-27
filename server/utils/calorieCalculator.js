/**
 * Calorie Calculator Utility
 * Formula: Mifflin-St Jeor
 *
 * BMR (Male)   = (10 × weight) + (6.25 × height) − (5 × age) + 5
 * BMR (Female) = (10 × weight) + (6.25 × height) − (5 × age) − 161
 *
 * TDEE = BMR × activity factor
 */

const ACTIVITY_FACTORS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor formula
 * @param {number} weight - Body weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - "male" or "female"
 * @returns {number} BMR in kcal/day
 */
const calculateBMR = (weight, height, age, gender) => {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
};

/**
 * Calculate Total Daily Energy Expenditure
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - one of: sedentary, light, moderate, active, very_active
 * @returns {number} TDEE in kcal/day (rounded)
 */
const calculateTDEE = (bmr, activityLevel) => {
  const factor = ACTIVITY_FACTORS[activityLevel] || ACTIVITY_FACTORS.sedentary;
  return Math.round(bmr * factor);
};

/**
 * Get full calorie target from user profile data
 * @param {Object} user - User document with weight, height, age, gender, activityLevel
 * @returns {{ bmr: number, tdee: number }}
 */
const getCalorieTarget = (user) => {
  const bmr = calculateBMR(user.weight, user.height, user.age, user.gender);
  const tdee = calculateTDEE(bmr, user.activityLevel);
  return { bmr: Math.round(bmr), tdee };
};

module.exports = { calculateBMR, calculateTDEE, getCalorieTarget };
