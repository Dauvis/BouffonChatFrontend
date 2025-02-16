import {Container, Form, Row, Col, Dropdown, Button, InputGroup} from "react-bootstrap";
import {useRef, useState, useContext } from "react";
import PropTypes from "prop-types";

import { OptionsContext } from "../../contexts/OptionsContext.jsx";

import ErrorHandler from "../ErrorHandler";

import apiUtil from "../../util/apiUtil"
import errorUtil from "../../util/errorUtil";

import "./TemplateForm.css"

TemplateForm.propTypes = {
    defaultData: PropTypes.any.isRequired,
    categories: PropTypes.array.isRequired,
    closeCallback: PropTypes.func.isRequired,
}

export default function TemplateForm({defaultData, categories, closeCallback}) {
    const categoryRef = useRef();
    const options = useContext(OptionsContext);
    const [categoryToggle, setCategoryToggle] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState("");

    // It's funky but it keeps the modal from prematurely closing
    function handleCategorySelected(category, event) {
        event.preventDefault();
        event.stopPropagation();
        categoryRef.current.value = category;
        toggleCategoryToggle();
    }

    async function handleFormAction(formData) {
        const data = {
            _id: formData.get("id"),
            name: formData.get("name"),
            description: formData.get("description"),
            category: formData.get("category"),
            tone: formData.get("tone"),
            model: formData.get("model"),
            instructions: formData.get("instructions"),
            notes: formData.get("notes")
        };

        const callbackData = data._id ? await updateTemplate(data) : await createNewTemplate(data);

        if (callbackData) {
            closeCallback(callbackData);
        }
    }

    async function createNewTemplate(data) {
        const response = await apiUtil.post("/v1/template", data);

        if (!response.success) {
            const errInfo = errorUtil.handleApiError(response);
            setErrorInfo(errInfo);
        }

        return response.success ? response.body.template : null;
    }

    async function updateTemplate(data) {
        const response = await apiUtil.put(`/v1/template/${data._id}`, data);

        if (!response.success) {
            const errInfo = errorUtil.handleApiError(response);
            setErrorInfo(errInfo);
        }

        return response.success ? data : null;
    }

    function toggleCategoryToggle() {
        setCategoryToggle((previous) => !previous);
    }

    const categoryItems = categories.map(entry => (
        <Dropdown.Item key={entry} as="button" onClick={(e) => handleCategorySelected(entry, e)} role="option">
            {entry}
        </Dropdown.Item>
    ))

    const toneOptions = options.toneOptionsList();
    const modelOptions = options.modelOptionsList();

    return (
        <>
        { errorInfo ? <ErrorHandler redirect={false} errorInfo={errorInfo} /> : null}
        <Form action={handleFormAction}>
            <Container>
                <Row>
                    <Col>
                    <input type="hidden" id="id" name="id" value={defaultData._id} />
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" id="name" required defaultValue={defaultData.name} />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" id="description" defaultValue={defaultData.description} />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group >
                        <Form.Label>Category</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control ref={categoryRef} type="text" name="category" id="category" required defaultValue={defaultData.category} />  
                            <Dropdown show={categoryToggle} onToggle={toggleCategoryToggle} role="listbox">
                                <Dropdown.Toggle variant="outline-secondary" aria-haspopup={true}/>
                                <Dropdown.Menu>
                                    {categoryItems}
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>                        
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                        <Form.Label>Persona</Form.Label>
                        <Form.Select name="tone" id="tone" defaultValue={defaultData.tone}>
                            <option value=""></option>
                            {toneOptions}
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Model</Form.Label>
                        <Form.Select name="model" id="model" defaultValue={defaultData.model}>
                            <option value=""></option>
                            {modelOptions}
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" name="instructions" id="instructions" rows={7} defaultValue={defaultData.instructions} />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" name="notes" id="notes" rows={7} defaultValue={defaultData.notes} />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button variant="primary" type="submit" className="template-form-button">Save</Button>
                    <Button variant="secondary" className="template-form-button" onClick={() => closeCallback(null)}>Cancel</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
        </>
    );
}