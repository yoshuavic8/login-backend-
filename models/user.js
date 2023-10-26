// userModel.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secret: String // Add any additional fields you need
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
