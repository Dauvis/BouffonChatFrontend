import { useContext, useState } from "react";
import { Card, FormCheck, FormControl, ListGroup } from "react-bootstrap";
import ChatListItem from "../ChatListItem";
import { ChatDataContext } from "../../contexts/ChatDataContext.js";
import "./ChatList.css";
import apiUtil from "../../util/apiUtil.js";
import ErrorRedirect from "../ErrorRedirect/ErrorRedirect.js";

export default function ChatList() {
    const { chatListData, activeChat, setActiveChat } = useContext(ChatDataContext);
    const [ errorResponse, setErrorRespons ] = useState('');

    async function clickCallback(clickedChatId) {
        const chatResponse = await apiUtil.apiGet(`/v1/chat/${clickedChatId}`);

        if (chatResponse.success) {
            setActiveChat(chatResponse.body.chats[0]);
        } else {
            setErrorRespons(chatResponse);
        }
    }

    const listItems = chatListData.map(c => (
        <ChatListItem key={c._id} isActive={c._id === activeChat._id} type={c.type} name={c.name} id={c._id} clickCallback={clickCallback}/>
    ));

    if (errorResponse) {
        return (<ErrorRedirect errorResponse={errorResponse} />);
    }

    return (
        <>
        <Card>
            <Card.Body>
                <FormControl type="text" placeholder="Search by name" />
                <FormCheck type="switch" label="Show archived" />
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <Card.Title>Conversations</Card.Title>
                <div className="chat-list-scroll">
                    <ListGroup>
                        {listItems}
                    </ListGroup>
                </div>
            </Card.Body>
        </Card>
        </>
    );
}