import { Offcanvas, Nav, Button, Dropdown } from "react-bootstrap";
import { PersonSquare, MoonFill, ChatLeftDots, JournalPlus, Image } from "react-bootstrap-icons";
import ChatList from "../ChatList";
import { Link } from "react-router-dom";
import miscUtil from "../../util/miscUtil.js"
import "./MainOffcanvas.css";

export default function MainOffcanvas({ offcanvasState, closeCallBack}) {
    const profile = miscUtil.getProfile();

    return (
        <Offcanvas show={offcanvasState} placement="end" onHide={closeCallBack}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Link to="/profile" className="chat-menu-link"><PersonSquare /> {profile.name}</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="link"><MoonFill /> Switch to dark mode</Button>
                    </Nav.Item>                    
                </Nav>
                <hr className="my-3" />
                <Nav className="flex-column">
                    <Nav.Item>
                        <Dropdown>
                            <Dropdown.Toggle variant="link"><ChatLeftDots /> New...</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Conversation</Dropdown.Item>
                                <Dropdown.Item href="#">Temporary chat</Dropdown.Item>
                                <Dropdown.Item href="#">Template #1</Dropdown.Item>
                                <Dropdown.Item href="#">Template #2</Dropdown.Item>
                                <Dropdown.Item href="#">Template #3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/template" className="chat-menu-link"><JournalPlus /> Manage templates</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="link"><Image /> Image tool</Button>
                    </Nav.Item>
                    <hr className="my-3" />
                    <ChatList />
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
}