import { Container, Card, FormControl, Row, Col, ProgressBar, Dropdown, Button } from "react-bootstrap";
import { List, InfoCircle, ArrowClockwise, ArrowCounterclockwise, Pencil, Trash, SendFill } from "react-bootstrap-icons";
import { useContext } from "react";
import { ChatDataContext } from "../../contexts/ChatDataContext";
import "./ChatFooter.css"
import chatUtil from "../../util/chatUtil";

export default function ChatFooter() {
    const { activeChat } = useContext(ChatDataContext);
    const { icon: convertIcon, text: convertText } = chatUtil.convertButtonInfo(activeChat.type);

    const limitPercent = chatUtil.chatLimitPercent(activeChat);
    const limitVariant = chatUtil.chatLimitVariant(limitPercent);
    const disabled = !activeChat._id;
    const archived = activeChat.type === "archived";

    return (
        <footer>
            <Container>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Row>
                        <Col>
                        <FormControl as="textarea" disabled={disabled || archived} placeholder="Enter message..."/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <ProgressBar variant={limitVariant} className="chat-footer-progress" now={limitPercent}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                <List /> Actions...
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item action disabled={disabled} onClick={() => alert("Coming soon")} ><InfoCircle /> Info</Dropdown.Item>
                                <Dropdown.Item action disabled={disabled || archived} onClick={() => alert("Coming soon")} ><ArrowCounterclockwise /> Undo</Dropdown.Item>
                                <Dropdown.Item action disabled={disabled || archived} onClick={() => alert("Coming soon")} ><ArrowClockwise /> Redo</Dropdown.Item>
                                <Dropdown.Item action disabled={disabled} onClick={() => alert("Coming soon")} ><Pencil /> Rename</Dropdown.Item>
                                <Dropdown.Item action disabled={disabled} onClick={() => alert("Coming soon")} >{convertIcon} {convertText}</Dropdown.Item>
                                <Dropdown.Item action disabled={disabled} onClick={() => alert("Coming soon")} ><Trash /> Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                        <Col xs={4} className="text-end">
                        <Button variant="primary" disabled={disabled || archived} onClick={() => alert("Coming soon")}><SendFill /> Send</Button>
                        </Col>
                    </Row>
                </Card.Body>                
            </Card>
            </Container>
        </footer>
    );
}