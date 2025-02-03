import { Offcanvas, Nav, Dropdown } from "react-bootstrap";
import { PersonSquare, ChatLeftDots, JournalPlus, Tools } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

import ChatList from "../ChatList";
import ColorModeButton from "../ColorModeButton";
import ChatCreateModal from "../ChatCreateModal";
import ExportModal from "../ExportModal";
import ImportModal from "../ImportModal";

import miscUtil from "../../util/miscUtil"
import chatUtil from "../../util/chatUtil";
import apiUtil from "../../util/apiUtil";
import localStoreUtil from "../../util/localStoreUtil";

import "./MainOffcanvas.css";

MainOffcanvas.propTypes = {
    offcanvasState: PropTypes.bool.isRequired,
    closeCallBack: PropTypes.func.isRequired,
}

const noModal = 0;
const createModal = 1;
const exportModal = 2;
const importModal = 3;

export default function MainOffcanvas({ offcanvasState, closeCallBack }) {
    const [ modalState, setModalState ] = useState({ modal: noModal, args: {} });
    const [ newOpen, setNewOpen ] = useState(false);
    const [ toolsOpen, setToolsOpen ] = useState(false);

    const profile = localStoreUtil.getProfile();

    async function createNewChat(templateId) {
        let template = miscUtil.emptyTemplate;

        if (templateId) {
            const response = await apiUtil.get(`/v1/template/${templateId}`);

            if (response.success) {
                template = response.body.templates[0];
            } else {
                return;
            }
        }

        closeCallBack();
        const parameters = chatUtil.initNewParameters(profile, template);
        setModalState({ modal: createModal, args: parameters });
    }

    function exportChats() {
        closeCallBack();
        setModalState({ modal: exportModal, args: {}});
    }

    function importChats() {
        closeCallBack();
        setModalState({ modal: importModal, args: {}});
    }

    function handleGeneralModalCallback() {
        setModalState({ modal: noModal, args: {}});
    }

    const templateMru = localStoreUtil.getTemplateMRU();
    const mruOptions = templateMru.map(entry => (
        <Dropdown.Item key={entry.id} as="button" onClick={() => createNewChat(entry.id)}>{entry.name}</Dropdown.Item>
    ));

    return (
        <>
        { modalState.modal === createModal ? <ChatCreateModal parameters={modalState.args} closeCallback={handleGeneralModalCallback} /> : null }
        { modalState.modal === exportModal ? <ExportModal closeCallback={handleGeneralModalCallback} /> : null}
        { modalState.modal === importModal ? <ImportModal closeCallback={handleGeneralModalCallback} /> : null }
        <Offcanvas aria-labelledby="main-menu-title" show={offcanvasState} placement="end" onHide={closeCallBack}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="main-menu-title">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Link to="/profile" className="chat-menu-link" aria-label="Navigate to profile"><PersonSquare /> {profile.name}</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <ColorModeButton />
                    </Nav.Item>                    
                </Nav>
                <hr className="my-3" />
                <Nav className="flex-column">
                    <Nav.Item>
                        <Dropdown onToggle={(isOpen) => setNewOpen(isOpen)}>
                            <Dropdown.Toggle variant="link" aria-haspopup="true" aria-expanded={newOpen} aria-controls="new-chat-menu">
                                <ChatLeftDots /> New...
                            </Dropdown.Toggle>
                            <Dropdown.Menu id="new-chat-menu">
                                <Dropdown.Item as="button" onClick={() => createNewChat('')}>Conversation</Dropdown.Item>
                                {mruOptions}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/template" className="chat-menu-link" aria-label="Navigate to template management"><JournalPlus /> Manage templates</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Dropdown onToggle={(isOpen) => setToolsOpen(isOpen)}>
                            <Dropdown.Toggle variant="link" aria-haspopup="true" aria-expanded={toolsOpen} aria-controls="tools-menu">
                                <Tools /> Tools...
                            </Dropdown.Toggle>
                            <Dropdown.Menu id="tools-menu">
                                <Dropdown.Item as="button" onClick={() => importChats()}>Import</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={() => exportChats()}>Export</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>
                    <hr className="my-3" />
                    <ChatList />
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}