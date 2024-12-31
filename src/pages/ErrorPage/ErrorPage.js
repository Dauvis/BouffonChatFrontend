import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { EmojiFrownFill } from "react-bootstrap-icons";

export default function ErrorPage({status, message}) {
    const location = useLocation();
    const navigate = useNavigate();

    const errorStatus = status || location.state?.errorStatus || "Unknown";
    const errorText = message || location.state?.errorText || "There was an error but we cannot tell what kind of error it was."

    const goToMainPage = () => {
        navigate("/main");
    };

    return (
        <>
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row>
                    <Col>
                        <Card className="bg-body-tertiary">
                            <Card.Body>
                                <Card.Title>Error: {errorStatus} <EmojiFrownFill color="darkgreen" /></Card.Title>
                                <Card.Text>{errorText}</Card.Text>
                                <Button variant="secondary" onClick={goToMainPage}>Return to app</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
