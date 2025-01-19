import { Modal, Button } from "react-bootstrap";

export default function YesNoModal({ show, message, tag, closeCallback }) {
    return (
        <Modal show={show} onHide={() => closeCallback({result: false, tag: tag})}>
            <Modal.Header closeButton>
                <Modal.Title>Bouffon Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => closeCallback({result: true, tag: tag})}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={() => closeCallback({result: false, tag: tag})}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}