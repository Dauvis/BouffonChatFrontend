import { useRef } from "react";
import { Modal, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";

export default function ChatRenameModal({ show, curName, closeCallback }) {
    const nameRef = useRef();

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