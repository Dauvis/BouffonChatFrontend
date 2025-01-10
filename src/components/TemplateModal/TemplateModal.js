import { Modal } from "react-bootstrap";
import TemplateForm from "../TemplateForm";

export default function TemplateModal({show, defaultData, categories, closeCallback}) {
    return (
        <Modal show={show} onHide={() => closeCallback(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TemplateForm defaultData={defaultData} categories={categories} closeCallback={closeCallback}/>
        </Modal.Body>
      </Modal>        
    );    
}