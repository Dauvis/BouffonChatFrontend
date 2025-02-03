import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

ImportModal.propTypes = {
    closeCallback: PropTypes.func.isRequired,
}

export default function ImportModal({ closeCallback }) {
    return (
        <Modal aria-labelledby="dlg-title" show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title id="dlg-title">Import</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="multipleFiles">
                                <Form.Label>Select one or more files (up to 10)</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{paddingTop: "1rem"}}>
                            <Button variant="primary" onClick={closeCallback} style={{marginRight: "0.5rem"}}>Ok</Button>
                            <Button variant="secondary" onClick={closeCallback}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}