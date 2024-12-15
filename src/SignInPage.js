import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignInPage = () => {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log(response);
    localStorage.setItem("lock", 'key');
    navigate('/main');

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
