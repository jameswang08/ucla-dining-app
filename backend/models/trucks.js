const mongoose = require('mongoose');

// Schema
let truckSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  blurb: { type: String, required: true },
  image: { type: String, default: null }, // placeholder for now
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

// Model
let Truck = module.exports = mongoose.model('Truck', truckSchema, 'trucks');
module.exports.getTruckById = async function (id) {
  return await Truck.findById(id);
};
module.exports.getTruckByName = async function (name) {
  return await Truck.find({ name: name });
};
