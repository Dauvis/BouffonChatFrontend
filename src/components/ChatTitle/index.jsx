import { Container, Card } from "react-bootstrap"
import PropTypes from "prop-types";

import './ChatTitle.css'

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