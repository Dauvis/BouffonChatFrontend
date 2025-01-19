import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { EmojiFrownFill } from "react-bootstrap-icons";

export default function ErrorPage({status, message, code}) {
    const location = useLocation();
    const navigate = useNavigate();

    const errorStatus = status || location.state?.errorStatus || "Unknown";
    const errorText = message || location.state?.errorText || "There was an error but we cannot tell what kind of error it was.";
    const errorCode = code || location.state?.errorCode || "";

    function goToMainPage() {
        navigate("/main");
    };

    function goToSignin() {
        navigate("/sign-in");
    }

    return (
        <>
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row>
                    <Col>
                        <Card className="bg-body-tertiary">
                            <Card.Body>
                                <Card.Title>Error: {errorStatus} <EmojiFrownFill color="darkgreen" /></Card.Title>
                                <Card.Text>
                                    {errorCode ? <p><em>Code: {errorCode}</em></p> : null}
                                    <p>{errorText}</p>
                                </Card.Text>
                                <Button variant="secondary" onClick={goToMainPage} style={{ marginRight: "0.5rem"}}>Return to app</Button>
                                <Button variant="secondary" onClick={goToSignin}>Sign into app</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
