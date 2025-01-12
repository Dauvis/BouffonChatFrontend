import { useContext } from "react";
import { Card, FormCheck, FormControl, ListGroup } from "react-bootstrap";
import ChatListItem from "../ChatListItem";
import { ChatDataContext } from "../../contexts/ChatDataContext.js";

import "./ChatList.css";

export default function ChatList() {
    const { chatListData, activeChat, setActiveChat } = useContext(ChatDataContext);

    function clickCallback(clickedChatId) {
        setActiveChat(chatListData.find(c => c._id === clickedChatId));
    }

    const listItems = chatListData.map(c => (
        <ChatListItem key={c._id} isActive={c._id === activeChat._id} type={c.type} name={c.name} id={c._id} clickCallback={clickCallback}/>
    ));

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