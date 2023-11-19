const mongoose = require('mongoose');

// Schemas
var truckSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  blurb: { type: String, required: true },
  image: { type: String, default: null }, // placeholder for now
  reviews: [mongoose.Types.ObjectId],
});

// Model
var Truck = module.exports = mongoose.model('Truck', truckSchema, 'trucks');
module.exports.getTruckById = function (id, callback) {
  Truck.find({ _id: id }, callback);
};
module.exports.getTruckByName = function (name, callback) {
  Truck.find({ name: name }, callback);
};
