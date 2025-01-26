import { useEffect, useState, useContext } from 'react';
import { ChatDataContext } from '../../contexts/ChatDataContext.jsx';
import PropTypes from 'prop-types';

export default function VisibilityRefresh({ idleTimeThreshold = 5 * 60 * 1000 }) {
    const [lastInactiveTime, setLastInactiveTime] = useState(null);
    const { activeChat, loadChatData } = useContext(ChatDataContext);

    VisibilityRefresh.propTypes = {
        idleTimeThreshold: PropTypes.number
    }

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
