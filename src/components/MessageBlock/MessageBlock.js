import { Card, Spinner } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./MessageBlock.css";

export default function MessageBlock({ isUser, message }) {
    const components = {
        a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
    };

    const messageStyle = isUser ? "chat-content-message-user" : "chat-content-message-assistant";
    const cardClass = `chat-content-message-common ${messageStyle}`;

    return (
        <Card className={cardClass}>
            <Card.Body>
                <Card.Title>{isUser ? "User" : "Assistant"}</Card.Title>
                { message ? <Markdown components={components} remarkPlugins={[remarkGfm]}>{message}</Markdown> : <Spinner animation="border" /> }                
            </Card.Body>
        </Card>
    );
}