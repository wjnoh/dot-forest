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
  publishedDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Post', postSchema);