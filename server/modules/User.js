const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
});

module.exports = mongoose.model('User', userSchema);
