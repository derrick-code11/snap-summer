/* eslint-disable no-unused-vars */
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/auth";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const GoogleLoginButton = ({ buttonText }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const onSuccess = async (response) => {
    try {
      const result = await axios.post(
        "https://snap-summer-d53ae387f53b.herokuapp.com/api/v1/auth/google",
        {
          token: response.credential,
        }
      );
      localStorage.setItem("token", result.data.token);
      const user = result.data.user;
      dispatch(setUser(user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const onError = (response) => {
    console.error("Google sign-in failed:", response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
