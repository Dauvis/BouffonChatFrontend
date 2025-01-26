/**
 * filters the users chat list with criteria
 * @param {array} chatList 
 * @param {string} keyword 
 * @param {boolean} showArchived 
 * @returns array of chats that meet criteria
 */
function filter(chatList, { keyword, showArchived }) {
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

const chatListLogic = { filter };

export default chatListLogic;