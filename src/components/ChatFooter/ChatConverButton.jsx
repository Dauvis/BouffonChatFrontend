import { Dropdown } from "react-bootstrap";
import { ChatDotsFill, ChatFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

ChatConvertButton.propTypes = {
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    clickedCallBack: PropTypes.func.isRequired,
};

export default function ChatConvertButton({ type, disabled, clickedCallBack }) {
    const convertIcon = (type === "active") ? <ChatDotsFill aria-hidden={true} /> : <ChatFill aria-hidden={true}/>;
    const convertText = 
        (type === "temp") ? "Save as active" :
        (type === "active") ? "Save as archived" :
        (type === "archived") ? "Restore as active" :
        "Save";
    
    return (<Dropdown.Item as="button" disabled={disabled} onClick={clickedCallBack} aria-label={convertText}>
        {convertIcon} {convertText}
    </Dropdown.Item>);
}