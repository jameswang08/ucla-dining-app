const mongoose = require('mongoose');

// Schema
var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // should we add a minLength? questionable nonetheless
  reputation: { type: Number, default: 0 },
  favorite: { type: String, default: null },
  reviews: [mongoose.Types.ObjectId],
});
userSchema.methods.sortReviewsByPopularity = function () {
  return mongoose.collection('reviews').aggregate([{
    $match: {
      _id: { $in: this.reviews },
    },
    $sort: {
      'meta.likes': -1,
    },
  }]);
};
userSchema.methods.sortReviewsByDate = function () {
  return mongoose.collection('reviews').aggregate([{
    $match: {
      _id: { $in: this.reviews },
    },
    $sort: {
      'meta.date': -1,
    },
  }]);
};

// Model
var User = module.exports = mongoose.model('User', userSchema, 'users');
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};
module.exports.getUserByName = function (username, callback) {
  User.find({ username: username }, callback);
};
module.exports.getUserByEmail = function (email, callback) {
  User.find({ email: email }, callback);
};
