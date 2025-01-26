import { Alert, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default function LoadingWait({text}) {
    LoadingWait.propTypes = {
        text: PropTypes.string
    }
    
    return (
        <Alert variant="light" className="text-center">{text} <Spinner animation="border" size="sm" /></Alert>
    );
}