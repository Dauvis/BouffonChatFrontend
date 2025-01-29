import { Container, Navbar, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import logo from "../../assets/images/BouffonChatLogo.svg";
import './NavHeader.css'

NavHeader.propTypes = {
    icon: PropTypes.node.isRequired,
    callBack: PropTypes.func.isRequired,
    ariaLabel: PropTypes.string.isRequired,
}

export default function NavHeader({icon, callBack, ariaLabel}) {
    const navBarButton = (
        <Button variant="outline-secondary" className="nav-header-button" onClick={callBack} aria-label={ariaLabel}>{icon}</Button>
    );

    return (
        <header>
            <Navbar className="bg-body-tertiary" fixed="top">
                <Container>
                    <Navbar.Brand href="/main" className="nav-header-brand" aria-label="Home">
                        <img alt="Bouffon Chat Logo" src={logo} className="nav-header-logo d-inline-block align-top" />
                        <span>Bouffon Chat</span>
                    </Navbar.Brand>
                    {navBarButton}
                </Container>
            </Navbar>
        </header>
    )
}
