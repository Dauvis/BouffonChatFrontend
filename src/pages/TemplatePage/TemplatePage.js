import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, } from "react-bootstrap";
import { ChatTextFill, Diagram3Fill, ListTask, PencilFill, PlusLg, XLg } from "react-bootstrap-icons";
import NavHeader from "../../components/NavHeader";
import TemplateView from "../../components/TemplateView";
import TemplateListByCategory from "../../components/TemplateListByCategory";
import "./TemplatePage.css"
import TemplateList from "../../components/TemplateList/TemplateList";
import apiUtil from "../../util/apiUtil.js";
import ErrorRedirect from "../../components/ErrorRedirect";

export default function TemplatePage() {
  const navigate = useNavigate();
  const [showCategoryView, setShowCategoryView] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({ name: '', description: '', category: '', tone:'', instructions:'', notes:''});
  const [categoryList, setCategoryList] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await apiUtil.apiGet("/v1/template");

      if (response.success) {
        const allTemplates = response.body.templates;
        setTemplateList(allTemplates);
        setCurrentTemplate(allTemplates ? allTemplates[0] : null);
        setCategoryList([...new Set(allTemplates.map(entry => entry.category))]);
      } else {
        setErrorResponse(response.body);
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

  const navIcon = (<XLg />);

  if (errorResponse) {
    return (<ErrorRedirect errorResponse={errorResponse} />);
  }

  return (
    <>
      <NavHeader icon={navIcon} callBack={goToMainPage} />
      <main>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <Container>
                <Row>
                  <Col>
                    <ButtonToolbar className="template-page-toolbar">
                      <ButtonGroup className="me-2" aria-label="Templates">
                        <Button variant="secondary" aria-label="New template"><PlusLg /></Button>
                        <Button variant="secondary" aria-label="Edit template"><PencilFill /></Button>
                        <Button variant="secondary" aria-label="Delete template"><XLg /></Button>
                        <Button variant="secondary" aria-label="Create conversation"><ChatTextFill /></Button>
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
