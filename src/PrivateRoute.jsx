import apiUtil from "./util/apiUtil.js";
import { useLocation, Navigate } from 'react-router'
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
    const isAuthenticated = apiUtil.isAuthenticated();
    const location = useLocation();

    PrivateRoute.propTypes = {
        children: PropTypes.node.isRequired,
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
