import { Alert, Spinner } from "react-bootstrap";

export default function LoadingWait({text}) {
    return (
        <Alert variant="light" className="text-center">{text} <Spinner animation="border" size="sm" /></Alert>
    );
}