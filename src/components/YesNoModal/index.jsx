import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default function YesNoModal({ show, message, tag, closeCallback }) {
    YesNoModal.propTypes = {
        show: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        tag: PropTypes.string,
        closeCallback: PropTypes.func.isRequired,
    }
    
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