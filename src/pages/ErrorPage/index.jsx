import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { EmojiFrownFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

export default function ErrorPage({ args }) {
    const location = useLocation();
    const navigate = useNavigate();

    ErrorPage.propTypes = {
        args: PropTypes.any,
    }

    const errorStatus = args?.status || location.state?.errorInfo?.status || "Unknown";
    const errorText = args?.message || location.state?.errorInfo?.message || "There was an error but we cannot identify what kind of error it was.";
    const errorCode = args?.code || location.state?.errorInfo?.code || "";

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
                                { errorCode ? <Card.Text><em>Code: {errorCode}</em></Card.Text> : null}
                                <Card.Text>
                                    {errorText}
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
