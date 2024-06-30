import Post from "./Post.jsx";
import { useSelector } from "react-redux";

const Posts = () => {
  const posts = useSelector((state) => state.posts.items);
  console.log(posts)
  return (
    <>
      <h1>POSTS</h1>
      <Post></Post>
      <Post></Post>
    </>
  );
};

export default Posts;
