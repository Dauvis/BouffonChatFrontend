import { Alert, Spinner } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { ChatDataContext } from "../../contexts/ChatDataContext";

export default function LoadingWait({text, cancelUpdate = false}) {
    const { setUpdateActiveChat } = useContext(ChatDataContext)

    useEffect(() => {
        return () => {
            if (cancelUpdate) {
                setUpdateActiveChat(false)            
            }
        }
    }, [cancelUpdate, setUpdateActiveChat])

    return (
        <Alert variant="light" className="text-center">{text} <Spinner animation="border" size="sm" /></Alert>
    );
}