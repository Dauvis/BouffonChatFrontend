import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import TemplateForm from "../TemplateForm";

export default function TemplateModal({ defaultData, categories, closeCallback }) {
    TemplateModal.propTypes = {
        defaultData: PropTypes.any.isRequired,
        categories: PropTypes.array.isRequired,
        closeCallback: PropTypes.func.isRequired,
    }

    return (
        <Modal show={true} onHide={() => closeCallback(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TemplateForm defaultData={defaultData} categories={categories} closeCallback={closeCallback} />
            </Modal.Body>
        </Modal>
    );
}