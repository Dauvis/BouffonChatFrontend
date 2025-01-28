import { Modal, Table } from "react-bootstrap";
import { useContext } from "react";
import PropTypes from "prop-types";

import { OptionsContext } from "../../contexts/OptionsContext";

ChatInfoModal.propTypes = {
    chat: PropTypes.any.isRequired,
    closeCallback: PropTypes.func.isRequired,
}

export default function ChatInfoModal({chat, closeCallback}) {
    const options = useContext(OptionsContext);

    const modelLabel = options.modelLabel(chat.model);

    return (
        <Modal show={true} onHide={closeCallback}>
        <Modal.Header closeButton>
          <Modal.Title>Chat information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table size="sm">
                <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{chat.name}</td>
                    </tr>                
                    <tr>
                        <th scope="row">Tone</th>
                        <td>{chat.tone}</td>
                    </tr>                
                    <tr>
                        <th scope="row">Model</th>
                        <td>{modelLabel}</td>
                    </tr>                
                    <tr>
                        <th scope="row">Instructions</th>
                        <td>{chat.instructions}</td>
                    </tr>                
                    <tr>
                        <th scope="row">Notes</th>
                        <td>{chat.notes}</td>
                    </tr>    
                </tbody>            
            </Table>
        </Modal.Body>
      </Modal>
    );
}