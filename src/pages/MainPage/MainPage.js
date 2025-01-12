import { useState } from "react";
import { List } from "react-bootstrap-icons";
import NavHeader from "../../components/NavHeader";
import MainOffcanvas from "../../components/MainOffcanvas";
import ChatFooter from "../../components/ChatFooter";
import ChatContent from "../../components/ChatContent";

export default function MainPage() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    return (
        <>
            <NavHeader icon={( <List />)} callBack={() => setShowOffcanvas(true)}/>
            <MainOffcanvas offcanvasState={showOffcanvas} closeCallBack={() => setShowOffcanvas(false)} />
            <main>
                <ChatContent />
            </main>
            <ChatFooter />
        </>
    );
};
