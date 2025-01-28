import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import TemplateForm from "../TemplateForm";

TemplateModal.propTypes = {
    defaultData: PropTypes.any.isRequired,
    categories: PropTypes.array.isRequired,
    closeCallback: PropTypes.func.isRequired,
}

export default function TemplateModal({ defaultData, categories, closeCallback }) {
    return (
        <Modal show={true} onHide={() => closeCallback(null)} aria-labelledby="template-title">
            <Modal.Header closeButton>
                <Modal.Title id="template-title">Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TemplateForm defaultData={defaultData} categories={categories} closeCallback={closeCallback} />
            </Modal.Body>
        </Modal>
    );
}