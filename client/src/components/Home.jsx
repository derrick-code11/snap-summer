import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
  return (
    <div className="home-background">
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", color: "ghostwhite" }}
          variant="h2"
          component="h1"
          gutterBottom
        >
          Welcome to SnapSummer
        </Typography>
        <Typography
          sx={{ color: "ghostwhite" }}
          variant="h5"
          component="p"
          gutterBottom
        >
          Capture and share your summer moments with friends!
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            sx={{ backgroundColor: "green", borderRadius: "30px" }}
            variant="contained"
            size="large"
          >
            Login
          </Button>
          <Button
            sx={{ backgroundColor: "#4888F4", borderRadius: "30px" }}
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
