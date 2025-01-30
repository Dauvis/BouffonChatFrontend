import apiUtil from "../../util/apiUtil";
import chatUtil from "../../util/chatUtil";
import miscUtil from "../../util/miscUtil";

/**
 * calculates the percentage that a chat is to its limit
 * @param {object} chat 
 * @returns percentage of limit
 */
function chatLimitPercent(chat) {
    if (chat.model === "gpt-4o-mini" || chat.model === "gpt-4o") {
        return 100 * (chat.tokens / 25000);
    }

    if (chat.model === "o1-preview" || chat.model === "o1-mini") {
        return 100 * (chat.tokens / 5000);
    }

    return 0;
}

/**
 * determines the variant to use for progress bar
 * based on limit percent
 * @param {number} percent 
 * @returns variant name
 */
function chatLimitVariant(percent) {
    if (percent >= 90) {
        return "danger";
    } else if (percent >= 75) {
        return "warning";
    }

    return "info";
}

async function saveChat(activeChat, chatListData, changes) {
    const response = await apiUtil.patch(`/v1/chat/${activeChat._id}`, changes);

    if (response.success) {
        const updatedChat = {
            ...activeChat,
            name: changes.name,
            type: changes.type
        }

        const abridged = chatUtil.abridgeChat(updatedChat);
        const updatedList = miscUtil.addOrReplaceInArray(chatListData, abridged, "_id");

        return { success: true, chatList: updatedList, active: updatedChat };
    } else {
        return { success: false, errorResponse: response };
    }
}

async function deleteChat(activeChatId, chatListData) {
    const response = await apiUtil.remove(`/v1/chat/${activeChatId}`)

    if (response.success) {
        const updatedList = miscUtil.removeFromArray(chatListData, activeChatId, "_id");

        return { success: true, chatList: updatedList };
    } else {
        return { success: false, errorResponse: response };
    }
}

function chatWithPlaceholder(chat, userMessage) {
    const exchanges = chat.exchanges;
    const updated = {
        ...chat,
        exchanges: [
            ...exchanges,
            { 
                userMessage,
                assistantMessage: '',
                _id: "000000000000000000000000"
            }
        ]
    };

    return updated;
}

function addExchangeData(chat, userMessage, exchangeData) {
    const curExchanges = chat.exchanges;
    const updated = {
        ...chat,
        tokens: exchangeData.tokens,
        lastActivity: Date.now(),
        exchanges: [
            ...curExchanges,
            { 
                userMessage, 
                assistantMessage: exchangeData.assistantMessage, 
                _id: exchangeData.exchangeId
            }
        ]
    };

    return updated;
}

function removeExchange(chat, exchange) {
    const exchanges = chat.exchanges;

    const updated = {
        ...chat,
        exchanges: exchanges.filter(e => e._id !== exchange._id)
    };

    return updated;
}

function addExchange(chat, exchange) {
    const exchanges = chat.exchanges;

    const updated = {
        ...chat,
        exchanges: [...exchanges, exchange]
    };

    return updated;
}

const chatFooterLogic = { chatLimitPercent, chatLimitVariant, saveChat, deleteChat, chatWithPlaceholder, 
    addExchangeData, removeExchange, addExchange };

export default chatFooterLogic;