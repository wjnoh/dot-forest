const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;
const mongoosePaginate = require('mongoose-paginate-v2');

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
  authorId: {
    type: ObjectId,
    required: true,
  },
  comments: [
    {
      type: ObjectId,
      ref: 'Comment',
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  // T: 상의, O: 원피스, H: 머리 장식, ETC: 기타
  category: {
    type: String,
    enum: ['T', 'O', 'H', 'ETC'],
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

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);