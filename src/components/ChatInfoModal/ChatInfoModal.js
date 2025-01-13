import { Modal, Table } from "react-bootstrap";

export default function ChatInfoModal({show, chat, closeCallback}) {
    return (
        <Modal show={show} onHide={closeCallback}>
        <Modal.Header closeButton>
          <Modal.Title>Chat information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table size="sm">
                <tr>
                    <td>Name</td>
                    <td>{chat.name}</td>
                </tr>                
                <tr>
                    <td>Tone</td>
                    <td>{chat.tone}</td>
                </tr>                
                <tr>
                    <td>Model</td>
                    <td>{chat.model}</td>
                </tr>                
                <tr>
                    <td>Instructions</td>
                    <td>{chat.instructions}</td>
                </tr>                
                <tr>
                    <td>Notes</td>
                    <td>{chat.notes}</td>
                </tr>                
            </Table>
        </Modal.Body>
      </Modal>
    );
}