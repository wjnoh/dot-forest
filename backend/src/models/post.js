const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Post', postSchema);