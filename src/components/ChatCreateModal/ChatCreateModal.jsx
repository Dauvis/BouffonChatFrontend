import { Modal } from "react-bootstrap";
import ChatCreateForm from "../ChatCreateForm";
import PropTypes from "prop-types";

export default function ChatCreateModal({ show, parameters, closeCallback }) {

    ChatCreateModal.propTypes = {
        show: PropTypes.bool.isRequired,
        parameters: PropTypes.any.isRequired,
        closeCallback: PropTypes.func.isRequired
    };

    return (
        <Modal show={show} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>New chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {parameters ? <ChatCreateForm parameters={parameters} closeCallback={closeCallback} /> : null}
            </Modal.Body>
        </Modal>
    );
}