import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function ErrorHandler({errorInfo, redirect = true, variant="danger"}) {

    if (redirect) {
        return (<Navigate to={errorInfo.redirect} replace state={errorInfo}/>);
    } else {
        return (<Alert variant={variant} className="text-center">{errorInfo.args.message}</Alert>);
    }
}