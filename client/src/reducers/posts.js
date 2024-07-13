import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPosts as fetchPostsAPI,
  createPost as createPostAPI,
  updatePost as updatePostAPI,
  deletePost as deletePostAPI,
  likePost as likePostAPI,
  fetchPostById as fetchPostByIdAPI,
  addCommentToPost as addCommentAPI,
  deleteCommentToPost as deleteCommentAPI,
} from "../api";

// Define the async thunk for fetching all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPostsAPI();
  return response.data;
});

// Define the asyn thunk for fetching only one post
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    const response = await fetchPostByIdAPI(id);
    return response.data;
  }
);

// Define the async thunk for creating a post
export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await createPostAPI(newPost);
  return response.data;
});

// Define the async thunk for updating a post
export const updateOldPost = createAsyncThunk(
  "posts/updateOldPost",
  async ({ id, updatedPost }) => {
    const response = await updatePostAPI(id, updatedPost);
    return response.data;
  }
);

// Define the async thunk for deleting a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await deletePostAPI(id);
  return id;
});

// Define the async thunk for liking a post
export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const response = await likePostAPI(id);
  return response.data;
});

// Define the async thunk for adding a comment
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }) => {
    const response = await addCommentAPI(postId, comment);
    console.log(response.data);
    return response.data;
  }
);

// Define the async thunk for deleting a comment
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId }) => {
    const response = await deleteCommentAPI(postId, commentId);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    post: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
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
      })
      .addCase(updateOldPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOldPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateOldPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.post = action.payload;
      });
  },
});

export default postsSlice.reducer;
