const mongoose = require('mongoose');

// Schemas
var truckSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  blurb: { type: String, required: true },
  image: { type: <Image />, default: null },  // placeholder for now
  ratingSum: { type: Number, default: 0 },  // will need be divided by reviews.length to get average, is this good practice or should we use .aggregate()?
  reviews: [Number]  // review ids
});

// Model
var Truck = module.exports = mongoose.model('Truck', truckSchema, 'trucks');
module.exports.getTruckById = function (id, callback) {
  Truck.find({ _id: id }, callback);
}
module.exports.getTruckByName = function (name, callback) {
  Truck.find({ name: name }, callback);
}