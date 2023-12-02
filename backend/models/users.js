const mongoose = require("mongoose");

// Schema
let userSchema = mongoose.Schema({
  name: {
    first: { type: String, default: null },
    last: { type: String, default: null },
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true },
  reputation: { type: Number, default: 0 },
  favorite: { type: String, default: null },
  reviews: [mongoose.Types.ObjectId],
});
userSchema.methods.sortReviewsByPopularity = async function () {
  return await mongoose.model("Review")
    .aggregate([
      { $match: { _id: { $in: this.reviews } } },
      { $sort: { "meta.likes": -1 } },
    ])
    .toArray();
};
userSchema.methods.sortReviewsByDate = async function () {
  return await mongoose.model("Review")
    .aggregate([
      { $match: { _id: { $in: this.reviews } } },
      { $sort: { "meta.date": -1 } },
    ])
    .toArray();
};
userSchema.methods.addReview = async function (reviewId) {
  this.reviews.push(reviewId);
  await this.save();
};
userSchema.methods.setFavorite = async function (favorite) {
  this.favorite = favorite;
  await this.save();
};
userSchema.statics.getUserById = async function (id) {
  return await this.findById(id);
};
userSchema.statics.getUserByUsername = async function (username) {
  return await this.findOne({ username: username }).lean();
};
userSchema.statics.getUserByEmail = async function (email) {
  return await this.findOne({ email: email });
};
userSchema.statics.createUser = async function (
  firstname,
  lastname,
  username,
  email,
  password
) {
  return await this.create({
    name: {
      first: firstname,
      last: lastname,
    },
    username: username,
    email: email,
    password: password,
  });
};

// Model
let User = (module.exports = mongoose.model("User", userSchema, "users"));
