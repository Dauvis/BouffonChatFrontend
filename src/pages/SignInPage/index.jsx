import { useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Container, Card, Alert } from "react-bootstrap";

import logo from "../../assets/images/bouffon_chat_icon.png";

import loginService from "../../services/loginService";
import errorUtil from "../../util/errorUtil";
import localStoreUtil from "../../util/localStoreUtil";

export default function SignInPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const message = location.state?.errorInfo?.args.message || "";

    const onSuccess = async (response) => {
        const idToken = response.credential;
        const loginResponse = await loginService.logIntoAPI(idToken);

        if (loginResponse.success) {
            localStoreUtil.setProfile(loginResponse.body.profile);
            navigate("/main");
        } else {
            localStoreUtil.clearProfile();
            const errorInfo = errorUtil.handleApiError(loginResponse);
            navigate(errorInfo.redirect, { state: { errorInfo } });
        }
    };

    const onError = () => {
        const errorInfo = errorUtil.handleInternalError("NotAuthenticated", "Authentication with Google failed. Please try again later.")
        navigate(errorInfo.redirect, { state: { errorInfo } });
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Card className="mb3" style={{ maxWidth: '540px', borderStyle: 'none' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>Bouffon Chat</Card.Title>
                    {message ? <Card.Text><Alert variant="danger">{message}</Alert></Card.Text> : null}
                    <Card.Text>
                        Welcome to Bouffon Chat! Dive into engaging conversations and
                        explore ideas with our intelligent chat system, powered by
                        advanced AI technology. Whether you are seeking answers,
                        brainstorming creative solutions, or just looking to chat,
                        Bouffon Chat is here to make your experience interactive and
                        insightful. Sign in to start connecting and discovering the
                        limitless possibilities of conversation!
                    </Card.Text>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
                        <GoogleLogin onSuccess={onSuccess} onError={onError} />
                    </GoogleOAuthProvider>
                </Card.Body>
            </Card>
        </Container>
    );
};
