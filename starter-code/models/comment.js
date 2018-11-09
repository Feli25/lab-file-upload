const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user')


const commentSchema = Schema({
  content: String,
  _authorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  imagePath: String,
  imageName: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;