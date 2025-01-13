import { Modal, Table } from "react-bootstrap";
import { useContext } from "react";
import { OptionsContext } from "../../contexts/OptionsContext";

export default function ChatInfoModal({show, chat, closeCallback}) {
    const options = useContext(OptionsContext);
    
    const modelLabel = options.modelLabel(chat.model);

    return (
        <Modal show={show} onHide={closeCallback}>
        <Modal.Header closeButton>
          <Modal.Title>Chat information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table size="sm">
                <tbody>
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
                        <td>{modelLabel}</td>
                    </tr>                
                    <tr>
                        <td>Instructions</td>
                        <td>{chat.instructions}</td>
                    </tr>                
                    <tr>
                        <td>Notes</td>
                        <td>{chat.notes}</td>
                    </tr>    
                </tbody>            
            </Table>
        </Modal.Body>
      </Modal>
    );
}