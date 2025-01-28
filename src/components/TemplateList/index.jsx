import { ListGroup } from "react-bootstrap"
import PropTypes from "prop-types";

import TemplateListItem from "../TemplateListItem";

TemplateList.propTypes = {
    templates: PropTypes.array.isRequired,
    currentTemplate: PropTypes.any,
    itemCallback: PropTypes.func.isRequired,
}

export default function TemplateList({templates, currentTemplate, itemCallback}) {
    const sortedList = templates.sort((a, b) => (a.name.localeCompare(b.name)));

    const items = sortedList.map(entry => (
        <TemplateListItem key={entry._id} templateId={entry._id} name={entry.name} active={entry._id === currentTemplate._id} itemCallback={itemCallback} />
    ))

    return (
        <ListGroup role="list">
            {items}
        </ListGroup>
    )
}