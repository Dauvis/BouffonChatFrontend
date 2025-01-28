import { Card, Spinner } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PropTypes from "prop-types";

import "./MessageBlock.css";

MessageBlock.propTypes = {
    isUser: PropTypes.bool.isRequired,
    message: PropTypes.string
}

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
        <Card as="article" className={cardClass}>
            <Card.Body>
                <Card.Title as="h5" role="heading">{isUser ? "User" : "Assistant"}</Card.Title>
                { message ? 
                <Markdown components={components} remarkPlugins={[remarkGfm]}>{message}</Markdown> : 
                <Spinner animation="border" role="status" aria-live="polite"/> }                
            </Card.Body>
        </Card>
    );
}