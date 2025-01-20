import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, } from "react-bootstrap";
import { ChatTextFill, Diagram3Fill, ListTask, PencilFill, PlusLg, XLg } from "react-bootstrap-icons";
import NavHeader from "../../components/NavHeader";
import TemplateView from "../../components/TemplateView";
import TemplateListByCategory from "../../components/TemplateListByCategory";
import "./TemplatePage.css"
import TemplateList from "../../components/TemplateList";
import apiUtil from "../../util/apiUtil.js";
import TemplateModal from "../../components/TemplateModal";
import YesNoModal from "../../components/YesNoModal";
import miscUtil from "../../util/miscUtil.js";
import chatUtil from "../../util/chatUtil.jsx";
import ChatCreateModal from "../../components/ChatCreateModal";
import ErrorHandler from "../../components/ErrorHandler";

export default function TemplatePage() {
  const navigate = useNavigate();

  const [showCategoryView, setShowCategoryView] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(miscUtil.emptyTemplate);
  const [categoryList, setCategoryList] = useState([]);
  const [errorResponse, setErrorResponse] = useState('');
  const [modalData, setModalData] = useState({show: false});
  const [yesNoModalData, setYesNoModalData] = useState({show: false, message: ''});
  const [ showCreate, setShowCreate] = useState({show: false, parameters:''});

  const profile = miscUtil.getProfile();

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await apiUtil.apiGet("/v1/template");

      if (response.success) {
        const allTemplates = response.body.templates;
        setTemplateList(allTemplates);
        setCurrentTemplate(allTemplates.length ? allTemplates[0] : miscUtil.emptyTemplate);
        setCategoryList([...new Set(allTemplates.map(entry => entry.category))]);
      } else {
        setErrorResponse(response);
        console.log(`Error fetching templates: ${response.body.message}`);
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
    const profile = miscUtil.getProfile();
    const initData = {
      ...miscUtil.emptyTemplate,
      tone: profile.defaultTone,
      model: profile.defaultModel,
      instructions: profile.defaultInstructions
    };

    setModalData({show: true, data: initData});
  }

  function handleEditClicked() {
    setModalData({show: true, data: currentTemplate});
  }

  function modalClosedCallback(data) {
    if (data) {
      if (templateList.some(t => t._id === data._id)) {
        setTemplateList((prev) => (
          prev.map(t => (t._id === data._id ? data : t))
        ));
      } else {
        setTemplateList((prev) => [...prev, data]);
      }

      if (!categoryList.includes(data.category)) {
        setCategoryList((prev) => ([...prev, data.category]).sort());
      }

      setCurrentTemplate(data);
    }
    
    setModalData({show: false, data: miscUtil.emptyTemplate});
  }

  function handleDeleteClicked() {
    setYesNoModalData({show: true, message: "Are you sure you want to delete the selected template?"});
  }

  async function yesNoCallback(result) {
    if (result.result) {
      const curTemplateId = currentTemplate._id;
      const curCategory = currentTemplate.category;
      const curIndex = templateList.findIndex(t => t._id === curTemplateId);
      const response = await apiUtil.apiDelete(`/v1/template/${curTemplateId}`);

      if (response.success) {
        const updatedTempList = templateList.filter(t => t._id !== curTemplateId);
        const updatedCatList = [...new Set(updatedTempList.map(entry => entry.category))];

        let newCurrent;

        if (showCategoryView) {
          newCurrent = updatedTempList.find(t => t.category === curCategory);
        } else {
          newCurrent = updatedTempList.length <= curIndex ? updatedTempList[curIndex] : 
            updatedTempList.length && curIndex !== 0 ? updatedTempList[curIndex-1] : null;
        }
        
        if (!newCurrent) {
          newCurrent = updatedTempList.length ? updatedTempList[0] : miscUtil.emptyTemplate;
        }

        setTemplateList(updatedTempList);
        setCategoryList(updatedCatList);
        setCurrentTemplate(newCurrent);
      } else {
        setErrorResponse(response);
      }
    }

    setYesNoModalData({show: false, message:''});
  }

  function createNewChat() {
      const parameters = chatUtil.initNewParameters(profile, currentTemplate);
      miscUtil.addTemplateMRU(currentTemplate);
      setShowCreate({show: true, parameters});
  }

  function handleCreateCallback() {
      setShowCreate({show: false, parameters:'' });
      goToMainPage();
  }

  const navIcon = (<XLg />);

  return (
    <>
      <NavHeader icon={navIcon} callBack={goToMainPage} />
      { errorResponse ? <ErrorHandler errorResponse={errorResponse} /> : null }
      <main>
        <TemplateModal show={modalData.show} defaultData={modalData.data} categories={categoryList} 
          closeCallback={modalClosedCallback} />
        <YesNoModal show={yesNoModalData.show} message={yesNoModalData.message} closeCallback={yesNoCallback} />
        <ChatCreateModal show={showCreate.show} parameters={showCreate.parameters} closeCallback={handleCreateCallback} />
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
