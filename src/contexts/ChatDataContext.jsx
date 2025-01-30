import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import apiUtil from "../util/apiUtil";
import miscUtil from "../util/miscUtil"
import errorUtil from "../util/errorUtil";
import localStoreUtil from "../util/localStoreUtil";

export const ChatDataContext = createContext();

export function ChatDataProvider({ children }) {
    ChatDataProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [chatListData, setChatListData] = useState([]);
    const [activeChat, setActiveChat] = useState(miscUtil.emptyChat);
    const [searchData, setSearchData] = useState({archived: false, keyword: ""});
    const navigate = useNavigate();

    useEffect(() => {
        loadChatData();
    }, []);

    async function loadChatData(defaultChatId = "") {
        const chatListResponse = await apiUtil.get("/v1/chat");

        if (chatListResponse.success) {
            const chatList = chatListResponse.body.chats;
            let selected = miscUtil.emptyChat;

            if (defaultChatId) {
                const chatResponse = await apiUtil.get(`/v1/chat/${defaultChatId}`);

                if (chatResponse.success) {
                    selected = chatResponse.body.chats[0];
                }
            }

            setChatListData(chatList);
            setActiveChat(selected);
            localStoreUtil.setTrackedChatId(selected._id);
        } else {
            const errorInfo = errorUtil.handleApiError(chatListResponse);
            navigate(errorInfo.redirect, { state: {errorInfo} });
        }
    }


    return (
        <ChatDataContext.Provider value={{chatListData, setChatListData, activeChat, setActiveChat, loadChatData, searchData, setSearchData }}>
            {children}
        </ChatDataContext.Provider>
    );
};
