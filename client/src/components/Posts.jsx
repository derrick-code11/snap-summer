/* eslint-disable react/prop-types */
import Post from "./Post.jsx";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Posts = ({ setCurrentId, setPostDeleted }) => {
  const posts = useSelector((state) => state.posts.items);
  const theme = useTheme();

  return !posts.length ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid
      container
      alignItems="stretch"
      spacing={2}
      sx={{
        display: "flex",
        alignItems: "center",
        margin: theme.spacing(1),
        textAlign: "center",
      }}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} setPostDeleted={setPostDeleted}></Post>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
