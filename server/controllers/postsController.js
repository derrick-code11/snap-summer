import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/User.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const newPostMessage = new PostMessage({
      ...post,
      creator: user.firstName,
      createdAt: new Date().toISOString(),
    });

    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateOldPost = async (req, res) => {
  const { id } = req.params;
  const { title, message, selectedFile, tags } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = await PostMessage.findById(id);
    const user = await User.findById(userId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (userId !== String(user._id)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this post" });
    }

    const updatedPost = { title, message, tags, selectedFile, _id: id };

    const result = await PostMessage.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  try {
    const post = await PostMessage.findById(id);
    const user = await User.findById(userId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (userId !== String(user._id)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this post" });
    }

    await PostMessage.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  console.log(id, userId);

  if (!userId) return res.status(401).json({ message: "Unauthenticated" });

  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(userId));

    if (index === -1) {
      post.likes.push(userId);
      post.likeCount++;
    } else {
      post.likes = post.likes.filter((id) => id !== String(userId));
      post.likeCount--;
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
