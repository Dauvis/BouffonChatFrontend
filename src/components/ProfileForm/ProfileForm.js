import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import loginService  from "../../services/loginService.js";
import './ProfileForm.css'

export default function ProfileForm() {
    const navigate = useNavigate();

    const logOutOfApp = async () => {
        await loginService.logOutOfAPI();
        localStorage.removeItem('profile');
        navigate('/sign-in');
    }

    return (
        <Form>
            <input type="hidden" id="profileId" name="profileId" />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="profile_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name..." required />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="profile_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email..." required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group class="mb-3" controlId="profile_tone">
                        <Form.Label>Tone</Form.Label>
                        <Form.Select>
                            <option selected>Select tone...</option>
                            <option value="1">First</option>
                            <option value="2">Second</option>
                            <option value="3">Third</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group class="mb-3" controlId="profile_model">
                        <Form.Label>Model</Form.Label>
                        <Form.Select>
                            <option selected>Select model...</option>
                            <option value="1">First</option>
                            <option value="2">Second</option>
                            <option value="3">Third</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group class="mb-3" controlId="profile_instructions">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter instructions..." rows={7}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <Button variant="primary" className="profile-form-button">Save</Button> 
                    <Button variant="secondary" className="profile-form-button">Cancel</Button>
                </Col>
                <Col sm={4} className="text-end">
                    <Button variant="link" onClick={logOutOfApp}><BoxArrowRight /> Log out</Button>
                </Col>
            </Row>
        </Form>
    );
}
