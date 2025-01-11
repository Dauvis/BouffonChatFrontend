import { Card } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./MessageBlock.css";

export default function MessageBlock({isUser, message}) {
    const messageStyle = isUser ? "chat-content-message-user" : "chat-content-message-assistant";
    const cardClass = `chat-content-message-common ${messageStyle}`;

    return (
        <Card className={cardClass}>
            <Card.Body>
                <Card.Title>{isUser ? "User" : "Assistant"}</Card.Title>
                <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
            </Card.Body>
        </Card>
    );
}