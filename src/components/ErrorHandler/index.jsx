import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

ErrorHandler.propTypes = {
    errorInfo: PropTypes.any.isRequired,
    redirect: PropTypes.bool,
    variant: PropTypes.string
}

export default function ErrorHandler({errorInfo, redirect = true, variant="danger"}) {
    if (redirect) {
        return (<Navigate to={errorInfo.redirect} replace state={errorInfo}/>);
    } else {
        return (<Alert variant={variant} className="text-center">{errorInfo.args.message}</Alert>);
    }
}