import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { OptionsContext } from "../../components/OptionsContext/OptionsContext.js";
import loginService  from "../../services/loginService.js";
import './ProfileForm.css'

export default function ProfileForm() {
    const navigate = useNavigate();
    const options = useContext(OptionsContext);

    const toneOptions = (options?.tones || []).map(entry => (
        <option key={entry} value={entry}>{entry}</option>
    ));

    const modelOptions = (options?.models || []).map(entry => (
        <option key={entry.value} value={entry.value}>{entry.label}</option>
    ));

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
                        <Form.Control type="text" placeholder="eg. John Doe" required />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="profile_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="eg. jdoe@example.com" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="profile_tone">
                        <Form.Label>Tone</Form.Label>
                        <Form.Select>
                            <option value="">Select tone...</option>
                            {toneOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="profile_model">
                        <Form.Label>Model</Form.Label>
                        <Form.Select>
                            <option value="">Select model...</option>
                            {modelOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="profile_instructions">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" placeholder="Instructions for the assistant..." rows={7}/>
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
