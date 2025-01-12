import {Alert, Container} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import MessageBlock from "../MessageBlock";
import ChatTitle from "../ChatTitle";
import { ChatDataContext } from "../../contexts/ChatDataContext.js";
import apiUtil from "../../util/apiUtil.js";
import ErrorRedirect from "../ErrorRedirect";

export default function ChatContent() {
    const { activeChat } = useContext(ChatDataContext);
    const [ activeChatData, setActiveChatData] = useState({ name: '', exchanges: []})
    const [ errorResponse, setErrorResponse ] = useState('');

    useEffect(() => {
        const fetchChatData = async () => {
            const response = await apiUtil.apiGet(`/v1/chat/${activeChat._id}`);

            if (response.success) {
                setActiveChatData(response.body.chats[0]);
            } else {
                setErrorResponse(response);
            }
        }

        if (activeChat) {
            fetchChatData();
        }
    }, [activeChat])

    if (errorResponse) {
        return (<ErrorRedirect errorResponse={errorResponse} />);
    }

    let content = <Alert variant="secondary" className="text-center" style={{ marginTop: "0.5rem" }}>Enter a message to start the chat.</Alert>

    if (activeChatData.exchanges.length) {
        content = activeChatData.exchanges.map(exchg => (
            <div key={exchg._id}>
                <MessageBlock isUser={true} message={exchg.userMessage} />
                <MessageBlock isUser={false} message={exchg.assistantMessage} />
            </div>            
        ));
    }

    return (
        activeChat ?
        <>
        <ChatTitle title={activeChat.name} />
        <Container>
            {content}
        </Container>
        </>
        :
        <Alert variant="secondary" className="text-center">No chats fetched</Alert>
    );
}