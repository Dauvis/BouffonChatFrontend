import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import NavHeader from "../../components/NavHeader";

export default function TemplatePage() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/main");
  };

  const navIcon = ( <XLg /> );

  return (
    <>
      <NavHeader icon={navIcon} callBack={() => goToMainPage()} />
      <main>
        <Container>
          <Row>
            <Col>
            <h1>Welcome to the Templates page</h1>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
