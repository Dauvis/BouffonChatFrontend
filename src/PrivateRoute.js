import apiUtil from "./util/apiUtil.js";
import { useLocation, Navigate } from 'react-router'

export default function PrivateRoute({ children }) {
  const isAuthenticated = apiUtil.isAuthenticated();
  const location = useLocation();

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
