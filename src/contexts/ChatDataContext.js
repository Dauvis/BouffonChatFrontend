import { createContext, useEffect, useState } from "react";
import apiUtil from "../util/apiUtil.js";
import miscUtil from "../util/miscUtil.js"

export const ChatDataContext = createContext();

export const ChatDataProvider = ({ children }) => {
    const [chatListData, setChatListData] = useState([]);
    const [activeChat, setActiveChat] = useState(miscUtil.emptyChat);

    useEffect(() => {
        const getChatData = async() => {
            const chatListResponse = await apiUtil.apiGet("/v1/chat");

            if (chatListResponse.success) {
                const chatList = chatListResponse.body.chats;
                const firstChatId = chatList.length ? chatList[0]._id : '';
                let firstChat = miscUtil.emptyChat;

                if (firstChatId) {
                    const chatResponse = await apiUtil.apiGet(`/v1/chat/${firstChatId}`);

                    if (chatResponse.success) {
                        firstChat = chatResponse.body.chats[0];
                    }
                }

                setChatListData(chatList);
                setActiveChat(firstChat);
                miscUtil.setTrackedChatId(firstChat._id)
            }
        }

        getChatData();
    }, []);


    return (
        <ChatDataContext.Provider value={{chatListData, setChatListData, activeChat, setActiveChat }}>
            {children}
        </ChatDataContext.Provider>
    );
};
