import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPosts as fetchPostsAPI,
  createPost as createPostAPI,
} from "../api";

// Define the async thunk for fetching all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPostsAPI();
  return response.data;
});

// Define the async thunk for creating a post
export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await createPostAPI(newPost);
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updatePost: (state, action) => {
      const { id, newContent } = action.payload;
      const existingPost = state.items.find((post) => post.id === id);
      if (existingPost) {
        existingPost.content = newContent;
      }
    },
    deletePost: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((post) => post.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
