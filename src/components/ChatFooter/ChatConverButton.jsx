import { Dropdown } from "react-bootstrap";
import { ChatDotsFill, ChatFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

export default function ChatConvertButton({ type, disabled, clickedCallBack }) {
    ChatConvertButton.propTypes = {
        type: PropTypes.string.isRequired,
        disabled: PropTypes.bool.isRequired,
        clickedCallBack: PropTypes.func.isRequired,
    };

    const convertIcon = (type === "active") ? <ChatDotsFill /> : <ChatFill />;
    let convertText
    
    if (type === "temp") {
        convertText = "Save as active";
    } else if (type === "active") {
        convertText = "Save as archived";
    } else if (type === "archived") {
        convertText = "Restore as active";
    } else {
        convertText = "Save";
    }
    
    return (<Dropdown.Item as="button" disabled={disabled} onClick={clickedCallBack}>
        {convertIcon} {convertText}
    </Dropdown.Item>);
}