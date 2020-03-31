const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: ObjectId,
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

module.exports = mongoose.model('Comment', commentSchema);