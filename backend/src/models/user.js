const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean, 
    default: false,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  emailedDate: {
    type: Date,
    default: new Date(),
  },
  likePost: [
    {
      type: ObjectId,
      ref: 'Post',
    },
  ],
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('User', userSchema);
