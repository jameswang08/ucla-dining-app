const mongoose = require('mongoose');

// Schema
let truckSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  blurb: { type: String, required: true },
  image: { type: String, default: null },
  reviews: [mongoose.Types.ObjectId],
});
truckSchema.methods.avgRating = function () {
  return mongoose.collection('reviews').aggregate({
    $match: {
      _id: { $in: Truck.reviews },
    },
    $group: {
      avg: { $avg: rating },
    },
  }).avg;
};
truckSchema.methods.sortReviewsByPopularity = function () {
  return mongoose.collection('reviews').aggregate([{
    $match: {
      _id: { $in: this.reviews },
    },
    $sort: {
      'meta.likes': -1,
    },
  }]);
};
truckSchema.methods.sortReviewsByDate = function () {
  return mongoose.collection('reviews').aggregate({
    $match: {
      _id: { $in: this.reviews },
    },
    $sort: {
      'meta.date': -1,
    },
  });
};
truckSchema.methods.filterBreakfastReviews = function () {
  return mongoose.collection('reviews').find({
    _id: { $in: this.reviews },
    'reviews.breakfast': { $ne: null },
  });
};
truckSchema.methods.filterLunchReviews = function () {
  return mongoose.collection('reviews').find({
    _id: { $in: this.reviews },
    'reviews.lunch': { $ne: null },
  });
};
truckSchema.methods.filterDinnerReviews = function () {
  return mongoose.collection('reviews').find({
    _id: { $in: this.reviews },
    'reviews.dinner': { $ne: null },
  });
};
truckSchema.methods.filterLateNightReviews = function () {
  return mongoose.collection('reviews').find({
    _id: { $in: this.reviews },
    'reviews.lateNight': { $ne: null },
  });
};
truckSchema.methods.addReview = async function (reviewId) {
  this.reviews.push(reviewId);
  await this.save();
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
}

// Model
let Truck = module.exports = mongoose.model('Truck', truckSchema, 'trucks');
