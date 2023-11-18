const mongoose = require('mongoose');

// Schema
var mealReviewSchema = mongoose.Schema({
  waitTime: { type: Number, default: null },
  rating: { type: Number, default: null },
  review: { type: String, default: null }
});
var reviewSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true, unique: true },
  username: { type: String, required: true },
  reviews: {
    breakfast: { type: mealReviewSchema, default: null },
    lunch: { type: mealReviewSchema, default: null },
    dinner: { type: mealReviewSchema, default: null },
    lateNight: { type: mealReviewSchema, default: null },
  },
  meta: {
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
  }
});

// Model
var Review = module.exports = mongoose.model('Review', reviewSchema, 'reviews');
module.exports.getReviewById = function (id, callback) {
  Review.find({ _id: id }, callback);
}