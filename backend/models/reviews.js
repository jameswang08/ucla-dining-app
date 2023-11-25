const mongoose = require('mongoose');

// Schema
let mealReviewSchema = mongoose.Schema({
  waitTime: { type: Number, default: null },
  rating: { type: Number, default: null },
  review: { type: String, default: null },
});
let reviewSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  truckId: { type: mongoose.Types.ObjectId, required: true },
  reviews: {
    breakfast: { type: mealReviewSchema, default: null },
    lunch: { type: mealReviewSchema, default: null },
    dinner: { type: mealReviewSchema, default: null },
    lateNight: { type: mealReviewSchema, default: null },
  },
  meta: {
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
  },
});

// Model
let Review = module.exports = mongoose.model('Review', reviewSchema, 'reviews');
module.exports.getReviewById = async function (id) {
  return await Review.findById(id);
};
