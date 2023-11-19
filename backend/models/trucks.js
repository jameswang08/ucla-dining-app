const mongoose = require('mongoose');

// Schema
var truckSchema = mongoose.Schema({
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
var Truck = module.exports = mongoose.model('Truck', truckSchema, 'trucks');
module.exports.getTruckById = function (id, callback) {
  Truck.findById(id, callback);
};
module.exports.getTruckByName = function (name, callback) {
  Truck.find({ name: name }, callback);
};
