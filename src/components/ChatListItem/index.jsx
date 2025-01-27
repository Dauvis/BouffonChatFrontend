import {  ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

import ChatListItemBadge from "./ChatListItemBadge";

export default function ChatListItem({isActive, id, type, name, clickCallback}) {
    ChatListItem.propTypes = {
        isActive: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        clickCallback: PropTypes.func.isRequired,
    }
    
    return (
        <ListGroup.Item className="small" active={isActive} action onClick={() => clickCallback(id)}>
            <ChatListItemBadge type={type} /> {name}
        </ListGroup.Item>
    );
}