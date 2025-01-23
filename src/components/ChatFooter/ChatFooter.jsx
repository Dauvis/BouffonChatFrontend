import { Container, Card, FormControl, Row, Col, ProgressBar, Dropdown, Button } from "react-bootstrap";
import { List, InfoCircle, ArrowClockwise, ArrowCounterclockwise, Pencil, Trash, SendFill } from "react-bootstrap-icons";
import { useContext, useState } from "react";
import { ChatDataContext } from "../../contexts/ChatDataContext";
import "./ChatFooter.css"
import chatUtil from "../../util/chatUtil";
import ChatInfoModal from "../ChatInfoModal";
import apiUtil from "../../util/apiUtil";
import ChatRenameModal from "../ChatRenameModal";
import YesNoModal from "../YesNoModal";
import miscUtil from "../../util/miscUtil";
import ErrorHandler from "../ErrorHandler";
import errorUtil from "../../util/errorUtil";

export default function ChatFooter() {
    const { activeChat, setActiveChat, chatListData, setChatListData, loadChatData } = useContext(ChatDataContext);
    const [ showInfo, setShowInfo ] = useState(false);
    const [ showRename, setShowRename ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState('');
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ messageText, setMessageText ] = useState('');
    const { icon: convertIcon, text: convertText } = chatUtil.convertButtonInfo(activeChat.type);

    async function handleRenameClosed(newName) {
        setShowRename(false);

        if (newName) {
            await saveChatChanges({ type: activeChat.type, name: newName});
        }
    }

    async function handleChatError(response) {
        if (response.status === 404) {
            alert("Chat does not exist");
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
            miscUtil.setTrackedChatId(updatedChat._id)
        } else {
            await handleChatError(response);
        }
    }

    async function handleCloseShowDeleteModal({result}) {
        if (result) {
            const curChatId = activeChat._id;
            const response = await apiUtil.apiDelete(`/v1/chat/${curChatId}`)

            if (response.success) {
                const updatedList = chatUtil.removeChat(chatListData, curChatId);
                const newChatId = updatedList.length ? updatedList[0]._id : '';

                if (newChatId) {
                    const chatResponse = await apiUtil.apiGet(`/v1/chat/${newChatId}`);

                    if (chatResponse.success) {
                        const selected = chatResponse.body.chats[0]
                        setActiveChat(selected);
                        miscUtil.setTrackedChatId(selected._id)
                    } else {
                        setActiveChat(miscUtil.emptyChat);
                        miscUtil.setTrackedChatId('')
                    }
                } else {
                    setActiveChat(miscUtil.emptyChat);
                    miscUtil.setTrackedChatId('')
                }

                setChatListData(updatedList);
            } else {
                await handleChatError(response);
            }
        }

        setShowDeleteModal(false);
    }

    function handleMessageChanged(event) {
        const target = event.currentTarget
        setMessageText(target.value);
    }

    async function processMessage() {
        const chat = activeChat;
        const userMessage = messageText;
        miscUtil.setTrackedChatId(chat._id);

        if (!userMessage) {
            alert("You must enter a message");
            return;
        }

        const initialExchanges = chat.exchanges;
        const initialUpdated = {
            ...chat,
            exchanges: [
                ...initialExchanges,
                { 
                    userMessage,
                    assistantMessage: '',
                    _id: "000000000000000000000000"
                }
            ]
        };

        setMessageText("");
        setActiveChat(initialUpdated);
        const response = await apiUtil.apiPost("/v1/message", { chatId: chat._id, message: userMessage });

        if (response.success) {
            const curChatId = miscUtil.getTrackedChatId();

            if (curChatId === chat._id) {
                const exchangeData = response.body;
                const curExchanges = chat.exchanges;
                const updated = {
                    ...chat,
                    tokens: exchangeData.tokens,
                    lastActivity: Date.now(),
                    exchanges: [
                        ...curExchanges,
                        { 
                            userMessage, 
                            assistantMessage: exchangeData.assistantMessage, 
                            _id: exchangeData.exchangeId
                        }
                    ]
                }

                setActiveChat(updated);
            }
        } else {
            if (response.status === 400 && response.body.errorCode === "TokenLimit") {
                alert(response.body.message);
            } else {
                await handleChatError(response);
            }

            const curChatId = miscUtil.getTrackedChatId()

            if (curChatId === chat._id) {
                setMessageText(userMessage);
                setActiveChat(chat);
            }
        }    
    }

    async function handleUndoClicked() {
        const response = await apiUtil.apiPost(`/v1/chat/${activeChat._id}/revert`, {});

        if (response.success) {
            if (response.status !== 204) {
                const exchange = response.body.exchange;
                const curExchanges = activeChat.exchanges;

                const updated = {
                    ...activeChat,
                    exchanges: curExchanges.filter(e => e._id !== exchange._id)
                };

                setActiveChat(updated);
                setMessageText(exchange.userMessage);
            } else {
                alert("No more messages to undo");
            }
        } else {
            await handleChatError(response);
        }
    }

    async function handleRedoClicked() {
        const response = await apiUtil.apiPost(`/v1/chat/${activeChat._id}/restore`, {});

        if (response.success) {
            if (response.status !== 204) {
                const exchange = response.body.exchange;
                const curExchanges = activeChat.exchanges;

                const updated = {
                    ...activeChat,
                    exchanges: [...curExchanges, exchange]
                };

                setActiveChat(updated);
                setMessageText("");
            } else {
                alert("No more messages to redo");
            }
        } else {
            await handleChatError(response);
        }
    }

    const limitPercent = chatUtil.chatLimitPercent(activeChat);
    const limitVariant = chatUtil.chatLimitVariant(limitPercent);
    const disabled = !activeChat._id;
    const archived = activeChat.type === "archived";

    return (
        <footer>
            {errorInfo ? <ErrorHandler errorInfo={errorInfo} /> : null }
            <ChatInfoModal show={showInfo} chat={activeChat} closeCallback={() => setShowInfo(false)} />
            <ChatRenameModal show={showRename} curName={activeChat.name} closeCallback={handleRenameClosed} />
            <YesNoModal show={showDeleteModal} message="Are you sure you want to delete this chat?" closeCallback={handleCloseShowDeleteModal} />
            <Container>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Row>
                        <Col>
                        <FormControl as="textarea" disabled={disabled || archived} placeholder="Enter message..." value={messageText} onChange={handleMessageChanged}/>
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
                                <Dropdown.Item as="button" disabled={disabled || archived} onClick={handleUndoClicked} ><ArrowCounterclockwise /> Undo</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled || archived} onClick={handleRedoClicked} ><ArrowClockwise /> Redo</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled} onClick={() => setShowRename(true)} ><Pencil /> Rename</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled} onClick={convertClicked} >{convertIcon} {convertText}</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={disabled} onClick={() => setShowDeleteModal(true)} ><Trash /> Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                        <Col xs={4} className="text-end">
                        <Button variant="primary" disabled={disabled || archived} onClick={() => processMessage()}>
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