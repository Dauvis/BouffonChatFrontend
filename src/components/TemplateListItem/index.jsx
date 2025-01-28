import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

TemplateListItem.propTypes = {
    templateId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    itemCallback: PropTypes.any.isRequired,
}

export default function TemplateListItem({templateId, name, active, itemCallback}) {
    return (
        <ListGroup.Item active={active} aria-selected={active} role="listitem" action onClick={() => itemCallback(templateId)}>
            {name}
        </ListGroup.Item>
    );
}