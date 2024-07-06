import {
  AppBar,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../images/camera.png";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // work on this later (if necessary)
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        padding: isSmallScreen ? "10px 20px" : "10px 40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%"
      }}
      position="relative"
      color="inherit"
    >
      <Grid container alignItems="center">
        <Grid item>
          <img
            style={{
              marginRight: "10px",
            }}
            src={logo}
            alt="app logo"
            height={40}
          />
        </Grid>
        <Grid item>
          <Typography
            sx={{
              color: "#8076a3",
              fontWeight: "bold",
            }}
            variant={isSmallScreen ? "h5" : "h4"}
          >
            SnapSummer
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          backgroundColor: "#4888F4",
          color: "white",
          "&:hover": {
            backgroundColor: "#356BB2",
          },
        }}
      >
        Logout
      </Button>
    </AppBar>
  );
};

export default Navbar;
