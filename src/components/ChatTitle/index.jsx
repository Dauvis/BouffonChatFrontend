import { Container, Card } from "react-bootstrap"
import './ChatTitle.css'
import PropTypes from "prop-types";

export default function ChatTitle({title}) {
    ChatTitle.propTypes = {
        title: PropTypes.string
    }

    return (
        <Container>
            <Card className="chat-title bg-body-tertiary">
                <Card.Text>{title}</Card.Text>
            </Card>
        </Container>
    )
}