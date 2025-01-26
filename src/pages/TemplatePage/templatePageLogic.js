import apiUtil from "../../util/apiUtil";
import miscUtil from "../../util/miscUtil";
import errorUtil from "../../util/errorUtil";

async function processDeletion(curTemplateId, curCategory, showCategoryView, templateList) {
    const curIndex = templateList.findIndex(t => t._id === curTemplateId);
    const response = await apiUtil.apiDelete(`/v1/template/${curTemplateId}`);

    if (response.success) {
        const updatedTempList = templateList.filter(t => t._id !== curTemplateId);
        const updatedCatList = miscUtil.uniqueListFromArray(updatedTempList, "category");

        let newCurrent;

        if (showCategoryView) {
            newCurrent = updatedTempList.find(t => t.category === curCategory);
        } else {
            newCurrent = updatedTempList.length <= curIndex ? updatedTempList[curIndex] :
                updatedTempList.length && curIndex !== 0 ? updatedTempList[curIndex - 1] : null;
        }

        if (!newCurrent) {
            newCurrent = updatedTempList.length ? updatedTempList[0] : miscUtil.emptyTemplate;
        }

        return { success: true, templateList: updatedTempList, categoryList: updatedCatList, current: newCurrent };
    } else {
        const errInfo = errorUtil.handleApiError(response);
        return { success: false, errorInfo: errInfo};
    }
}

const templatePageLogic = { processDeletion };

export default templatePageLogic;