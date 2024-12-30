import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button} from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import NavHeader from "./components/NavHeader";

export default function ProfilePage() {
    const navigate = useNavigate();

    const goToMainPage = () => {
      navigate("/main");
    };

    const navIcon = ( <XLg /> );
  
    return (
        <>
            <NavHeader icon={navIcon} callBack={() => goToMainPage()}/>
            <main>
                <Container>
                    <Row>
                        <Col>
                        <h1>Welcome to the Profile page</h1>
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
