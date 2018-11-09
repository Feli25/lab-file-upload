const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  content: String,
  _creatorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  // picPath: String,
  // picName: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;