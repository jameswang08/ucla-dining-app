const mongoose = require('mongoose');

// Schema
let userSchema = mongoose.Schema({
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
let User = module.exports = mongoose.model('User', userSchema, 'users');
module.exports.getUserById = async function (id) {
  return await User.findById(id);
};
module.exports.getUserByName = async function (username) {
  return await User.find({ username: username });
};
module.exports.getUserByEmail = async function (email) {
  return await User.find({ email: email });
};
