import { Alert, Container, Button } from "react-bootstrap";
import { ChevronDoubleDown, ChevronDoubleUp } from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import MessageBlock from "../MessageBlock";
import ChatTitle from "../ChatTitle";
import { ChatDataContext } from "../../contexts/ChatDataContext.js";
import "./ChatContent.css"

export default function ChatContent() {
    const { activeChat } = useContext(ChatDataContext);
    const [scrollButton, setScrollButton] = useState('');
    const [scrollButtonClicked, setScrollButtonClicked] = useState("")

    useEffect(() => {
        function onScroll() {
            const scrolledFromTop = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const count = activeChat ? activeChat.exchanges.length : 0;

            let buttonName = '';

            if (count >= 4) {
                if (scrolledFromTop > totalHeight / 2) {
                    buttonName = "up";
                } else if (scrolledFromTop < totalHeight / 2) {
                    buttonName = "down";
                }
            }

            setScrollButton(buttonName);
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
                {scrollButton === "up"
                    ? <Button variant="secondary" className="chat-content-scroll-up" onClick={() => setScrollButtonClicked("up")}>
                        <ChevronDoubleUp className="chat-content-scroll-icon" />
                    </Button>
                    : null}
                {scrollButton === "down"
                    ? <Button variant="secondary" className="chat-content-scroll-down" onClick={() => setScrollButtonClicked("down")}>
                        <ChevronDoubleDown className="chat-content-scroll-icon" />
                    </Button>
                    : null}
                <ChatTitle title={activeChat.name} />
                <Container>
                    {content}
                </Container>
            </>
            :
            <Alert variant="secondary" className="text-center">No chats fetched</Alert>
    );
}