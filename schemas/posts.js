const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },

  today: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Posts", postsSchema);
