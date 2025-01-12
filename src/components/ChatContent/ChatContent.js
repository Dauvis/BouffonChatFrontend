import {Alert, Container} from "react-bootstrap";
import { useContext } from "react";
import MessageBlock from "../MessageBlock";
import ChatTitle from "../ChatTitle";
import { ChatDataContext } from "../../contexts/ChatDataContext.js";

export default function ChatContent() {
    const { activeChat } = useContext(ChatDataContext);

    let content = (<Alert variant="secondary" className="text-center" style={{ marginTop: "0.5rem" }}>Enter a message to start the chat.</Alert>);

    if (activeChat.exchanges.length) {
        content = activeChat.exchanges.map(exchg => (
            <div key={exchg._id}>
                <MessageBlock isUser={true} message={exchg.userMessage} />
                <MessageBlock isUser={false} message={exchg.assistantMessage} />
            </div>            
        ));
    }

    return (
        activeChat._id ?
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