import { Container, Row, Col } from "react-bootstrap"
import PropTypes from "prop-types";

import './ChatTitle.css'

ChatTitle.propTypes = {
    title: PropTypes.string
}

export default function ChatTitle({title}) {
    return (
        <Container>
            <Row>
                <Col>
                    <h5 className="text-center card bg-body-tertiary chat-title">{title}</h5>
                </Col>
            </Row>
        </Container>
    )
}