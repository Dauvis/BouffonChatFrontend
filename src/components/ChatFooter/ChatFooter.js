import { Container, Card, FormControl, Row, Col, ProgressBar, Dropdown, Button } from "react-bootstrap";
import { List, InfoCircle, ArrowClockwise, ArrowCounterclockwise, Pencil, Trash, SendFill } from "react-bootstrap-icons";
import { useContext, useState } from "react";
import { ChatDataContext } from "../../contexts/ChatDataContext";
import "./ChatFooter.css"
import chatUtil from "../../util/chatUtil";
import ChatInfoModal from "../ChatInfoModal";
import apiUtil from "../../util/apiUtil";
import ErrorRedirect from "../ErrorRedirect";
import ChatRenameModal from "../ChatRenameModal";

export default function ChatFooter() {
    const { activeChat, setActiveChat, chatListData, setChatListData } = useContext(ChatDataContext);
    const [ showInfo, setShowInfo ] = useState(false);
    const [ showRename, setShowRename ] = useState(false);
    const [ errorResponse, setErrorResponse ] = useState('');
    const { icon: convertIcon, text: convertText } = chatUtil.convertButtonInfo(activeChat.type);

    function showInfoClosed() {
        setShowInfo(false);
    }

    async function handleRenameClosed(newName) {
        setShowRename(false);

        if (newName) {
            await saveChatChanges({ type: activeChat.type, name: newName});
        }
    }

    async function convertClicked() {
        let newType = "active";

        if (activeChat.type === "active") {
            newType = "archived";
        }

        await saveChatChanges({ type: newType, name: activeChat.name })
    }

    async function saveChatChanges(changes) {
        const response = await apiUtil.apiPatch(`/v1/chat/${activeChat._id}`, changes);

        if (response.success) {
            const updatedChat = {
                ...activeChat,
                name: changes.name,
                type: changes.type
            }

            const updatedList = chatUtil.replaceChat(chatListData, updatedChat);
            setChatListData(updatedList);
            setActiveChat(updatedChat);
        } else {
            setErrorResponse(response);
        }
    }

    const limitPercent = chatUtil.chatLimitPercent(activeChat);
    const limitVariant = chatUtil.chatLimitVariant(limitPercent);
    const disabled = !activeChat._id;
    const archived = activeChat.type === "archived";

    if (errorResponse) {
        return (<ErrorRedirect errorResponse={errorResponse} />);
    }

    return (
        <footer>
            <ChatInfoModal show={showInfo} chat={activeChat} closeCallback={showInfoClosed} />
            <ChatRenameModal show={showRename} curName={activeChat.name} closeCallback={handleRenameClosed} />
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
                                <Dropdown.Item as="button" disabled={disabled} onClick={() => setShowInfo(true)} ><InfoCircle /> Info</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled || archived} onClick={() => alert("Coming soon")} ><ArrowCounterclockwise /> Undo</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled || archived} onClick={() => alert("Coming soon")} ><ArrowClockwise /> Redo</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled} onClick={() => setShowRename(true)} ><Pencil /> Rename</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled} onClick={convertClicked} >{convertIcon} {convertText}</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled} onClick={() => alert("Coming soon")} ><Trash /> Delete</Dropdown.Item>
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