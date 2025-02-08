import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import { OptionsContext } from "../../contexts/OptionsContext.jsx";

import LoadingWait from "../LoadingWait";
import ErrorHandler from "../ErrorHandler";

import loginService from "../../services/loginService";
import apiUtil from "../../util/apiUtil";
import errorUtil from "../../util/errorUtil";
import localStoreUtil from "../../util/localStoreUtil";

import './ProfileForm.css'

ProfileForm.propTypes = {
    saveCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func.isRequired,
}

export default function ProfileForm({ saveCallback, cancelCallback }) {
    const navigate = useNavigate();
    const options = useContext(OptionsContext);

    const toneOptions = options.toneOptionsList();
    const modelOptions = options.modelOptionsList();

    const [profile, setProfile] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorInfo, setErrorInfo] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await apiUtil.get("/v1/profile");

            if (response.success) {
                setProfile(response.body.profile);
            } else {
                const errInfo = errorUtil.handleApiError(response);
                setErrorInfo(errInfo);
            }
        }

        fetchProfile();
    }, []);

    const logOutOfApp = async () => {
        await loginService.logOutOfAPI();
        localStoreUtil.clearProfile();
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
        const response = await apiUtil.put("/v1/profile", profile);

        if (!response.success) {
            if (response.status === 401) {
                const errInfo = errorUtil.handleApiError(response);
                setErrorInfo(errInfo);
            } else {
                setErrorMsg(response.body.message);
            }
        } else {
            localStoreUtil.setProfile(profile);
            saveCallback();
        }
    }

    if (errorInfo) {
        return (<ErrorHandler errorInfo={errorInfo} />);
    }

    return (
        profile ?
            <>
            <Form action={saveProfile}>
                {errorMsg ? <Alert variant="danger" aria-live="assertive">{errorMsg}</Alert> : null}
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
                            <Form.Label>Persona</Form.Label>
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
            </>
            : <LoadingWait text="Please wait. Loading profile" />
    );
}
