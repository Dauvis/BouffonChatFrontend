import { ListGroup } from "react-bootstrap";

export default function TemplateListItem({templateId, name, active, itemCallback}) {
    return (
        <ListGroup.Item active={active} action onClick={() => itemCallback(templateId)}>{name}</ListGroup.Item>
    );
}