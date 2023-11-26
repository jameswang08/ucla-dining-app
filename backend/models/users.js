const mongoose = require('mongoose');

// Schema
let userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
userSchema.methods.addReview = async function (reviewId) {
  this.reviews.push(reviewId);
  await this.save();
};
userSchema.statics.getUserById = async function (id) {
  return await this.findById(id);
};
userSchema.statics.getUserByName = async function (username) {
  return await this.findOne({ username: username });
};
userSchema.statics.getUserByEmail = async function (email) {
  return await this.findOne({ email: email });
};
userSchema.statics.createUser = async function (username, email, password) {
  return await this.create({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
}

// Model
let User = module.exports = mongoose.model('User', userSchema, 'users');
