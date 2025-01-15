import { useContext, useState } from "react";
import { Card, FormCheck, FormControl, ListGroup } from "react-bootstrap";
import ChatListItem from "../ChatListItem";
import { ChatDataContext } from "../../contexts/ChatDataContext.js";
import "./ChatList.css";
import apiUtil from "../../util/apiUtil.js";
import ErrorRedirect from "../ErrorRedirect/ErrorRedirect.js";
import chatUtil from "../../util/chatUtil.js";
import miscUtil from "../../util/miscUtil.js";

export default function ChatList() {
    const { chatListData, activeChat, setActiveChat } = useContext(ChatDataContext);
    const [ searchData, setSearchData ] = useState({archived: false, keyword: '' });    
    const [ errorResponse, setErrorRespons ] = useState('');

    async function clickCallback(clickedChatId) {
        const chatResponse = await apiUtil.apiGet(`/v1/chat/${clickedChatId}`);

        if (chatResponse.success) {
            const selected = chatResponse.body.chats[0]
            setActiveChat(selected);
            miscUtil.setTrackedChatId(selected._id)
        } else {
            setErrorRespons(chatResponse);
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

    if (errorResponse) {
        return (<ErrorRedirect errorResponse={errorResponse} />);
    }

    return (
        <>
        <Card>
            <Card.Body>
                <FormControl type="text" id="keyword" placeholder="Search by name" onChange={handleSearchChanged} />
                <FormCheck type="switch" id="archived" label="Show archived" onChange={handleSearchChanged} />
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