import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation, Navigate } from 'react-router'
import apiUtil from "./util/apiUtil.js";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = apiUtil.isAuthenticated();
      const refreshed = authenticated || await apiUtil.refreshAccess();
      if (refreshed) {
        setIsAuthenticated(true);
      } else {
        navigate('/sign-in');
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/sign-in"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
};

export default PrivateRoute;