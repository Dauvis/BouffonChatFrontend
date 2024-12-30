import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function ErrorPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const errorStatus = location.state?.errorStatus;

    const goToMainPage = () => {
      navigate("/main");
    };
  
    return (
        <>        
            <Container>
                <Row>
                    <Col>
                        <h1>Error {errorStatus || 'Unknown'}</h1>
                        <p>Something went wrong. Please try again later.</p>            
                        <Button variant="secondary" onClick={goToMainPage}>Return to app</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
