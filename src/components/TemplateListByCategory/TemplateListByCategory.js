import { Accordion, ListGroup } from "react-bootstrap"
import "./TemplateListByCategory.css"

export default function TemplateListByCategory() {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Category 1</Accordion.Header>
                <Accordion.Body className="template-category-body">
                    <ListGroup>
                    <ListGroup.Item active>Item 1</ListGroup.Item>
                    <ListGroup.Item>Item 2</ListGroup.Item>
                    <ListGroup.Item>Item 3</ListGroup.Item>
                    <ListGroup.Item>Item 4</ListGroup.Item>
                    <ListGroup.Item>Item 5</ListGroup.Item>
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Category 2</Accordion.Header>
                <Accordion.Body className="template-category-body">
                <ListGroup>
                    <ListGroup.Item>Item 1</ListGroup.Item>
                    <ListGroup.Item>Item 2</ListGroup.Item>
                    <ListGroup.Item>Item 3</ListGroup.Item>
                    <ListGroup.Item>Item 4</ListGroup.Item>
                    <ListGroup.Item>Item 5</ListGroup.Item>
                </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Category 3</Accordion.Header>
                <Accordion.Body className="template-category-body">
                <ListGroup>
                    <ListGroup.Item>Item 1</ListGroup.Item>
                    <ListGroup.Item>Item 2</ListGroup.Item>
                    <ListGroup.Item>Item 3</ListGroup.Item>
                    <ListGroup.Item>Item 4</ListGroup.Item>
                    <ListGroup.Item>Item 5</ListGroup.Item>
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}