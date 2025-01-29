import { useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Container, Card, Alert } from "react-bootstrap";

import logo from "../../assets/images/BouffonChatLogo.svg";

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
                <Card.Img variant="top" alt="Bouffon Chat logo" src={logo} />
                <Card.Body>
                    <Card.Title as="h1">Bouffon Chat</Card.Title>
                    {message ? <Card.Text><Alert variant="danger" role="alert">{message}</Alert></Card.Text> : null}
                    <Card.Text>
                    Welcome to Bouffon Chat! Immerse yourself in engaging conversations and explore 
                    ideas with our sophisticated chat system, powered by GPT technology. Whether you 
                    are looking for answers, brainstorming creative solutions, discovering a new recipe
                    to try, or just eager to chat, Bouffon Chat leverages advanced AI to provide an 
                    interactive and enriching experience. Sign in now to connect and unlock the endless 
                    possibilities!
                    </Card.Text>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
                        <GoogleLogin onSuccess={onSuccess} onError={onError} />
                    </GoogleOAuthProvider>
                </Card.Body>
            </Card>
        </Container>
    );
};
