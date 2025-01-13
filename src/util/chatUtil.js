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

function filterChatList(chatList, keyword, showArchived) {
    const lowerKeyword = keyword.toLocaleLowerCase();
    let filteredList = chatList;

    if (!showArchived) {
        filteredList = filteredList.filter(c => c.type !== "archived");
    }

    if (keyword) {
        filteredList = filteredList.filter(c => c.name.toLocaleLowerCase().includes(lowerKeyword));
    }

    return filteredList;
}

function replaceChat(chatList, updated) {
    return chatList.map(c => (
        c._id === updated._id ? updated : c
    ));
}

function removeChat(chatList, chatId) {
    return chatList.filter(c => c._id !== chatId);
}

function addChat(chatList, newChat) {
    const list = [ ...chatList, newChat ];
    return list.sort((a, b) => a.name.localeCompare(b.name));
}

function initNewParameters(profile, template) {
    return {
        name: '',
        tone: template.tone || profile.defaultTone,
        model: template.model || profile.defaultModel,
        instructions: template.instructions || profile.defaultInstructions,
        notes: template.notes
    }
}

const chatUtil = { chatLimitPercent, convertButtonInfo, chatLimitVariant, listItemBadge, 
    filterChatList, replaceChat, removeChat, initNewParameters, addChat };

export default chatUtil;