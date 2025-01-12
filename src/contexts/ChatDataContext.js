import { createContext, useEffect, useState } from "react";
import apiUtil from "../util/apiUtil.js";

export const ChatDataContext = createContext();

export const ChatDataProvider = ({ children }) => {
    const [chatListData, setChatListData] = useState([]);
    const [activeChat, setActiveChat] = useState('');

    useEffect(() => {
        const getChatData = async() => {
            const chatListResponse = await apiUtil.apiGet("/v1/chat");
            const chatList = chatListResponse.body.chats;

            setChatListData(chatList);
            setActiveChat(chatList.length ? chatList[0] : '');
        }

        getChatData();
    }, []);


    return (
        <ChatDataContext.Provider value={{chatListData, setChatListData, activeChat, setActiveChat}}>
            {children}
        </ChatDataContext.Provider>
    );
};
