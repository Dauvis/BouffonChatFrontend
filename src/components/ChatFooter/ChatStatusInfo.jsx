import PropTypes from "prop-types";

import "./ChatFooter.css"

ChatStatusInfo.propTypes = {
    type: PropTypes.string.isRequired,
};

export default function ChatStatusInfo({ type }) {
    const message =
        (type === "temp") ? "This is a temporary chat and may be removed after inactivity" :
            (type === "archived") ? "This chat is archived. Some actions are unavailable" :
                "";

    return (
        message ?
            <div aria-live="polite" aria-atomic="true" className={`text-center chat-status-info chat-type-${type}`}>
                {message}
            </div>
            :
            null
    );
}
