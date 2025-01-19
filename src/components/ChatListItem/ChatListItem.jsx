import {  ListGroup } from "react-bootstrap";
import chatUtil from "../../util/chatUtil";

export default function ChatListItem({isActive, id, type, name, clickCallback}) {
    const badge = chatUtil.listItemBadge(type);

    return (
        <ListGroup.Item className="small" active={isActive} action onClick={() => clickCallback(id)}>
            {badge} {name}
        </ListGroup.Item>
    );
}