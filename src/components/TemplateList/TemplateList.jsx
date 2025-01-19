import { ListGroup } from "react-bootstrap"
import TemplateListItem from "../TemplateListItem";

export default function TemplateList({templates, currentTemplate, itemCallback}) {
    const sortedList = templates.sort((a, b) => (a.name.localeCompare(b.name)));

    const items = sortedList.map(entry => (
        <TemplateListItem key={entry._id} templateId={entry._id} name={entry.name} active={entry._id === currentTemplate._id} itemCallback={itemCallback} />
    ))

    return (
        <ListGroup>
            {items}
        </ListGroup>
    )
}