import { Modal } from "react-bootstrap";
import ChatCreateForm from "../ChatCreateForm";

export default function ChatCreateModal({show, parameters, closeCallback}) {
    return (
        <Modal show={show} onHide={closeCallback}>
        <Modal.Header closeButton>
          <Modal.Title>New chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { parameters ? <ChatCreateForm parameters={parameters} closeCallback={closeCallback} /> : null }
        </Modal.Body>
      </Modal>
    );
}