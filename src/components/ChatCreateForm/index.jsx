import { Col, Form, Row, Button } from "react-bootstrap";
import { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { OptionsContext } from "../../contexts/OptionsContext";
import { ChatDataContext } from "../../contexts/ChatDataContext";

import ErrorHandler from "../ErrorHandler";

import apiUtil from "../../util/apiUtil";
import errorUtil from "../../util/errorUtil";
import localStoreUtil from "../../util/localStoreUtil";
import miscUtil from "../../util/miscUtil";
import chatUtil from "../../util/chatUtil";

import "./ChatCreateForm.css"

ChatCreateForm.propTypes = {
    parameters: PropTypes.any.isRequired,
    closeCallback: PropTypes.func.isRequired,
}

export default function ChatCreateForm({ parameters, closeCallback }) {
    const options = useContext(OptionsContext);
    const { setActiveChat, chatListData, setChatListData } = useContext(ChatDataContext);
    const [ errorInfo, setErrorInfo ] = useState('');
    const [ sysDisabled, setSysDisabled] = useState(false);
    const modelSelect = useRef();
    const toneSelect = useRef();

    const toneOptions = options.toneOptionsList();
    const modelOptions = options.modelOptionsList();

    function handleModelState() {
        const modelId = modelSelect.current?.value;
        const model = options.findModel(modelId);

        if (model) {
            setSysDisabled(!model.devMsg);

            if (model.tone) {
                toneSelect.current.value = model.tone;
            }
        }
    }

    useEffect(() => {
        handleModelState();
    }, [])

    async function handleFormAction(formData) {
        const templateId = formData.get("templateId");
        const templateName = formData.get("templateName");
        const modelId = modelSelect.current?.value;
        const model = options.findModel(modelId);

        const data = {
            name: formData.get("name"),
            tone: formData.get("tone") || model.tone,
            model: formData.get("model"),
            instructions: formData.get("instructions"),
            notes: formData.get("notes"),
            type: formData.get("temporary") ? "temp" : "active",
            template: templateId ? { id: templateId, name: templateName } : null
        }

        const response = await apiUtil.post("/v1/chat", data);

        if (response.success) {
            const newChat = response.body.chat;
            const newMRU = response.body.mru;
            const abridged = chatUtil.abridgeChat(newChat);
            const unsortedList = miscUtil.addOrReplaceInArray(chatListData, abridged, "_id");
            const newList = unsortedList.sort((a, b) => a.name.localeCompare(b.name));
            setChatListData(newList);
            setActiveChat(newChat);
            localStoreUtil.setTrackedChatId(newChat._id)

            if (newMRU) {
                localStoreUtil.setTemplateMRU(newMRU);
            }

            closeCallback(false);
        } else {
            const errInfo = errorUtil.handleApiError(response);
            setErrorInfo(errInfo);
        }
    }

    return (
        <>
        { errorInfo ? <ErrorHandler errorInfo={errorInfo} redirect={false} /> : null }
        <Form action={handleFormAction}>
            <Row>
                <Col>
                    <input type="hidden" id="templateId" name="templateId" value={parameters.template.id} />
                    <input type="hidden" id="templateName" name="templateName" value={parameters.template.name} />
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" required defaultValue={parameters.name} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="tone">
                        <Form.Label>Persona</Form.Label>
                        <Form.Select ref={toneSelect} name="tone" required defaultValue={parameters.tone} disabled={sysDisabled}>
                            <option value=""></option>
                            {toneOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="model">
                        <Form.Label>Model</Form.Label>
                        <Form.Select ref={modelSelect} name="model" required defaultValue={parameters.model} 
                            onChange={handleModelState}>
                            <option value=""></option>
                            {modelOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="instructions">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" name="instructions" rows={7} defaultValue={parameters.instructions} disabled={sysDisabled}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" name="notes" rows={7} defaultValue={parameters.notes} disabled={sysDisabled}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="chat-create-footer">
                    <Button variant="primary" type="submit" className="template-form-button">Save</Button>
                    <Button variant="secondary" className="template-form-button" onClick={() => closeCallback(true)}>Cancel</Button>
                    <Form.Check type="switch" className="chat-create-temp" id="temporary" name="temporary" label="Temporary" defaultChecked={false} />
                </Col>
            </Row>
        </Form>
        </>
    );
}