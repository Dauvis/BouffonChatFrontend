import { Badge } from "react-bootstrap";
import { ChatDotsFill, BoxSeam, ChatFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

ChatListItemBadge.propTypes = {
    type: PropTypes.string.isRequired,
};

export default function ChatListItemBadge({type}) {
        const badgeTraits = 
            (type === "archived") ? { icon: <BoxSeam />, variant: "secondary", label: "Archived" } :
            (type === "temp") ? { icon: <ChatFill />, variant: "warning", label: "Temporary" } :
            { icon: <ChatDotsFill />, variant: "info", label: "Active" };

    return (
        <Badge pill bg={badgeTraits.variant} aria-label={badgeTraits.label}>{badgeTraits.icon}</Badge>
    );
}