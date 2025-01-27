import { useContext, useState } from "react";
import { Card, FormCheck, FormControl, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

import { ChatDataContext } from "../../contexts/ChatDataContext.jsx";

import ChatListItem from "../ChatListItem";
import ErrorHandler from "../ErrorHandler";

import apiUtil from "../../util/apiUtil.js";
import errorUtil from "../../util/errorUtil.js";
import localStoreUtil from "../../util/localStoreUtil.js";

import "./ChatList.css";
import chatListLogic from "./chatListLogic";

export default function ChatList({searchData, setSearchData }) {
    ChatList.propTypes = {
        searchData: PropTypes.any.isRequired,
        setSearchData: PropTypes.func.isRequired,
    }

    const { chatListData, activeChat, setActiveChat, loadChatData } = useContext(ChatDataContext);
    const [ errorInfo, setErrorInfo ] = useState('');

    async function clickCallback(clickedChatId) {
        const chatResponse = await apiUtil.get(`/v1/chat/${clickedChatId}`);

        if (chatResponse.success) {
            const selected = chatResponse.body.chats[0]
            setActiveChat(selected);
            localStoreUtil.setTrackedChatId(selected._id)
        } else {
            if (chatResponse.status === 404) {
                alert("Chat does not exist");
                await loadChatData();
            } else {
                const errInfo = errorUtil.handleApiError(chatResponse);
                setErrorInfo(errInfo);
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

    const filteredList = chatListLogic.filter(chatListData, searchData.keyword, searchData.archived);

    const listItems = filteredList.map(c => (
        <ChatListItem key={c._id} isActive={c._id === activeChat._id} type={c.type} name={c.name} id={c._id} clickCallback={clickCallback}/>
    ));

    return (
        <>
        { errorInfo ? <ErrorHandler errorInfo={errorInfo} /> : null }
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