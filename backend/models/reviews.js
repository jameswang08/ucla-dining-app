const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
const reviewSchema = new Schema({
  username: { type: String, required: true },
  truckname: { type: String, required: true },
  meal: { type: String, required: true },
  waitTime: { type: Number, default: null },
  rating: { type: Number, default: null },
  review: { type: String, default: null },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});
reviewSchema.methods.addLike = async function () {
  this.likes++;
  await this.save();
};
reviewSchema.methods.removeLike = async function () {
  this.likes--;
  await this.save();
};
reviewSchema.statics.getReviewById = async function (id) {
  return await this.findById(id);
};
reviewSchema.statics.createReview = async function (username, truckname, meal, waitTime, rating, review) {
  let newReview = await this.create({
    username: username,
    truckname: truckname,
    meal: meal,
    waitTime: waitTime,
    rating: rating,
    review: review,
  });
  let user = await mongoose.model('User').getUserByUsername(username);
  user.addReview(newReview._id);
  let truck = await mongoose.model('Truck').getTruckByName(truckname);
  truck.addReview(newReview._id);
  return newReview;
};

// Model
module.exports = mongoose.model('Review', reviewSchema, "reviews");
