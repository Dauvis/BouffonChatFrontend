import { Container, Card, FormControl, Row, Col, ProgressBar, Dropdown, Button } from "react-bootstrap";
import { List, InfoCircle, ArrowClockwise, ArrowCounterclockwise, Pencil, ChatDotsFill, Trash, SendFill } from "react-bootstrap-icons";
import "./ChatFooter.css"

export default function ChatFooter() {
    return (
        <footer>
            <Container>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Row>
                        <Col>
                        <FormControl as="textarea" placeholder="Enter message..."/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <ProgressBar className="chat-footer-progress" now={50}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                <List /> Actions...
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#"><InfoCircle /> Info</Dropdown.Item>
                                <Dropdown.Item href="#"><ArrowCounterclockwise /> Undo</Dropdown.Item>
                                <Dropdown.Item href="#"><ArrowClockwise /> Redo</Dropdown.Item>
                                <Dropdown.Item href="#"><Pencil /> Rename</Dropdown.Item>
                                <Dropdown.Item href="#"><ChatDotsFill /> Convert to ...</Dropdown.Item>
                                <Dropdown.Item href="#"><Trash /> Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                        <Col xs={4} className="text-end">
                        <Button variant="primary"><SendFill /> Send</Button>
                        </Col>
                    </Row>
                </Card.Body>                
            </Card>
            </Container>
        </footer>
    );
}