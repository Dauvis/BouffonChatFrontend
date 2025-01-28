import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import ChatCreateForm from "../ChatCreateForm";

ChatCreateModal.propTypes = {
    parameters: PropTypes.any.isRequired,
    closeCallback: PropTypes.func.isRequired
};

export default function ChatCreateModal({ parameters, closeCallback }) {
    return (
        <Modal show={true} onHide={closeCallback} aria-labelledby="new-chat-title">
            <Modal.Header closeButton>
                <Modal.Title id="new-chat-title">New chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {parameters ? <ChatCreateForm parameters={parameters} closeCallback={closeCallback} /> : null}
            </Modal.Body>
        </Modal>
    );
}