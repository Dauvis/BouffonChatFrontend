import { Badge, ListGroup } from "react-bootstrap";
import { BoxSeam, ChatDotsFill, ChatFill } from "react-bootstrap-icons";

export default function ChatListItem({isActive, id, type, name, clickCallback}) {
    let icon = <ChatDotsFill />;
    let variant = "primary";

    if (type === "archived") {
        icon = <BoxSeam />;
        variant = "secondary";
    } else if (type === "temp") {
        icon = <ChatFill />;
        variant = "warning";
    }

    return (
        <ListGroup.Item className="small" active={isActive} action onClick={() => clickCallback(id)}>
            <Badge pill bg={variant}>{icon}</Badge> {name}
        </ListGroup.Item>
    );
}