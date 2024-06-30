import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import Posts from "./components/Posts.jsx";
import Form from "./components/Form";
import logo from "./images/camera.png";
import "./index.css";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <AppBar
          sx={{
            borderRadius: 15,
            margin: "30px 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          position="static"
          color="inherit"
        >
          <Typography
            sx={{
              color: "rgba(25,25,112, 0.6)",
            }}
            variant="h2"
            align="center"
          >
            SnapSummer
          </Typography>
          <img
            style={{
              marginLeft: "20px",
            }}
            src={logo}
            alt="app logo"
            height={60}
          ></img>
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts></Posts>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form></Form>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default App;
