import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, } from "react-bootstrap";
import { ChatTextFill, Diagram3Fill, ListTask, PencilFill, PlusLg, XLg } from "react-bootstrap-icons";

import NavHeader from "../../components/NavHeader";
import TemplateView from "../../components/TemplateView";
import TemplateListByCategory from "../../components/TemplateListByCategory";
import TemplateList from "../../components/TemplateList";
import TemplateModal from "../../components/TemplateModal";
import YesNoModal from "../../components/YesNoModal";
import ChatCreateModal from "../../components/ChatCreateModal";
import ErrorHandler from "../../components/ErrorHandler";

import apiUtil from "../../util/apiUtil";
import miscUtil from "../../util/miscUtil";
import chatUtil from "../../util/chatUtil";
import errorUtil from "../../util/errorUtil";
import localStoreUtil from "../../util/localStoreUtil";

import "./TemplatePage.css"
import templatePageLogic from "./TemplatePageLogic";

export default function TemplatePage() {
    const navigate = useNavigate();

    const [showCategoryView, setShowCategoryView] = useState(true);
    const [templateList, setTemplateList] = useState([]);
    const [currentTemplate, setCurrentTemplate] = useState(miscUtil.emptyTemplate);
    const [categoryList, setCategoryList] = useState([]);
    const [errorInfo, setErrorInfo] = useState("");
    const [modalData, setModalData] = useState("");
    const [yesNoModalData, setYesNoModalData] = useState("");
    const [showCreate, setShowCreate] = useState("");

    const profile = localStoreUtil.getProfile();

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await apiUtil.apiGet("/v1/template");

            if (response.success) {
                const allTemplates = response.body.templates;
                setTemplateList(allTemplates);
                setCurrentTemplate(allTemplates.length ? allTemplates[0] : miscUtil.emptyTemplate);
                setCategoryList(miscUtil.uniqueListFromArray(allTemplates, "category"));
            } else {
                const errInfo = errorUtil.handleApiError(response);
                setErrorInfo(errInfo);
            }
        }

        fetchTemplates();
    }, []);

    function goToMainPage() {
        navigate("/main");
    };

    function handleItemClicked(templateId) {
        const template = templateList.find(entry => entry._id === templateId);
        setCurrentTemplate(template);
    }

    function handleNewClicked() {
        const profile = localStoreUtil.getProfile();
        const initData = {
            ...miscUtil.emptyTemplate,
            tone: profile.defaultTone,
            model: profile.defaultModel,
            instructions: profile.defaultInstructions
        };

        setModalData(initData);
    }

    function handleEditClicked() {
        setModalData(currentTemplate);
    }

    function modalClosedCallback(data) {
        if (data) {
            miscUtil.stateAddOrReplace(templateList, setTemplateList, data, "_id");

            if (!categoryList.includes(data.category)) {
                setCategoryList((prev) => ([...prev, data.category]).sort());
            }

            setCurrentTemplate(data);
        }

        setModalData("");
    }

    function handleDeleteClicked() {
        setYesNoModalData("Are you sure you want to delete the selected template?");
    }

    async function yesNoCallback(result) {
        if (result.result) {
            const deleteResult = await templatePageLogic.processDeletion(currentTemplate._id,
                currentTemplate.category, showCategoryView, templateList);

            if (deleteResult.success) {
                setTemplateList(deleteResult.templateList);
                setCategoryList(deleteResult.categoryList);
                setCurrentTemplate(deleteResult.current);
            } else {
                setErrorInfo(deleteResult.errorInfo);
            }
        }

        setYesNoModalData("");
    }

    function createNewChat() {
        const parameters = chatUtil.initNewParameters(profile, currentTemplate);
        setShowCreate(parameters);
    }

    function handleCreateCallback(cancelled) {
        setShowCreate("");

        if (!cancelled) {
            goToMainPage();
        }
    }

    return (
        <>
            <NavHeader icon={<XLg />} callBack={goToMainPage} />
            {errorInfo ? <ErrorHandler errorInfo={errorInfo} /> : null}
            {modalData ? <TemplateModal defaultData={modalData} categories={categoryList} closeCallback={modalClosedCallback} /> : null}
            {yesNoModalData ? <YesNoModal message={yesNoModalData} closeCallback={yesNoCallback} /> : null}
            {showCreate ? <ChatCreateModal parameters={showCreate} closeCallback={handleCreateCallback} /> : null}
            <main>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <Container>
                                <Row>
                                    <Col>
                                        <ButtonToolbar className="template-page-toolbar">
                                            <ButtonGroup className="me-2" aria-label="Templates">
                                                <Button variant="secondary" aria-label="New template" onClick={handleNewClicked}><PlusLg /></Button>
                                                <Button variant="secondary" aria-label="Edit template" onClick={handleEditClicked}><PencilFill /></Button>
                                                <Button variant="secondary" aria-label="Delete template" onClick={handleDeleteClicked}><XLg /></Button>
                                                <Button variant="secondary" aria-label="Create conversation" onClick={createNewChat}><ChatTextFill /></Button>
                                            </ButtonGroup>
                                            <ButtonGroup className="me-2" aria-label="View">
                                                <Button variant="secondary" id="showByCategory" aria-label="Show by category"
                                                    className={showCategoryView ? "active" : null} onClick={() => setShowCategoryView(true)}><Diagram3Fill /></Button>
                                                <Button variant="secondary" id="showAsList" aria-label="Show as list"
                                                    className={showCategoryView ? null : "active"} onClick={() => setShowCategoryView(false)}><ListTask /></Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </Col>
                                </Row>
                                <Row>
                                    {showCategoryView
                                        ? <TemplateListByCategory templates={templateList} currentTemplate={currentTemplate} categories={categoryList} itemCallback={handleItemClicked} />
                                        : <TemplateList templates={templateList} currentTemplate={currentTemplate} itemCallback={handleItemClicked} />}
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} md={8} className="d-none d-md-block">
                            <TemplateView current={currentTemplate} />
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
};
