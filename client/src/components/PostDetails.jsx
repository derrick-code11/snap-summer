import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById, addComment, deleteComment } from "../reducers/posts";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Navbar from "./Navbar";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const handleAddComment = () => {
    if (comment.trim()) {
      dispatch(addComment({ postId: id, comment }));
      setComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ postId: id, commentId }));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container sx={{ paddingBottom: "20px" }}>
        <Box sx={{ margin: "20px 0" }}>
          <Typography
            variant="h4"
            gutterBottom
            fontSize={40}
            textAlign="center"
            fontFamily="Helvetica Neue"
          >
            🌞 {post.title} 📸
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={`${tag}`}
                variant="outlined"
                sx={{
                  margin: 0.5,
                  backgroundColor: "#e3f2fd",
                  color: "#0d47a1",
                  fontWeight: "bold",
                }}
              />
            ))}
          </Box>
          <img
            src={post.selectedFile}
            alt={post.title}
            style={{
              width: "70%",
              height: "100%",
              objectFit: "cover",
              margin: "20px auto",
              display: "block",
              borderRadius: "10px",
            }}
          />
          <Typography variant="body1" textAlign="center" gutterBottom>
            🌅✨ {post.message} 🌅✨
          </Typography>
        </Box>

        <Box sx={{ margin: "20px 0" }}>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          {post.comments.map((comment) => (
            <Card
              key={comment._id}
              sx={{
                marginBottom: "10px",
                position: "relative",
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "#3f51b5" }}>
                    {comment.user?.firstName.charAt(0)}
                  </Avatar>
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography variant="body2" color="textSecondary">
                      {comment.user?.firstName} {comment.user?.lastName}{" "}
                      {comment.user?.firstName === user?.firstName ? "(me)" : ""}{" "}
                      - {moment(comment.createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{comment.text}</Typography>
                  </Box>
                </Box>
              </CardContent>
              {post.creator === user?.firstName && (
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    display: "block",
                  }}
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Card>
          ))}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <TextField
              width="500px"
              fullWidth
              label="Add a comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ marginRight: "10px", marginBottom: "20px" }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginBottom: "20px" }}
            >
              Comment
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PostDetails;
