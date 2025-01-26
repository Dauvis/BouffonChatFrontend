import { createContext, useEffect, useState } from "react";
import apiUtil from "../util/apiUtil.js";
import miscUtil from "../util/miscUtil.js"
import { useNavigate } from "react-router-dom";
import errorUtil from "../util/errorUtil.js";
import PropTypes from "prop-types";

export const ChatDataContext = createContext();

export function ChatDataProvider({ children }) {
    const [chatListData, setChatListData] = useState([]);
    const [activeChat, setActiveChat] = useState(miscUtil.emptyChat);
    const navigate = useNavigate();

    ChatDataProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    useEffect(() => {
        loadChatData();
    }, []);

    async function loadChatData(defaultChatId = "") {
        const chatListResponse = await apiUtil.apiGet("/v1/chat");

        if (chatListResponse.success) {
            const chatList = chatListResponse.body.chats;
            let selected = miscUtil.emptyChat;

            if (defaultChatId) {
                const chatResponse = await apiUtil.apiGet(`/v1/chat/${defaultChatId}`);

                if (chatResponse.success) {
                    selected = chatResponse.body.chats[0];
                }
            }

            setChatListData(chatList);
            setActiveChat(selected);
            miscUtil.setTrackedChatId(selected?._id);
        } else {
            const errorInfo = errorUtil.handleApiError(chatListResponse);
            navigate(errorInfo.redirect, { state: {errorInfo} });
        }
    }


    return (
        <ChatDataContext.Provider value={{chatListData, setChatListData, activeChat, setActiveChat, loadChatData }}>
            {children}
        </ChatDataContext.Provider>
    );
};
