import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "./reducers/auth.js";
import Home from "./components/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import RequestResetLink from "./components/RequestResetLink.jsx";
import Dashbord from "./components/Dashbord.jsx";
import PostDetails from "./components/PostDetails.jsx";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const user = {
        id: decodedToken.id,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastNameName,
      };
      dispatch(setUser(user));
    }
  }, [dispatch]);
  return (
    <>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-reset" element={<RequestResetLink />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
