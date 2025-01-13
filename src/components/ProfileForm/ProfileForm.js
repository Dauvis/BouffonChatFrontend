import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { OptionsContext } from "../../contexts/OptionsContext.js";
import loginService from "../../services/loginService.js";
import apiUtil from "../../util/apiUtil.js";
import './ProfileForm.css'
import LoadingWait from "../LoadingWait/LoadingWait.js";
import ErrorRedirect from "../ErrorRedirect";
import miscUtil from "../../util/miscUtil.js";

export default function ProfileForm({ saveCallback, cancelCallback }) {
    const navigate = useNavigate();
    const options = useContext(OptionsContext);

    const toneOptions = options.toneOptionsList();
    const modelOptions = options.modelOptionsList();

    const [profile, setProfile] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorResponse, setErrorResponse] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await apiUtil.apiGet("/v1/profile");

            if (response.success) {
                setProfile(response.body.profile);
            } else {
                setErrorResponse(response);
                console.log(`Error fetching profile: ${response.body.message}`);
            }
        }

        fetchProfile();
    }, []);

    const logOutOfApp = async () => {
        await loginService.logOutOfAPI();
        miscUtil.clearProfile();
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
        const response = await apiUtil.apiPut("/v1/profile", profile);

        if (!response.success) {
            if (response.status === 401) {
                setErrorResponse(response);
            } else {
                setErrorMsg(response.body.message);
            }
        } else {
            miscUtil.setProfile(profile);
            saveCallback();
        }
    }

    if (errorResponse) {
        return (<ErrorRedirect errorResponse={errorResponse} />);
    }

    return (
        profile ?
            <Form action={saveProfile}>
                {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : null}
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="eg. John Doe" required defaultValue={profile.name} onBlur={fieldChanged} />
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="eg. jdoe@example.com" required defaultValue={profile.email} onBlur={fieldChanged} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="defaultTone">
                            <Form.Label>Tone</Form.Label>
                            <Form.Select defaultValue={profile.defaultTone} onBlur={fieldChanged}>
                                <option value="">Select tone...</option>
                                {toneOptions}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="defaultModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Select defaultValue={profile.defaultModel} onBlur={fieldChanged}>
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
                            <Form.Control as="textarea" placeholder="Instructions for the assistant..." rows={7} defaultValue={profile.defaultInstructions} onBlur={fieldChanged} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Button variant="primary" type="submit" className="profile-form-button">Save</Button>
                        <Button variant="secondary" className="profile-form-button" onClick={cancelCallback}>Cancel</Button>
                    </Col>
                    <Col sm={4} className="text-end">
                        <Button variant="link" onClick={logOutOfApp}><BoxArrowRight /> Log out</Button>
                    </Col>
                </Row>
            </Form>
            : <LoadingWait text="Please wait. Loading profile" />
    );
}
