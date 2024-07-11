// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  details: { type: Object, required: true },
//   location: String,
//   blog: String,
//   bio: String,
//   public_repos: Number,
//   public_gists: Number,
//   followers: Number,
//   following: Number,
//   created_at: Date,
//   updated_at: Date,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
