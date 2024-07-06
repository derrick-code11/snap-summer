import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Dashbord from "./components/Dashbord.jsx";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashbord />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// {
//    <BgImg></BgImg>
//       <Container maxWidth="lg">
//         <Navbar></Navbar>
//         <Feed></Feed>
//       </Container>
// }
