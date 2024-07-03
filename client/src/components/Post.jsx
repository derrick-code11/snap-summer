/* eslint-disable react/prop-types */
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { deletePost, likePost } from "../reducers/posts";
import { useDispatch } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";

const Post = ({ post, setCurrentId, setPostDeleted }) => {
  const dispatch = useDispatch();
  const [localLikeCount, setLocalLikeCount] = useState(post.likeCount);

  useEffect(() => {
    setLocalLikeCount(post.likeCount);
  }, [post.likeCount]);

  const handleDelete = async () => {
    await dispatch(deletePost(post._id));
    setPostDeleted(true);
  };

  const handleLikeCount = async () => {
    await dispatch(likePost(post._id));
    setLocalLikeCount((prev) => prev + 1);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
        }}
        image={post.selectedFile}
        title={post.title}
      ></CardMedia>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "15px",
          color: "white",
        }}
      >
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      >
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <Typography variant="body2" sx={{color: "#3270C0"}}>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        sx={{
          padding: "0 16px",
        }}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button size="small" color="primary" onClick={handleLikeCount}>
          <FavoriteIcon
            fontSize="small"
            sx={{ mr: 1, color: "red" }}
          ></FavoriteIcon>
          {localLikeCount}
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
          <DeleteIcon fontSize="small"></DeleteIcon>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
