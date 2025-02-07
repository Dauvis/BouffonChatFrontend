import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

import LoadingWait from "../LoadingWait";
import ErrorHandler from "../ErrorHandler";

import apiUtil from "../../util/apiUtil";
import errorUtil from "../../util/errorUtil";

import { ChatDataContext } from "../../contexts/ChatDataContext";

import "./ExportModal.css";

ExportModal.propTypes = {
    closeCallback: PropTypes.func.isRequired,
}

export default function ExportModal( {closeCallback} ) {
    const [ allChats, setAllChats ] = useState("");
    const [ showAll, setShowAll ] = useState(false);
    const [ selectAll, setSelectAll ] = useState(false);
    const [ selected, setSelected ] = useState("");
    const [ errorInfo, setErrorInfo ] = useState("");
    const { activeChat, loadChatData } = useContext(ChatDataContext);

    useEffect(() => {
        async function loadAllChats() {
            const chatListResponse = await apiUtil.get("/v1/chat");

            if (chatListResponse.success) {
                const chats = chatListResponse.body.chats;
                setAllChats(chats);

                const selectionMap = {};
                for (const chat of chats) {
                    selectionMap[chat._id] = false;
                }
                setSelected(selectionMap);
            } else {
                setAllChats([]);
                setSelected({});
            }
        }
        
        loadAllChats();
    }, []);

    function handleChatCheckChanged(event) {
        const control = event.target; 
        const chatId = control.id;
        const updated = {
            ...selected,
            [chatId]: control.checked
        };
        setSelected(updated);
    }

    async function performExport(formData) {        
        const purge = formData.get("purge") ? true : false;
        const selection = allChats.filter(c => ((!showAll && c.type === "archived" || showAll) && (!selectAll && selected[c._id] || selectAll))).map(c => c._id);

        const response = await apiUtil.postGetBlob("/v1/chat/export", { purge, selection });

        if (response.success) {
            const url = window.URL.createObjectURL(response.body);
            const a = document.createElement('a');
            a.href = url;
            a.download = response.filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);            

            if (purge) {
                loadChatData(activeChat._id);
            }
        } else {
            const error = errorUtil.handleApiError(response);
            setErrorInfo(error);
        }

        closeCallback();
    }

    const listContents = allChats
        ? allChats.filter(chat => showAll || chat.type === "archived").map(chat => (
            <ListGroup.Item key={chat._id}>
                <Form.Check id={chat._id} name={chat._id} type="checkbox" label={chat.name} 
                    checked={ selectAll || selected[chat._id]}
                    onChange={handleChatCheckChanged} />
            </ListGroup.Item>
        ))
        : <LoadingWait text="Loading" />

    return (
        <Modal aria-labelledby="dlg-title" show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title id="dlg-title">Export</Modal.Title>
            </Modal.Header>
            { errorInfo 
                ? <Modal.Body><ErrorHandler errorInfo={errorInfo} redirect={false}/></Modal.Body>
                : null 
            }
            <Modal.Body>
                <Form action={performExport}>
                    <Row>
                        <Col>
                            <Form.Check type="checkbox" id="selectAll" name="selectAll" label="Select all" checked={selectAll}
                                onChange={() => setSelectAll((prev) => !prev)} />
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Form.Switch id="showAll" name="showAll" label="Show all" checked={showAll} 
                                onChange={() => setShowAll((prev) => !prev)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="chat-list-scroll export-list">
                                <ListGroup>
                                    { listContents }
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="export-footer">
                            <Button variant="primary" type="submit" style={{ marginRight: "0.5rem"}}>Ok</Button>
                            <Button variant="secondary" onClick={closeCallback}>Cancel</Button>
                            <Form.Check type="switch" className="export-purge" id="purge" name="purge" label="Delete exported" defaultChecked={false} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
