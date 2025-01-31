import { Container, Card, FormControl, Row, Col, ProgressBar, Dropdown, Button } from "react-bootstrap";
import { List, InfoCircle, ArrowClockwise, ArrowCounterclockwise, Pencil, Trash, SendFill } from "react-bootstrap-icons";
import { useContext, useState, useRef, useEffect } from "react";

import { ChatDataContext } from "../../contexts/ChatDataContext";

import ChatInfoModal from "../ChatInfoModal";
import ChatRenameModal from "../ChatRenameModal";
import YesNoModal from "../YesNoModal";
import ErrorHandler from "../ErrorHandler";
import AlertModal from "../AlertModal";

import apiUtil from "../../util/apiUtil";
import miscUtil from "../../util/miscUtil";
import errorUtil from "../../util/errorUtil";
import localStoreUtil from "../../util/localStoreUtil";
import chatFooterLogic from "./chatFooterLogic";

import "./ChatFooter.css"
import ChatConvertButton from "./ChatConverButton";
import ChatStatusInfo from "./ChatStatusInfo";

export default function ChatFooter() {
    const { activeChat, setActiveChat, chatListData, setChatListData, loadChatData } = useContext(ChatDataContext);
    const [showInfo, setShowInfo] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");
    const [yesNoModalData, setYesNoModalData] = useState("");
    const [messageText, setMessageText] = useState("");
    const [actionOpen, setActionOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const messageTextRef = useRef();

    function autoResize() {
        const control = messageTextRef.current;

        if (control) {
            const scrollY = document.documentElement.scrollHeight;
            control.style.height = 'auto';
            const newHeight = control.scrollHeight;
            control.style.height = (newHeight > 500 ? 500 : newHeight) + 'px';
            window.scrollTo(window.scrollX, scrollY);
        }
    }

    useEffect(() => {
        const control = messageTextRef.current;
        if (control) {
            control.addEventListener('input', autoResize);
        }
    
        return () => {
            if (control) {
                control.removeEventListener('input', autoResize);
            };
        }
    }, []);

    async function handleRenameClosed(newName) {
        if (newName) {
            await saveChatChanges({ type: activeChat.type, name: newName });
        }

        setShowRename(false);
    }

    async function handleChatError(response) {
        if (response.status === 404) {
            setAlertMessage("Chat could not be found.");
            await loadChatData();
        } else {
            const errInfo = errorUtil.handleApiError(response);
            setErrorInfo(errInfo);
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
        const response = await chatFooterLogic.saveChat(activeChat, chatListData, changes);

        if (response.success) {
            setChatListData(response.chatList);
            setActiveChat(response.active);
            localStoreUtil.setTrackedChatId(response.active._id);
        } else {
            await handleChatError(response.errorResponse);
        }
    }

    function handleDeleteChatClicked() {
        setYesNoModalData("Are you sure you want to delete this chat?");
    }

    async function handleCloseShowDeleteModal({ result }) {
        if (result) {
            const response = await chatFooterLogic.deleteChat(activeChat._id, chatListData);

            if (response.success) {
                setActiveChat(miscUtil.emptyChat);
                localStoreUtil.setTrackedChatId('')
                setChatListData(response.chatList);
            } else {
                await handleChatError(response.errorResponse);
            }
        }

        setYesNoModalData("");
    }

    function handleMessageChanged(event) {
        const target = event.currentTarget
        setMessageText(target.value);
    }

    async function processMessage() {
        const userMessage = messageText;

        if (!userMessage) {
            setAlertMessage("You must enter a message");
            return;
        }

        const chat = activeChat;
        const initialUpdated = chatFooterLogic.chatWithPlaceholder(chat, userMessage);
        setMessageText("");
        setActiveChat(initialUpdated);
        localStoreUtil.setTrackedChatId(chat._id);
        localStoreUtil.lockScroll(window.scrollY + 250);

        const response = await apiUtil.post("/v1/message", { chatId: chat._id, message: userMessage }, false);

        if (response.success) {
            const curChatId = localStoreUtil.getTrackedChatId();

            if (curChatId === chat._id) {
                const updated = chatFooterLogic.addExchangeData(chat, userMessage, response.body);
                setActiveChat(updated);
            }
        } else {
            if (response.status === 400 && response.body.errorCode === "TokenLimit") {
                setAlertMessage(response.body.message);
            } else {
                await handleChatError(response);
            }

            const curChatId = miscUtil.getTrackedChatId()

            if (curChatId === chat._id) {
                setMessageText(userMessage);
                setActiveChat(chat);
            }
        }

        autoResize();

        setTimeout(() => localStoreUtil.lockScroll(0), 1000);        
    }

    async function handleUndoClicked() {
        const response = await apiUtil.post(`/v1/chat/${activeChat._id}/revert`, {});

        if (response.success) {
            if (response.status !== 204) {
                const exchange = response.body.exchange;
                const updated = chatFooterLogic.removeExchange(activeChat, exchange);
                setActiveChat(updated);
                setMessageText(exchange.userMessage);
            } else {
                setAlertMessage("No more messages to undo");
            }
        } else {
            await handleChatError(response);
        }
    }

    async function handleRedoClicked() {
        const response = await apiUtil.post(`/v1/chat/${activeChat._id}/restore`, {});

        if (response.success) {
            if (response.status !== 204) {
                const exchange = response.body.exchange;
                const updated = chatFooterLogic.addExchange(activeChat, exchange);
                setActiveChat(updated);
                setMessageText("");
            } else {
                setAlertMessage("No more messages to redo");
            }
        } else {
            await handleChatError(response);
        }
    }

    const limitPercent = chatFooterLogic.chatLimitPercent(activeChat);
    const limitVariant = chatFooterLogic.chatLimitVariant(limitPercent);
    const disabled = !activeChat._id;
    const archived = activeChat.type === "archived";

    return (
        <footer>
            {errorInfo ? <ErrorHandler errorInfo={errorInfo} /> : null}
            {yesNoModalData ? <YesNoModal message={yesNoModalData} closeCallback={handleCloseShowDeleteModal} /> : null}
            {showInfo ? <ChatInfoModal chat={activeChat} closeCallback={() => setShowInfo(false)} /> : null}
            {showRename ? <ChatRenameModal curName={activeChat.name} closeCallback={handleRenameClosed} /> : null}
            {alertMessage ? <AlertModal message={alertMessage} closeCallback={() => setAlertMessage("")} /> : null }
            <Container>
                <Card className="bg-body-tertiary">
                    <Card.Body>
                        <Row>
                            <Col>
                                <ChatStatusInfo type={activeChat.type} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormControl ref={messageTextRef} as="textarea" className="autoresize-textarea" 
                                    disabled={disabled || archived} placeholder="Enter message"
                                    value={messageText} onChange={handleMessageChanged} aria-label="Message/prompt input" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ProgressBar variant={limitVariant} className="chat-footer-progress" now={limitPercent} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                <Dropdown onToggle={(isOpen) => setActionOpen(isOpen)}>
                                    <Dropdown.Toggle variant="secondary" aria-label="Available chat actions" aria-haspopup={true}
                                        aria-expanded={actionOpen} aria-controls="action-menu">
                                        <List /> Actions...
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu id="action-menu">
                                        <Dropdown.Item as="button" disabled={disabled} onClick={() => setShowInfo(true)} aria-label="Chat information">
                                            <InfoCircle /> Info
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" disabled={disabled || archived} onClick={handleUndoClicked} aria-label="Undo previous prompt">
                                            <ArrowCounterclockwise /> Undo
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" disabled={disabled || archived} onClick={handleRedoClicked} >
                                            <ArrowClockwise /> Redo
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" disabled={disabled} onClick={() => setShowRename(true)} aria-label="Restore previous undo">
                                            <Pencil /> Rename
                                        </Dropdown.Item>
                                        <ChatConvertButton disabled={disabled} type={activeChat.type} clickedCallBack={convertClicked} />
                                        <Dropdown.Item as="button" disabled={disabled} onClick={handleDeleteChatClicked} aria-label="Delete chat">
                                            <Trash /> Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col xs={4} className="text-end">
                                <Button variant="primary" disabled={disabled || archived} onClick={() => processMessage()} aria-label="Send message">
                                    <SendFill /> Send
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </footer>
    );
}