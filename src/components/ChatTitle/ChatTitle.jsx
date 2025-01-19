import { Container, Card } from "react-bootstrap"
import './ChatTitle.css'

export default function ChatTitle({title}) {
    return (
        <Container>
            <Card className="chat-title bg-body-tertiary">
                <Card.Text>{title}</Card.Text>
            </Card>
        </Container>
    )
}