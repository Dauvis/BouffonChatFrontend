import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { OptionsContext } from "../../components/OptionsContext/OptionsContext.js";
import loginService  from "../../services/loginService.js";
import apiUtil from "../../util/apiUtil.js";
import './ProfileForm.css'

export default function ProfileForm({saveCallback, cancelCallback}) {
    const navigate = useNavigate();
    const options = useContext(OptionsContext);

    const toneOptions = (options?.tones || []).map(entry => (
        <option key={entry} value={entry}>{entry}</option>
    ));

    const modelOptions = (options?.models || []).map(entry => (
        <option key={entry.value} value={entry.value}>{entry.label}</option>
    ));

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await apiUtil.apiGet("/v1/profile");
            setProfile(response.body.profile);
            // TODO: check for errors
        }

        fetchProfile();
    }, []);

    const logOutOfApp = async () => {
        await loginService.logOutOfAPI();
        localStorage.removeItem('profile');
        navigate('/sign-in');
    }

    const fieldChanged = (event) => {
        const target = event.currentTarget;
        const changed = {
            ...profile,
            [target.id]: target.value,
        }
        setProfile(changed);
    }

    const saveProfile = async () => {
        // TODO: Add validation
        const response = await apiUtil.apiPut("/v1/profile", profile);
        // TODO: check for errors from API
        saveCallback();
    }

    return (
        profile ?
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="eg. John Doe" required defaultValue={profile.name} onChange={fieldChanged}/>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="eg. jdoe@example.com" required defaultValue={profile.email} onChange={fieldChanged}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="defaultTone">
                        <Form.Label>Tone</Form.Label>
                        <Form.Select defaultValue={profile.defaultTone} onChange={fieldChanged}>
                            <option value="">Select tone...</option>
                            {toneOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="defaultModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Select defaultValue={profile.defaultModel} onChange={fieldChanged}>
                            <option value="">Select model...</option>
                            {modelOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="defaultInstructions">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" placeholder="Instructions for the assistant..." rows={7} defaultValue={profile.defaultInstructions} onChange={fieldChanged}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <Button variant="primary" className="profile-form-button" onClick={saveProfile}>Save</Button> 
                    <Button variant="secondary" className="profile-form-button" onClick={cancelCallback}>Cancel</Button>
                </Col>
                <Col sm={4} className="text-end">
                    <Button variant="link" onClick={logOutOfApp}><BoxArrowRight /> Log out</Button>
                </Col>
            </Row>
        </Form>
        : <span>Please wait...</span>
    );
}
