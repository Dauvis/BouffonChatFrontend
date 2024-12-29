import { useNavigate } from "react-router-dom";
import loginService from "./services/loginService.js";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import NavHeader from "./components/NavHeader";

export default function MainPage() {
    const navigate = useNavigate();

    const goToPage = (page) => {
        navigate(page);
    }

    const logOutOfApp = async () => {
        await loginService.logOutOfAPI();
        localStorage.removeItem('profile');
        navigate('/sign-in');
    }

    const handleError = (errorStatus) => {
        navigate('/error', { state: { errorStatus } });
    };

    return (
        <>
            <NavHeader />
            <main>
                <Container>
                    <Row>
                        <Col>
                            <h1>Welcome to the Main page</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Button variant="primary" onClick={() => goToPage('/profile')}>Open profile</Button>
                                <Button variant="primary" onClick={() => goToPage('/template')}>Open templates</Button>
                                <Button variant="warning" onClick={logOutOfApp}>Log out</Button>
                                <Button variant="danger" onClick={() => handleError(500)}>Server error</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
};
