import { Container } from "@mui/material";
import Background from "./Background.jsx";
import Navbar from "./Navbar.jsx";
import Feed from "./Feed.jsx";

const Dashbord = () => {
  return (
    <>
      <Background></Background>
      <Container maxWidth="lg">
        <Navbar></Navbar>
        <Feed></Feed>
      </Container>
    </>
  );
};

export default Dashbord;
