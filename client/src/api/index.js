import axios from "axios";
const url = "https://snap-summer-d53ae387f53b.herokuapp.com/api/v1/posts";
const token = localStorage.getItem("token");

export const fetchPosts = () =>
  axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchPostById = (id) =>
  axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createPost = (newPost) =>
  axios.post(url, newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePost = (id) =>
  axios.delete(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const likePost = (id) =>
  axios.patch(`${url}/${id}/likePost`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addCommentToPost = (id, comment) =>
  axios.post(
    `${url}/${id}/comment`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteCommentToPost = (id, commentId) =>
  axios.delete(`${url}/${id}/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
