import { Badge, ListGroup } from "react-bootstrap";
import { BoxSeam, ChatFill, ChatLeftText } from "react-bootstrap-icons";

export default function ChatListItem({isActive, id, type, name, clickCallback}) {
    let icon = <ChatFill />;
    let variant = "primary";

    if (type === "archived") {
        icon = <BoxSeam />;
        variant = "secondary";
    } else if (type === "temp") {
        icon = <ChatLeftText />;
        variant = "warning";
    }

    return (
        <ListGroup.Item className="small" active={isActive} action onClick={() => clickCallback(id)}>
            <Badge pill bg={variant}>{icon}</Badge> {name}
        </ListGroup.Item>
    );
}