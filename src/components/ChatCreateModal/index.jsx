import { Modal } from "react-bootstrap";
import ChatCreateForm from "../ChatCreateForm";
import PropTypes from "prop-types";

export default function ChatCreateModal({ parameters, closeCallback }) {

    ChatCreateModal.propTypes = {
        parameters: PropTypes.any.isRequired,
        closeCallback: PropTypes.func.isRequired
    };

    return (
        <Modal show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>New chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {parameters ? <ChatCreateForm parameters={parameters} closeCallback={closeCallback} /> : null}
            </Modal.Body>
        </Modal>
    );
}