import { Col, Form, Row, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { OptionsContext } from "../../contexts/OptionsContext";
import { ChatDataContext } from "../../contexts/ChatDataContext";
import "./ChatCreateForm.css"
import apiUtil from "../../util/apiUtil";
import chatUtil from "../../util/chatUtil";
import miscUtil from "../../util/miscUtil";
import errorUtil from "../../util/errorUtil";
import ErrorHandler from "../ErrorHandler";
import PropTypes from "prop-types";

export default function ChatCreateForm({ parameters, closeCallback }) {
    const options = useContext(OptionsContext);
    const { setActiveChat, chatListData, setChatListData } = useContext(ChatDataContext);
    const [ errorInfo, setErrorInfo ] = useState('');

    ChatCreateForm.propTypes = {
        parameters: PropTypes.any.isRequired,
        closeCallback: PropTypes.func.isRequired,
    }

    const toneOptions = options.toneOptionsList();
    const modelOptions = options.modelOptionsList();

    async function handleFormAction(formData) {
        const templateId = formData.get("templateId");
        const templateName = formData.get("templateName");

        const data = {
            name: formData.get("name"),
            tone: formData.get("tone"),
            model: formData.get("model"),
            instructions: formData.get("instructions"),
            notes: formData.get("notes"),
            type: formData.get("temporary") ? "temp" : "active",
            template: templateId ? { id: templateId, name: templateName } : null
        }

        const response = await apiUtil.apiPost("/v1/chat", data);

        if (response.success) {
            const newChat = response.body.chat;
            const newMRU = response.body.mru;
            const newList = chatUtil.addChat(chatListData, { _id: newChat._id, name: newChat.name, type: newChat.type });
            setChatListData(newList);
            setActiveChat(newChat);
            miscUtil.setTrackedChatId(newChat._id)

            if (newMRU) {
                miscUtil.setTemplateMRU(newMRU);
            }

            closeCallback();
        } else {
            const errInfo = errorUtil.handleApiError(response);
            setErrorInfo(errInfo);
        }
    }

    return (
        <>
        { errorInfo ? <ErrorHandler errorInfo={errorInfo} /> : null }
        <Form action={handleFormAction}>
            <Row>
                <Col>
                    <input type="hidden" id="templateId" name="templateId" value={parameters.template.id} />
                    <input type="hidden" id="templateName" name="templateName" value={parameters.template.name} />
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name" name="name" required defaultValue={parameters.name} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Tone</Form.Label>
                        <Form.Select name="tone" id="tone" required defaultValue={parameters.tone}>
                            <option value=""></option>
                            {toneOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Model</Form.Label>
                        <Form.Select name="model" id="model" required defaultValue={parameters.model}>
                            <option value=""></option>
                            {modelOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" name="instructions" id="instructions" rows={7} defaultValue={parameters.instructions} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" name="notes" id="notes" rows={7} defaultValue={parameters.notes} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="chat-create-footer">
                    <Button variant="primary" type="submit" className="template-form-button">Save</Button>
                    <Button variant="secondary" className="template-form-button" onClick={() => closeCallback()}>Cancel</Button>
                    <Form.Check type="switch" className="chat-create-temp" id="temporary" name="temporary" label="Temporary" defaultChecked={true} />
                </Col>
            </Row>

        </Form>
        </>
    );
}