import { Container, Navbar, Button } from "react-bootstrap";
import './NavHeader.css'

export default function NavHeader({icon, callBack}) {
    const navBarButton = (
        <Button variant="outline-secondary" onClick={callBack}>{icon}</Button>
    );

    return (
        <header>
            <Navbar className="bg-body-tertiary" fixed="top">
                <Container>
                    <Navbar.Brand href="/main" className="nav-header-brand">
                        <img alt="Bouffon Chat Logo" src="/images/bouffon_chat_icon.png" className="nav-header-logo d-inline-block align-top" />
                        <span>Bouffon Chat</span>
                    </Navbar.Brand>
                    {navBarButton}
                </Container>
            </Navbar>
        </header>
    )
}
