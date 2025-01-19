import { Offcanvas, Nav, Button, Dropdown } from "react-bootstrap";
import { PersonSquare, ChatLeftDots, JournalPlus, Image } from "react-bootstrap-icons";
import ChatList from "../ChatList";
import { Link } from "react-router-dom";
import miscUtil from "../../util/miscUtil.js"
import "./MainOffcanvas.css";
import ColorModeButton from "../ColorModeButton";
import { useState } from "react";
import ChatCreateModal from "../ChatCreateModal";
import chatUtil from "../../util/chatUtil.jsx";
import apiUtil from "../../util/apiUtil.js";

export default function MainOffcanvas({ offcanvasState, closeCallBack, searchData, setSearchData }) {
    const [ showCreate, setShowCreate] = useState({show: false, parameters:''});

    const profile = miscUtil.getProfile();

    async function createNewChat(templateId) {
        let template = miscUtil.emptyTemplate;

        if (templateId) {
            const response = await apiUtil.apiGet(`/v1/template/${templateId}`);

            if (response.success) {
                template = response.body.templates[0];
            } else {
                return;
            }
        }

        closeCallBack();
        const parameters = chatUtil.initNewParameters(profile, template);
        miscUtil.addTemplateMRU(template);
        setShowCreate({show: true, parameters});
    }

    function handleCreateCallback() {
        setShowCreate({show: false, parameters:'' });
    }

    const templateMru = miscUtil.getTemplateMRU() || [];
    const mruOptions = templateMru.map(entry => (
        <Dropdown.Item key={entry.id} as="button" onClick={() => createNewChat(entry.id)}>{entry.name}</Dropdown.Item>
    ));

    return (
        <>
        <ChatCreateModal show={showCreate.show} parameters={showCreate.parameters} closeCallback={handleCreateCallback} />
        <Offcanvas show={offcanvasState} placement="end" onHide={closeCallBack}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Link to="/profile" className="chat-menu-link"><PersonSquare /> {profile.name}</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <ColorModeButton />
                    </Nav.Item>                    
                </Nav>
                <hr className="my-3" />
                <Nav className="flex-column">
                    <Nav.Item>
                        <Dropdown>
                            <Dropdown.Toggle variant="link"><ChatLeftDots /> New...</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button" onClick={() => createNewChat('')}>Conversation</Dropdown.Item>
                                {mruOptions}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/template" className="chat-menu-link"><JournalPlus /> Manage templates</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="link" onClick={() => alert("Coming soon")}><Image /> Image tool</Button>
                    </Nav.Item>
                    <hr className="my-3" />
                    <ChatList searchData={searchData} setSearchData={setSearchData} />
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}