function chatLimitPercent(chat) {
    if (chat.model === "gpt-4o-mini" || chat.model === "gpt-4o") {
        return 100 * (chat.tokens / 25000);
    }

    return 0;
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
        notes: template.notes,
        template: template ? { id: template._id, name: template.name } : null
    }
}

const chatUtil = { chatLimitPercent, chatLimitVariant, 
    filterChatList, replaceChat, removeChat, initNewParameters, addChat };

export default chatUtil;