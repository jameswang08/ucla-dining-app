const mongoose = require('mongoose');
const UserModel = require('./users');
const TruckModel = require('./trucks');

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
reviewSchema.statics.getReviewById = async function (id) {
  return await this.findById(id);
};
reviewSchema.statics.createReview = async function (userId, truckId, breakfast, lunch, dinner, lateNight) {
  let review = await this.create({
    userId: userId,
    truckId: truckId,
    reviews: {
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      lateNight: lateNight,
    },
  });
  let user = await UserModel.getUserById(userId);
  user.addReview(review._id);
  let truck = await TruckModel.getTruckById(truckId);
  truck.addReview(review._id);
  return review;
}

// Model
let Review = module.exports = mongoose.model('Review', reviewSchema, 'reviews');
