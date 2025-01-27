import { Badge } from "react-bootstrap";
import { ChatDotsFill, BoxSeam, ChatFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

export default function ChatListItemBadge({type}) {
        ChatListItemBadge.propTypes = {
            type: PropTypes.string.isRequired,
        };

        let icon = <ChatDotsFill />;
        let variant = "info";
    
        if (type === "archived") {
            icon = <BoxSeam />;
            variant = "secondary";
        } else if (type === "temp") {
            icon = <ChatFill />;
            variant = "warning";
        }

    return (
        <Badge pill bg={variant}>{icon}</Badge>
    );
}