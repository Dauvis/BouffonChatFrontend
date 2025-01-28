import { useRef } from "react";
import { Modal, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

ChatRenameModal.propTypes = {
    curName: PropTypes.string.isRequired,
    closeCallback: PropTypes.func.isRequired
}

export default function ChatRenameModal({ curName, closeCallback }) {
    const nameRef = useRef();

    return (
        <Modal aria-labelledby="chat-rename-title" show={true} onHide={() => closeCallback('')}>
            <Modal.Header closeButton>
                <Modal.Title as="h1" id="chat-rename-title">Rename</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup controlId="name">
                    <FormLabel>Name</FormLabel>
                    <FormControl ref={nameRef} defaultValue={curName} autoFocus />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => closeCallback(nameRef.current.value)}>
                    Save
                </Button>
                <Button variant="secondary" onClick={() => closeCallback('')}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}