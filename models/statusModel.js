const mongoose = require('mongoose');
const User = require('./userModel');
const statusSchema = new mongoose.Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  create: {
    type: Date,
    default: Date.now(),
  },
  text: String,
  like: {
    type: Number,
    default: 0,
  },
  likePerson: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],

  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
