import { Container, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap"

export default function TemplateView() {
    return (
        <Container>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <FormControl id="nameText" type="text" disabled readonly />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <FormControl id="descriptionText" type="text" disabled readonly />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Category</FormLabel>
                        <FormControl id="categoryText" type="text" disabled readonly />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <FormLabel>Tone</FormLabel>
                        <FormControl id="toneText" type="text" disabled readonly />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl id="instructionsText" as="textarea" rows={8} disabled readonly />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Notes</FormLabel>
                        <FormControl id="notesText" as="textarea" rows={8} disabled readonly />
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
}