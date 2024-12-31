import { Offcanvas, Nav, Button, Dropdown, Form, ListGroup } from "react-bootstrap";
import { PersonSquare, MoonFill, ChatLeftDots, JournalPlus, Image, 
    BoxSeam, ChatFill, ChatLeftText } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./MainOffcanvas.css";

export default function MainOffcanvas({ offcanvasState, closeCallBack}) {
    return (
        <Offcanvas show={offcanvasState} onHide={closeCallBack}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Link to="/profile" className="chat-menu-link"><PersonSquare /> John Doe</Link>
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
                    <Form>
                        <Form.Control type="text" placeholder="Search..." />
                        <Form.Switch label="Show archived" />
                    </Form>
                    <h5>Conversations</h5>
                    <div className="main-offcanvas-scroll-list">
                        <ListGroup>
                            <ListGroup.Item className="chat-entry-archived" active><BoxSeam /> This is an archived conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-active"><ChatFill /> This is an active conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-temp"><ChatLeftText /> This is a temporary conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-archived"><BoxSeam /> This is an archived conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-active"><ChatFill /> This is an active conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-temp"><ChatLeftText /> This is a temporary conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-archived"><BoxSeam /> This is an archived conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-active"><ChatFill /> This is an active conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-temp"><ChatLeftText /> This is a temporary conversation</ListGroup.Item>
                            <ListGroup.Item className="chat-entry-active"><ChatFill /> This is a very long name for a conversation and 
                                I am going to keep adding text until I am quite satisfied that this title is long enough</ListGroup.Item>
                        </ListGroup>
                    </div>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
}