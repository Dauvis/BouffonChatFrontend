import React from 'react';
import { useLocation, Navigate } from 'react-router'

const PrivateRoute = (props) => {
    const { children } = props
    const isLoggedIn = localStorage.getItem('lock') === 'key';
    const location = useLocation()
  
    return isLoggedIn ? (
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/sign-in"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

export default PrivateRoute;