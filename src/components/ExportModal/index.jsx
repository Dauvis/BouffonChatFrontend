import { Modal, Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

import "./ExportModal.css";

ExportModal.propTypes = {
    closeCallback: PropTypes.func.isRequired,
}

export default function ExportModal( {closeCallback} ) {
    return (
        <Modal aria-labelledby="dlg-title" show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title id="dlg-title">Export</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Check type="checkbox" label="Select all" />
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Form.Switch label="Show all" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="chat-list-scroll export-list">
                                <ListGroup>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                    <ListGroup.Item><Form.Check type="checkbox" label="Testing" /></ListGroup.Item>
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" style={{ marginRight: "0.5rem"}} onClick={closeCallback}>Ok</Button>
                            <Button variant="secondary" onClick={closeCallback}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
