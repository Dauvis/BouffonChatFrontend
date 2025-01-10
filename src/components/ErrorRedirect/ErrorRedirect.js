import { Navigate } from "react-router-dom";

export default function ErrorRedirect({errorResponse}) {
    console.log(errorResponse);
    const destination = errorResponse.status === 401 ? "/sign-in" : "/error";
    const state = errorResponse.status === 401 ? null : { errorStatus: errorResponse.status, errorText: errorResponse.body.message };

    return (
        <Navigate to={destination} replace state={state}/>
    );
}