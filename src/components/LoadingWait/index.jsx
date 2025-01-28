import { Alert, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

LoadingWait.propTypes = {
    text: PropTypes.string
}

export default function LoadingWait({text}) {
    return (
        <Alert role="status" aria-live="polite" variant="light" className="text-center">
            {text || "Loading please wait..."} <Spinner animation="border" size="sm" aria-hidden={true}/>
        </Alert>
    );
}