import { Container, Grid, useMediaQuery, useTheme, Grow } from "@mui/material";
import { useState, useEffect } from "react";
import Posts from "./Posts.jsx";
import Form from "./Form.jsx";
import { useDispatch } from "react-redux";

import { fetchPosts } from "../reducers/posts.js";
const Feed = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentId, setCurrentId] = useState(null);
  const [postDeleted, setPostDeleted] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
    if (postDeleted) {
      setPostDeleted(false);
    }
  }, [dispatch, postDeleted, currentId]);

  return (
    <>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            direction={isSmallScreen ? "column-reverse" : "row"}
          >
            <Grid item xs={12} sm={7}>
              <Posts
                setCurrentId={setCurrentId}
                setPostDeleted={setPostDeleted}
              ></Posts>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Feed;
