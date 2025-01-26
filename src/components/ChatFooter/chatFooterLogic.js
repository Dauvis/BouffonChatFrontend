/**
 * calculates the percentage that a chat is to its limit
 * @param {object} chat 
 * @returns percentage of limit
 */
function chatLimitPercent(chat) {
    if (chat.model === "gpt-4o-mini" || chat.model === "gpt-4o") {
        return 100 * (chat.tokens / 25000);
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

const chatFooterLogic = { chatLimitPercent, chatLimitVariant };

export default chatFooterLogic;