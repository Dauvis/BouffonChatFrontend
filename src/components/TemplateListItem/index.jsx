import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

export default function TemplateListItem({templateId, name, active, itemCallback}) {
    TemplateListItem.propTypes = {
        templateId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        itemCallback: PropTypes.any.isRequired,
    }

    return (
        <ListGroup.Item active={active} action onClick={() => itemCallback(templateId)}>{name}</ListGroup.Item>
    );
}