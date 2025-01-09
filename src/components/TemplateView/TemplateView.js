import { Container, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap"

export default function TemplateView({current}) {
    return (
        <Container>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <FormControl id="nameText" type="text" disabled value={current?.name} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <FormControl id="descriptionText" type="text" disabled value={current?.description} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Category</FormLabel>
                        <FormControl id="categoryText" type="text" disabled value={current?.category} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <FormLabel>Tone</FormLabel>
                        <FormControl id="toneText" type="text" disabled  value={current?.tone} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl id="instructionsText" as="textarea" rows={8} disabled value={current?.instructions} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <FormLabel>Notes</FormLabel>
                        <FormControl id="notesText" as="textarea" rows={8} disabled value={current?.notes} />
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
}