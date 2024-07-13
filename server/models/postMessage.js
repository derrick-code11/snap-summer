import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user: {
    id: String,
    firstName: String,
    lastName: String,
  },
});

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [String],
    default: [],
  },
  creatorId: String,
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
