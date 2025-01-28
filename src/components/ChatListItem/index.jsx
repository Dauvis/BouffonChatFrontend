import {  ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

import ChatListItemBadge from "./ChatListItemBadge";

ChatListItem.propTypes = {
    isActive: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    clickCallback: PropTypes.func.isRequired,
}

export default function ChatListItem({isActive, id, type, name, clickCallback}) {
    return (
        <ListGroup.Item className="small" active={isActive} action onClick={() => clickCallback(id)}>
            <ChatListItemBadge type={type} /> {name}
        </ListGroup.Item>
    );
}