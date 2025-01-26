import { useRef } from "react";
import { Modal, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

export default function ChatRenameModal({ show, curName, closeCallback }) {
    const nameRef = useRef();

    ChatRenameModal.propTypes = {
        show: PropTypes.bool.isRequired,
        curName: PropTypes.string.isRequired,
        closeCallback: PropTypes.func.isRequired
    }

    return (
        <Modal show={show} onHide={() => closeCallback('')}>
            <Modal.Header closeButton>
                <Modal.Title>Rename</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl ref={nameRef} defaultValue={curName}/>
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