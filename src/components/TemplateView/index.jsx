import { Container, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap"
import { useContext } from "react";
import PropTypes from "prop-types";

import { OptionsContext } from "../../contexts/OptionsContext";

TemplateView.propTypes = {
    current: PropTypes.any.isRequired,
}

export default function TemplateView({current}) {
    const options = useContext(OptionsContext);

    const curModelLabel = options.modelLabel(current.model);

    return (
        <Container>
            <Row>
                <Col>
                    <FormGroup controlId="nameText">
                        <FormLabel>Name</FormLabel>
                        <FormControl type="text" readOnly value={current.name} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup controlId="descriptionText">
                        <FormLabel>Description</FormLabel>
                        <FormControl type="text" readOnly value={current.description} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup controlId="categoryText">
                        <FormLabel>Category</FormLabel>
                        <FormControl type="text" readOnly value={current.category} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup controlId="toneText">
                        <FormLabel>Persona</FormLabel>
                        <FormControl type="text" readOnly  value={current.tone} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                <FormGroup controlId="modelText">
                    <FormLabel>Model</FormLabel>
                    <FormControl type="text" readOnly value={curModelLabel} />
                </FormGroup>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup controlId="instructionsText">
                        <FormLabel>Instructions</FormLabel>
                        <FormControl as="textarea" rows={7} readOnly value={current.instructions} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup controlId="notesText">
                        <FormLabel>Notes</FormLabel>
                        <FormControl as="textarea" rows={7} readOnly value={current.notes} />
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
}