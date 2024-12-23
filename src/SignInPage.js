import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import loginService from "./services/loginService.js";

const SignInPage = () => {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    const idToken = response.credential;
    const authData = await loginService.logIntoAPI(idToken);

    if (authData) {
      sessionStorage.setItem("key", authData.token);
      sessionStorage.setItem("profile", JSON.stringify(authData.profile));
      navigate('/main');
    } else {
      sessionStorage.removeItem('key');
      sessionStorage.removeItem('profile');
  }

    // Send token or handle login success
  };

  const onError = () => {
    console.error('Login Failed');
    navigate('/error', { state: { errorStatus: 401 } });
  };

  return (
    <div>
      <h2>Sign-In Page</h2>
      <GoogleOAuthProvider clientId="34128132067-0eqsetdv86b2efmmec131p7b8uvf0g8u.apps.googleusercontent.com">
        <GoogleLogin
         onSuccess={onSuccess}
         onError={onError}
       />
     </GoogleOAuthProvider>      
    </div>
  );
};

export default SignInPage;
