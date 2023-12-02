const mongoose = require('mongoose');

// Schema
let truckSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  blurb: { type: String, required: true },
  image: { type: String, default: null },
  reviews: [mongoose.Types.ObjectId],
});
truckSchema.methods.avgRating = async function () {
  const result = await mongoose.model('Review').aggregate([
    // filters for reviews associated with this truck
    { $match: { _id: { $in: this.reviews } } },
    // focuses document information on reviews (converts reviews to array to prepare for expansion)
    { $project: { reviews: { $objectToArray: '$reviews' } } },
    // expands reviews into meal reviews
    { $unwind: '$reviews' },
    // calculates average of meal ratings, ignoring null meal reviews and null ratings
    { $group: { _id: null, avg: { $avg: '$reviews.v.rating' } } },
  ]);
  return result.length > 0 ? result[0].avg : null;
};
truckSchema.methods.sortReviewsByPopularity = async function () {
  return await mongoose.model('Review').aggregate([
    { $match: { _id: { $in: this.reviews } } },
    { $sort: { 'meta.likes': -1 } },
  ]);
};
truckSchema.methods.sortReviewsByDate = async function () {
  return await mongoose.model('Review').aggregate([
    { $match: { _id: { $in: this.reviews } } },
    { $sort: { 'meta.date': -1 } },
  ]);
};
truckSchema.methods.filterBreakfastReviews = async function () {
  return await mongoose.model('Review').find({
    _id: { $in: this.reviews },
    'reviews.breakfast': { $ne: null },
  });
};
truckSchema.methods.filterLunchReviews = async function () {
  return await mongoose.model('Review').find({
    _id: { $in: this.reviews },
    'reviews.lunch': { $ne: null },
  });
};
truckSchema.methods.filterDinnerReviews = async function () {
  return await mongoose.model('Review').find({
    _id: { $in: this.reviews },
    'reviews.dinner': { $ne: null },
  });
};
truckSchema.methods.filterLateNightReviews = async function () {
  return await mongoose.model('Review').find({
    _id: { $in: this.reviews },
    'reviews.lateNight': { $ne: null },
  });
};
truckSchema.methods.addReview = async function (reviewId) {
  this.reviews.push(reviewId);
  await this.save();
};
truckSchema.statics.getTruckNames = async function (id) {
  const result = await this.aggregate([
    { $group: { _id: null, names: { $push: '$name' } } },
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
let Truck = module.exports = mongoose.model('Truck', truckSchema, 'trucks');
