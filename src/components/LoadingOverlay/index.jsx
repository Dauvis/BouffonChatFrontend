import PropTypes from "prop-types"

import { OverlayProvider } from "../../contexts/OverlayContext";
import Overlay from "./Overlay";

LoadingOverlay.propTypes = {
    children: PropTypes.node.isRequired
};

export default function LoadingOverlay({children}) {
    return (
        <OverlayProvider>
            <Overlay>
                {children}
            </Overlay>
        </OverlayProvider>
    )
}