import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ChatDataContext } from '../../contexts/ChatDataContext.jsx';

export default function VisibilityRefresh({ idleTimeThreshold = 5 * 60 * 1000 }) {
    VisibilityRefresh.propTypes = {
        idleTimeThreshold: PropTypes.number
    }

    const [lastInactiveTime, setLastInactiveTime] = useState(null);
    const { activeChat, loadChatData } = useContext(ChatDataContext);

    useEffect(() => {
        function handleVisibilityChange() {
            if (document.visibilityState === 'hidden') {
                setLastInactiveTime(Date.now());
            } else if (document.visibilityState === 'visible' && lastInactiveTime) {
                const timeAway = Date.now() - lastInactiveTime;
                if (timeAway > idleTimeThreshold) {
                    loadChatData(activeChat._id);
                }
                setLastInactiveTime(null); // Reset the inactive time
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [lastInactiveTime, idleTimeThreshold]);

    return null;
};
