import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

YesNoModal.propTypes = {
    message: PropTypes.string.isRequired,
    tag: PropTypes.string,
    closeCallback: PropTypes.func.isRequired,
}

export default function YesNoModal({ message, tag, closeCallback }) {
    return (
        <Modal aria-labelledby="dlg-title" show={true} onHide={() => closeCallback({result: false, tag: tag})}>
            <Modal.Header closeButton>
                <Modal.Title id="dlg-title">Bouffon Chat</Modal.Title>
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