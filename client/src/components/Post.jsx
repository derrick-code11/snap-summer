/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { deletePost, likePost } from "../reducers/posts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";

const Post = ({ post, setCurrentId, setPostDeleted }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [localLikeCount, setLocalLikeCount] = useState(post.likes.length);

  useEffect(() => {
    setLocalLikeCount(post.likes.length);
  }, [post.likes, user?._id]);

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    setPostDeleted(true);
  };

  const handleLikeCount = async () => {
    const updatedPost = await dispatch(likePost(post._id)).unwrap();
    setLocalLikeCount(updatedPost.likes.length);
  };

  const handleCardClick = () => {
    navigate(`/posts/${post._id}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
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
      <Box sx={{ cursor: "pointer" }}>
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
        {user?.firstName === post.creator && (
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
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2" sx={{ color: "#3270C0" }}>
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
          onClick={handleCardClick}
        >
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {truncateText(post.message, 150)}
          </Typography>
        </CardContent>
      </Box>

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
        {user?.firstName === post.creator && (
          <Button size="small" color="primary" onClick={handleDelete}>
            <DeleteIcon fontSize="small"></DeleteIcon>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
