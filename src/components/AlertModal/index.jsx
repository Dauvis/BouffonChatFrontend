import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

AlertModal.propTypes = {
    message: PropTypes.string.isRequired,
    closeCallback: PropTypes.func.isRequired,
}

export default function AlertModal({ message, closeCallback }) {
    return (
        <Modal aria-labelledby="dlg-title" show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title id="dlg-title">Bouffon Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeCallback}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}