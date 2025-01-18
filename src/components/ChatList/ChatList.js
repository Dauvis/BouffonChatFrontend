import { useContext, useState } from "react";
import { Card, FormCheck, FormControl, ListGroup } from "react-bootstrap";
import ChatListItem from "../ChatListItem";
import { ChatDataContext } from "../../contexts/ChatDataContext.js";
import "./ChatList.css";
import apiUtil from "../../util/apiUtil.js";
import chatUtil from "../../util/chatUtil.js";
import miscUtil from "../../util/miscUtil.js";
import ErrorHandler from "../ErrorHandler";

export default function ChatList({searchData, setSearchData }) {
    const { chatListData, activeChat, setActiveChat, loadChatData } = useContext(ChatDataContext);
    const [ errorResponse, setErrorResponse ] = useState('');

    async function clickCallback(clickedChatId) {
        const chatResponse = await apiUtil.apiGet(`/v1/chat/${clickedChatId}`);

        if (chatResponse.success) {
            const selected = chatResponse.body.chats[0]
            setActiveChat(selected);
            miscUtil.setTrackedChatId(selected._id)
        } else {
            if (chatResponse.status === 404) {
                alert("Chat does not exist");
                await loadChatData();
            } else {
                setErrorResponse(chatResponse);
            }
        }
    }

    function handleSearchChanged(event) {
        const target = event.currentTarget;
        const value = target.id === "archived" ? target.checked : target.value;
        const newSearchData = {
            ...searchData,
            [target.id]: value
        }

        setSearchData(newSearchData);
    }

    const filteredList = chatUtil.filterChatList(chatListData, searchData.keyword, searchData.archived);

    const listItems = filteredList.map(c => (
        <ChatListItem key={c._id} isActive={c._id === activeChat._id} type={c.type} name={c.name} id={c._id} clickCallback={clickCallback}/>
    ));

    return (
        <>
        { errorResponse ? <ErrorHandler errorResponse={errorResponse} /> : null }
        <Card>
            <Card.Body>
                <FormControl type="text" id="keyword" placeholder="Search by name" onChange={handleSearchChanged} value={searchData.keyword} />
                <FormCheck type="switch" id="archived" label="Show archived" onChange={handleSearchChanged} value={searchData.archived} />
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