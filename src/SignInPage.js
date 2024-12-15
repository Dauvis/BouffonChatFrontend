import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log("Authenticating user...");

    const isAuthenticated = true;

    if (isAuthenticated) {
      localStorage.setItem("lock", 'key');
      console.log("User authenticated, navigating to main page...");
      navigate('/main');
    } else {
      console.log("User authentication failed");
    }
  };

  return (
    <div>
      <h2>Sign-In Page</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignInPage;
