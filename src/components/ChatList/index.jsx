import { useContext, useState } from "react";
import { Card, FormCheck, FormControl, ListGroup } from "react-bootstrap";

import { ChatDataContext } from "../../contexts/ChatDataContext";

import ChatListItem from "../ChatListItem";
import ErrorHandler from "../ErrorHandler";
import AlertModal from "../AlertModal";

import apiUtil from "../../util/apiUtil";
import errorUtil from "../../util/errorUtil";
import localStoreUtil from "../../util/localStoreUtil";

import "./ChatList.css";
import chatListLogic from "./chatListLogic";

export default function ChatList() {
    const { chatListData, activeChat, setActiveChat, loadChatData, searchData, setSearchData } = useContext(ChatDataContext);
    const [ errorInfo, setErrorInfo ] = useState("");
    const [ alertText, setAlertText ] = useState("");

    async function clickCallback(clickedChatId) {
        const chatResponse = await apiUtil.get(`/v1/chat/${clickedChatId}`);

        if (chatResponse.success) {
            const selected = chatResponse.body.chats[0]
            setActiveChat(selected);
            localStoreUtil.setTrackedChatId(selected._id)
        } else {
            if (chatResponse.status === 404) {
                setAlertText("Chat does not exist");
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
        { alertText ? <AlertModal message={alertText} closeCallback={() => setAlertText("")} /> : null}
        <Card>
            <Card.Body>
                <FormControl type="text" id="keyword" placeholder="Search by name" onChange={handleSearchChanged} value={searchData.keyword} aria-label="Search by name"/>
                <FormCheck type="switch" id="archived" label="Show archived" onChange={handleSearchChanged} checked={searchData.archived} />
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