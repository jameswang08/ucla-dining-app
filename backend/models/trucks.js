const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
const truckSchema = new Schema({
  name: { type: String, required: true, unique: true },
  blurb: { type: String, required: true },
  image: { type: String, default: null },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  ratingAvg: { type: Number, default: 0 },
  waitTimeAvg: { type: Number, default: 0 },
});
truckSchema.methods.sortReviewsByPopularity = async function () {
  return await mongoose
    .model("Review")
    .aggregate([
      { $match: { _id: { $in: this.reviews } } },
      { $sort: { likes: -1 } },
    ]);
};
truckSchema.methods.sortReviewsByDate = async function () {
  return await mongoose
    .model("Review")
    .aggregate([
      { $match: { _id: { $in: this.reviews } } },
      { $sort: { date: -1 } },
    ]);
};
truckSchema.methods.filterLunchReviews = async function () {
  return await mongoose.model("Review").find({
    _id: { $in: this.reviews },
    meal: "lunch",
  });
};
truckSchema.methods.filterDinnerReviews = async function () {
  return await mongoose.model("Review").find({
    _id: { $in: this.reviews },
    meal: "dinner",
  });
};
truckSchema.methods.filterLateNightReviews = async function () {
  return await mongoose.model("Review").find({
    _id: { $in: this.reviews },
    meal: "lateNight",
  });
};
truckSchema.methods.addReview = async function (reviewId) {
  let review = await mongoose.model('Review').getReviewById(reviewId);
  this.ratingAvg = (this.ratingAvg * this.reviews.length + review.rating) / (this.reviews.length + 1);
  this.waitTimeAvg = (this.waitTimeAvg * this.reviews.length + review.waitTime) / (this.reviews.length + 1);
  this.reviews.push(reviewId);
  await this.save();
};
truckSchema.statics.getTruckNames = async function () {
  const result = await this.aggregate([
    { $group: { _id: null, names: { $push: "$name" } } },
  ]);
  return result.length > 0 ? result[0].names : [];
};
truckSchema.statics.getTruckById = async function (id) {
  return await this.findById(id);
};
truckSchema.statics.getTruckByName = async function (name) {
  return await this.findOne({ name: name });
};
truckSchema.statics.createTruck = async function (name, blurb, image) {
  return await this.create({
    name: name,
    blurb: blurb,
    image: image,
  });
};

// Model
module.exports = mongoose.model('Truck', truckSchema, 'trucks');
