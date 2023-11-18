var mongoose = require('mongoose');

// Schemas
var userSchema = mongoose.Schema({
  id:         { type: Number, required: true, unique: true },
  username:   { type: String, required: true, unique: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },  // should we add a minLength? questionable nonetheless
  reputation: { type: String, default: 0 },
  favorite:   { type: String, default: null },
  reviews:    [Number]  // review ids
});

// Model
var User = module.exports = mongoose.model('User', userSchema, 'users');
module.exports.getUserById = function (id, callback) {
  User.find({ id: id }, callback);
}
module.exports.getUserByName = function(username, callback) {
  User.find({ username: username }, callback);
}
module.exports.getUserByEmail = function (email, callback) {
  User.find({ email: email }, callback);
}