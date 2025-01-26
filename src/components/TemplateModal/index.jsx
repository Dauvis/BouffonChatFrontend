import { Modal } from "react-bootstrap";
import TemplateForm from "../TemplateForm";
import PropTypes from "prop-types";

export default function TemplateModal({ show, defaultData, categories, closeCallback }) {
    TemplateModal.propTypes = {
        show: PropTypes.bool.isRequired,
        defaultData: PropTypes.any.isRequired,
        categories: PropTypes.array.isRequired,
        closeCallback: PropTypes.func.isRequired,
    }

    return (
        <Modal show={show} onHide={() => closeCallback(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TemplateForm defaultData={defaultData} categories={categories} closeCallback={closeCallback} />
            </Modal.Body>
        </Modal>
    );
}