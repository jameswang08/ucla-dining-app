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
  favorite: { type: String, default: "None" },
  reviews: [mongoose.Types.ObjectId],
  likes: [mongoose.Types.ObjectId],
});
userSchema.methods.sortReviewsByPopularity = async function () {
  return await mongoose.model("Review")
    .aggregate([
      { $match: { _id: { $in: this.reviews } } },
      { $sort: { "likes": -1 } },
    ]);
};
userSchema.methods.sortReviewsByDate = async function () {
  return await mongoose.model("Review")
    .aggregate([
      { $match: { _id: { $in: this.reviews } } },
      { $sort: { "date": -1 } },
    ]);
};
userSchema.methods.addReview = async function (reviewId) {
  this.reviews.push(reviewId);
  this.reputation += 10;
  await this.save();
};
userSchema.methods.setFavorite = async function (favorite) {
  this.favorite = favorite;
  await this.save();
};
userSchema.methods.toggleLike = async function (reviewId) {
  // exit if own review
  let review = await mongoose.model('Review').getReviewById(reviewId);
  if (review.userId.equals(this._id))
    return false;
  // check if liked before
  let liked = false;
  for (let i = 0; i < this.likes.length; i++)
    if (this.likes[i].equals(reviewId)) {
      liked = true;
      break;
    }
  // if liked, remove like
  if (liked) {
    this.likes.splice(this.likes.indexOf(reviewId));
    this.reputation -= 1;
    await this.save();
    review.removeLike();
    return false;
  }
  // otherwise, add like
  else {
    this.likes.push(reviewId);
    this.reputation += 1;
    await this.save();
    review.addLike();
    return true;
  }
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
