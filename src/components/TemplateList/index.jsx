import { ListGroup } from "react-bootstrap"
import PropTypes from "prop-types";

import TemplateListItem from "../TemplateListItem";

export default function TemplateList({templates, currentTemplate, itemCallback}) {
    TemplateList.propTypes = {
        templates: PropTypes.array.isRequired,
        currentTemplate: PropTypes.any,
        itemCallback: PropTypes.func.isRequired,
    }

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