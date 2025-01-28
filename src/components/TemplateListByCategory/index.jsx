import { Accordion, Alert, ListGroup } from "react-bootstrap"
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import LoadingWait from "../LoadingWait";
import TemplateListItem from "../TemplateListItem";

import "./TemplateListByCategory.css"

TemplateListByCategory.propTypes = {
    templates: PropTypes.array.isRequired,
    currentTemplate: PropTypes.any,
    categories: PropTypes.array.isRequired,
    itemCallback: PropTypes.func.isRequired,
}

export default function TemplateListByCategory({ templates, currentTemplate, categories, itemCallback }) {
    const [curActiveKey, setCurActiveKey] = useState('');

    useEffect(() => {
        setCurActiveKey(currentTemplate.category)
    }, [currentTemplate])

    if (!categories) {
        return (<LoadingWait />);
    }

    const groupedTemplates = templates.reduce((acc, entry) => {
        const key = entry.category;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(entry);

        return acc;
    }, {});

    const sortedCats = categories.sort();
    const items = sortedCats.map(category => {
        const catItems = groupedTemplates[category].map(entry => (
            <TemplateListItem key={entry._id} templateId={entry._id} name={entry.name} active={entry._id === currentTemplate._id} itemCallback={itemCallback} />
        ));
        
        return (
            <Accordion.Item key={category} eventKey={category}>
                <Accordion.Header>{category}</Accordion.Header>
                <Accordion.Body className="template-category-body">
                    <ListGroup role="list">
                        {catItems}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        );
    });

    function handleOnSelect(eventKey) {
        setCurActiveKey(eventKey);
    }

    return (
        items.length ?   
        <Accordion activeKey={curActiveKey} onSelect={handleOnSelect}>
            {items}
        </Accordion>
        :
        <Alert role="alert" variant="light" className="text-center">No templates fetched</Alert>
    )
}