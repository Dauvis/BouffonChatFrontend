/**
 * creates new chat parameters using profile and template
 * @param {object} profile 
 * @param {object} template 
 * @returns parameters object for new chat dialog
 */
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

function abridgeChat(chat) {
    return { _id: chat._id, name: chat.name, type: chat.type };
}

const chatUtil = { initNewParameters, abridgeChat };

export default chatUtil;