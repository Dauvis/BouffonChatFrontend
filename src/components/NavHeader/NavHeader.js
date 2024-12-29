import { Container, Navbar } from "react-bootstrap";
import './NavHeader.css'

export default function NavHeader() {
    return (
        <header className="fixed-top">
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/main" className="nav-header-brand">
                    <img alt="Bouffon Chat Logo" src="/images/bouffon_chat_icon.png" className="nav-header-logo d-inline-block align-top"/>
                    <span>Bouffon Chat</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}
