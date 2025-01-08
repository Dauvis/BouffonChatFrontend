import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { ChatTextFill, Diagram3Fill, ListTask, PencilFill, PlusLg, XLg } from "react-bootstrap-icons";
import NavHeader from "../../components/NavHeader";
import TemplateView from "../../components/TemplateView";
import TemplateListByCategory from "../../components/TemplateListByCategory";
import "./TemplatePage.css"
import TemplateList from "../../components/TemplateList/TemplateList";

export default function TemplatePage() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/main");
  };

  const navIcon = (<XLg />);

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
                      <Button variant="secondary" aria-label="Show by category" className="active"><Diagram3Fill /></Button>
                      <Button variant="secondary" aria-label="Show as list"><ListTask /></Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                  </Col>
                </Row>
                <Row>
                  <TemplateListByCategory />
                </Row>
              </Container>
            </Col>
            <Col xs={12} md={8} className="d-none d-md-block">
              <TemplateView />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
