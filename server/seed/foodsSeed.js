require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Food = require("../models/Food");

const foods = [
  // Nasi & Karbohidrat
  { name: "Nasi Putih", calories: 175, protein: 3, carbs: 40, fat: 0.3 },
  { name: "Nasi Merah", calories: 149, protein: 3, carbs: 32, fat: 0.8 },
  { name: "Mie Goreng", calories: 290, protein: 6, carbs: 38, fat: 13 },
  { name: "Mie Rebus", calories: 210, protein: 5, carbs: 35, fat: 5 },
  { name: "Roti Tawar", calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  { name: "Kentang Rebus", calories: 87, protein: 1.9, carbs: 20, fat: 0.1 },
  { name: "Singkong Rebus", calories: 154, protein: 0.7, carbs: 37, fat: 0.3 },
  { name: "Oatmeal", calories: 389, protein: 17, carbs: 66, fat: 7 },

  // Protein Hewani
  { name: "Telur", calories: 155, protein: 13, carbs: 1, fat: 11 },
  { name: "Telur Rebus", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: "Dada Ayam", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Ayam Goreng", calories: 260, protein: 27, carbs: 10, fat: 14 },
  { name: "Ikan Salmon", calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: "Ikan Tuna", calories: 132, protein: 28, carbs: 0, fat: 1.3 },
  { name: "Ikan Bandeng", calories: 148, protein: 20, carbs: 0, fat: 7 },
  { name: "Udang", calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  { name: "Daging Sapi", calories: 250, protein: 26, carbs: 0, fat: 15 },

  // Protein Nabati
  { name: "Tempe", calories: 193, protein: 19, carbs: 9, fat: 11 },
  { name: "Tahu", calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },
  { name: "Kacang Tanah", calories: 567, protein: 26, carbs: 16, fat: 49 },
  { name: "Edamame", calories: 122, protein: 12, carbs: 9, fat: 5 },

  // Sayur
  { name: "Bayam", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: "Brokoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: "Kangkung", calories: 19, protein: 2.6, carbs: 3.1, fat: 0.2 },
  { name: "Wortel", calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  { name: "Sawi Hijau", calories: 12, protein: 1.5, carbs: 2.2, fat: 0.2 },

  // Buah
  { name: "Pisang", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { name: "Apel", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { name: "Jeruk", calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  { name: "Semangka", calories: 30, protein: 0.6, carbs: 8, fat: 0.2 },
  { name: "Alpukat", calories: 160, protein: 2, carbs: 9, fat: 15 },
  { name: "Mangga", calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { name: "Pepaya", calories: 43, protein: 0.5, carbs: 11, fat: 0.3 },

  // Minuman & Susu
  { name: "Susu", calories: 103, protein: 8, carbs: 12, fat: 2.4 },
  { name: "Susu Cokelat", calories: 125, protein: 7, carbs: 18, fat: 3 },
  { name: "Yoghurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },

  // Jajanan & Lainnya
  { name: "Nasi Goreng", calories: 270, protein: 8, carbs: 35, fat: 12 },
  { name: "Nasi Padang (Rendang)", calories: 450, protein: 22, carbs: 45, fat: 20 },
  { name: "Bakso", calories: 202, protein: 14, carbs: 11, fat: 11 },
  { name: "Soto Ayam", calories: 120, protein: 10, carbs: 8, fat: 5 },
  { name: "Gado-gado", calories: 180, protein: 8, carbs: 15, fat: 10 },
  { name: "Martabak Telur", calories: 290, protein: 12, carbs: 25, fat: 16 },
];

const seedFoods = async () => {
  try {
    await connectDB();

    await Food.deleteMany();
    console.log("Existing foods cleared.");

    await Food.insertMany(foods);
    console.log(`${foods.length} foods seeded successfully!`);

    process.exit();
  } catch (error) {
    console.error(`Error seeding foods: ${error.message}`);
    process.exit(1);
  }
};

seedFoods();
