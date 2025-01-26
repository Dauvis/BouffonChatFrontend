import { Container, Navbar, Button } from "react-bootstrap";
import logo from "../../assets/images/bouffon_chat_icon.png";
import './NavHeader.css'
import PropTypes from "prop-types";

export default function NavHeader({icon, callBack}) {
    NavHeader.propTypes = {
        icon: PropTypes.node.isRequired,
        callBack: PropTypes.func.isRequired,
    }

    const navBarButton = (
        <Button variant="outline-secondary" className="nav-header-button" onClick={callBack}>{icon}</Button>
    );

    return (
        <header>
            <Navbar className="bg-body-tertiary" fixed="top">
                <Container>
                    <Navbar.Brand href="/main" className="nav-header-brand">
                        <img alt="Bouffon Chat Logo" src={logo} className="nav-header-logo d-inline-block align-top" />
                        <span>Bouffon Chat</span>
                    </Navbar.Brand>
                    {navBarButton}
                </Container>
            </Navbar>
        </header>
    )
}
