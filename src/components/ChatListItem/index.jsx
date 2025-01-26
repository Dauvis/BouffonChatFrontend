import {  ListGroup, Badge } from "react-bootstrap";
import { ChatDotsFill, BoxSeam, ChatFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

export default function ChatListItem({isActive, id, type, name, clickCallback}) {
    ChatListItem.propTypes = {
        isActive: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        clickCallback: PropTypes.func.isRequired,
    }
    
    function listItemBadge(type) {
        let icon = <ChatDotsFill />;
        let variant = "primary";
    
        if (type === "archived") {
            icon = <BoxSeam />;
            variant = "secondary";
        } else if (type === "temp") {
            icon = <ChatFill />;
            variant = "warning";
        }
    
        return ( <Badge pill bg={variant}>{icon}</Badge> );
    }    

    const badge = listItemBadge(type);

    return (
        <ListGroup.Item className="small" active={isActive} action onClick={() => clickCallback(id)}>
            {badge} {name}
        </ListGroup.Item>
    );
}