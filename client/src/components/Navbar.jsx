import {
  AppBar,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/auth";
import logo from "../images/camera.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    dispatch(logout());
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
        width: "100%",
      }}
      position="relative"
      color="inherit"
    >
      <Grid container alignItems="center">
        <Grid item>
          <Link to="/dashboard">
            <img
              style={{
                marginRight: "10px",
              }}
              src={logo}
              alt="app logo"
              height={40}
            />
          </Link>
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
