import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import NavHeader from "../../components/NavHeader";
import MainOffcanvas from "../../components/MainOffcanvas";
import ChatFooter from "../../components/ChatFooter";
import ChatContent from "../../components/ChatContent";
import ChatTitle from "../../components/ChatTitle";

export default function MainPage() {
    const navigate = useNavigate();
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleError = (errorStatus) => {
        navigate('/error', { state: { errorStatus } });
    };

    return (
        <>
            <NavHeader icon={( <List />)} callBack={() => setShowOffcanvas(true)}/>
            <MainOffcanvas offcanvasState={showOffcanvas} closeCallBack={() => setShowOffcanvas(false)} />
            <main>
                <Container>
                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Button variant="danger" onClick={() => handleError(500)}>Error page</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
                <ChatTitle title="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" />
                <ChatContent />
            </main>
            <ChatFooter />
        </>
    );
};
