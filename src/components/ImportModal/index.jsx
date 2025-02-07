import { useState, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import { ChatDataContext } from "../../contexts/ChatDataContext";

import ErrorHandler from "../ErrorHandler";

import errorUtil from "../../util/errorUtil";
import apiUtil from "../../util/apiUtil";

ImportModal.propTypes = {
    closeCallback: PropTypes.func.isRequired,
}

const allowedTypes = ['application/json'];

export default function ImportModal({ closeCallback }) {
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ errorInfo, setErrorInfo ] = useState("");
    const { activeChat, loadChatData } = useContext(ChatDataContext);

    function handleFileChange(event) {
        const files = event.target.files;
        const fileArray = Array.from(files);

        if (fileArray.length > 10) {
            const lengthError = errorUtil.handleInternalError("FILES", "You can only upload up to 10 files at a time");
            setErrorInfo(lengthError);
            return;
        }

        for (let file of fileArray) {
            if (!allowedTypes.includes(file.type)) {
                const typeError = errorUtil.handleInternalError("FILES", `Unsupported file type: ${file.type}`);
                setErrorInfo(typeError);
                return;
            }
        }
        
        setErrorInfo("")
        setSelectedFiles(fileArray);        
    }

    async function performImport() {

        if (!selectedFiles.length) {
            const lengthError = errorUtil.handleInternalError("FILE", "Please select files to upload");
            setErrorInfo(lengthError);
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('files', file));
        const response = await apiUtil.postFormData("/v1/chat/import", formData);

        if (response.success) {
            loadChatData(activeChat._id);
            closeCallback();
        } else {
            const error = errorUtil.handleApiError(response);
            setErrorInfo(error);
        }
    }

    return (
        <Modal aria-labelledby="dlg-title" show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title id="dlg-title">Import</Modal.Title>
            </Modal.Header>
            { errorInfo
                ? <Modal.Body><ErrorHandler errorInfo={errorInfo} redirect={false} /></Modal.Body>
                : null
            }
            <Modal.Body>
                <Form action={performImport}>
                    <Row>
                        <Col>
                            <Form.Group controlId="multipleFiles">
                                <Form.Label>Select one or more files (up to 10)</Form.Label>
                                <Form.Control type="file" multiple onChange={handleFileChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{paddingTop: "1rem"}}>
                            <Button variant="primary" type="submit" style={{marginRight: "0.5rem"}}>Ok</Button>
                            <Button variant="secondary" onClick={closeCallback}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}