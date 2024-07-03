import { AppBar, Typography } from "@mui/material";
import logo from "../images/camera.png";
const Navbar = () => {
  return (
    <>
      <AppBar
        sx={{
          borderRadius: 15,
          marginBottom: "20px",
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
    </>
  );
};

export default Navbar;
