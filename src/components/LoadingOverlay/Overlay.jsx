import PropTypes from "prop-types"

import { useOverlay } from "../../contexts/OverlayContext";

import "./LoadingOverlay.css"

Overlay.propTypes = {
    children: PropTypes.node.isRequired
};

export default function Overlay({children}) {
    const overlay = useOverlay()

    return (
        <>
        {children}
        { overlay.overlayVisibility ? <div className="loading-overlay"><span>Please wait</span></div> : null }
        </>
    )
}