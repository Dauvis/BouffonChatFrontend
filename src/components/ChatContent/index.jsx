import { Alert, Container, Button } from "react-bootstrap";
import { ChevronDoubleDown, ChevronDoubleUp } from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";

import { ChatDataContext } from "../../contexts/ChatDataContext.jsx";

import MessageBlock from "../MessageBlock";
import ChatTitle from "../ChatTitle";
import VisibilityRefresh from "../VisibilityRefresh";

import "./ChatContent.css"

export default function ChatContent() {
    const { activeChat } = useContext(ChatDataContext);
    const [scrollButton, setScrollButton] = useState("");
    const [scrollButtonClicked, setScrollButtonClicked] = useState("")

    useEffect(() => {
        function onScroll() {
            const scrolledFromTop = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const count = activeChat ? activeChat.exchanges.length : 0;

            if (count >= 4) {
                if (scrolledFromTop > totalHeight / 2) {
                    setScrollButton("up");
                } else if (scrolledFromTop < totalHeight / 2) {
                    setScrollButton("down");
                }
            } else {
                setScrollButton("");
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [activeChat]);

    useEffect(() => {
        if (scrollButtonClicked) {
            if (scrollButtonClicked === "up") {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            }

            setScrollButtonClicked("");
        }
    }, [scrollButtonClicked])

    let content = null;

    if (activeChat.exchanges.length) {
        content = activeChat.exchanges.map(exchg => (
            <section key={exchg._id}>
                <MessageBlock isUser={true} message={exchg.userMessage} />
                <MessageBlock isUser={false} message={exchg.assistantMessage} />
            </section>
        ));
    } else {
        content = <Alert variant="secondary" className="text-center" style={{ marginTop: "0.5rem" }}>
            Enter a message to start the chat.
        </Alert>
    }

    return (
        activeChat._id ?
            <>
                <VisibilityRefresh />
                {scrollButton === "up"
                    ? <Button variant="secondary" className="chat-content-scroll-up" onClick={() => setScrollButtonClicked("up")} aria-label="Scroll to top">
                        <ChevronDoubleUp className="chat-content-scroll-icon" />
                    </Button>
                    : null}
                {scrollButton === "down"
                    ? <Button variant="secondary" className="chat-content-scroll-down" onClick={() => setScrollButtonClicked("down")} aria-label="Scroll to bottom">
                        <ChevronDoubleDown className="chat-content-scroll-icon" />
                    </Button>
                    : null}
                <Container aria-live="polite">
                    <ChatTitle title={activeChat.name} />
                    {content}
                </Container>
            </>
        :
            <Container>
                <Alert variant="secondary" className="text-center" role="alert">Select or create a chat</Alert>
            </Container>
    );
}