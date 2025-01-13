import { ChatDotsFill, ChatFill, BoxSeam } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";

function chatLimitPercent(chat) {
    if (chat.model === "gpt-4o-mini") {
        return 100 * (chat.tokens / 25000);
    }

    if (chat.model === "gpt-40") {
        return 100 * (chat.tokens / 25000);
    }

    return 0;
}

function convertButtonInfo(type) {
    const convertIcon = (type === "active") ? <ChatDotsFill /> : <ChatFill />;
    let convertText = "Save";
    
    if (type === "temp") {
        convertText = "Save as active";
    } else if (type === "active") {
        convertText = "Save as archived";
    } else if (type === "archived") {
        convertText = "Restore as active";
    }

    return { icon: convertIcon, text: convertText };
}

function chatLimitVariant(percent) {
    let limitVariant = "info";

    if (percent >= 90) {
        limitVariant = "danger";
    } else if (percent >= 75) {
        limitVariant = "warning";
    }

    return limitVariant;
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

const chatUtil = { chatLimitPercent, convertButtonInfo, chatLimitVariant, listItemBadge };

export default chatUtil;