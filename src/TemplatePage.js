import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavHeader from "./components/NavHeader";

export default function TemplatePage() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/main");
  };

  return (
    <>
      <NavHeader />
      <main>
        <Container>
          <Row>
            <Col>
            <h1>Welcome to the Templates page</h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <Button variant="primary" onClick={goToMainPage}>Go to Main</Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
