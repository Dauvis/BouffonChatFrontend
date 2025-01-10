import { Accordion, Alert, ListGroup } from "react-bootstrap"
import { useState, useEffect } from "react";
import "./TemplateListByCategory.css"
import LoadingWait from "../LoadingWait/LoadingWait";
import TemplateListItem from "../TemplateListItem";

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

    const items = categories.map(category => {
        const catItems = groupedTemplates[category].map(entry => (
            <TemplateListItem key={entry._id} templateId={entry._id} name={entry.name} active={entry._id === currentTemplate._id} itemCallback={itemCallback} />
        ));
        
        return (
            <Accordion.Item key={category} eventKey={category}>
                <Accordion.Header>{category}</Accordion.Header>
                <Accordion.Body className="template-category-body">
                    <ListGroup>
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
        <Alert variant="light" className="text-center">No templates fetched</Alert>
    )
}