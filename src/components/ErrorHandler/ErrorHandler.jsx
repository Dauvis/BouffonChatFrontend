import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function ErrorHandler({errorResponse = null, redirect = true, message = "", status = 0, code = "", variant="danger"}) {
    let errMessage = message || errorResponse?.body.message;
    let errStatus = status || errorResponse?.status;
    let errCode = code || errorResponse?.body.errorCode;
    

    if (redirect) {
        const destination = errStatus === 401 ? "/sign-in" : "/error";
        const state = errStatus === 401 ? null : 
            { 
                errorStatus: errStatus, 
                errorText: errMessage,
                errorCode: errCode
            };

        return (<Navigate to={destination} replace state={state}/>);
    } else {
        return (<Alert variant={variant} className="text-center">{errMessage}</Alert>);
    }
}