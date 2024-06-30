import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { addPost } from "../reducers/posts";

import { TextField, Typography, Paper, Button } from "@mui/material";

const Form = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts.items);
  // const postStatus = useSelector((state) => state.posts.status);
  // const error = useSelector((state) => state.posts.error);

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(postData));
  };

  const clear = () => {
    console.log("clear");
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostData({ ...postData, selectedFile: base64 });
  };

  return (
    <>
      <Paper
        sx={{
          padding: theme.spacing(2),
          "& .MuiTextField-root": {
            margin: theme.spacing(1),
          },
        }}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h6">
            Share your summer experiences
          </Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          ></TextField>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></TextField>

          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></TextField>

          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          ></TextField>
          <div style={{ width: "97%", margin: "10px 0" }}>
            <input
              type="file"
              label="Image"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <Button
            sx={{
              marginBottom: 2,
            }}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            size="large"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onSubmit={clear}
            color="error"
            fullWidth
            size="medium"
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
