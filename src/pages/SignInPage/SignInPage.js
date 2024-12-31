import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import loginService from "../../services/loginService.js";
import { Container, Card } from "react-bootstrap";
import logo from "../../assets/images/bouffon_chat_icon.png";

export default function SignInPage() {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    const idToken = response.credential;
    const authData = await loginService.logIntoAPI(idToken);

    if (authData) {
      localStorage.setItem("profile", JSON.stringify(authData.profile));
      navigate("/main");
    } else {
      localStorage.removeItem("profile");
    }
  };

  const onError = () => {
    console.error("Login Failed");
    navigate("/error", { state: { errorStatus: 401, errorText: "Authentication with Google failed. Please, try again." } });
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card className="mb3" style={{maxWidth: '540px', borderStyle: 'none'}}>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>Bouffon Chat</Card.Title>
          <Card.Text>
            Welcome to Bouffon Chat! Dive into engaging conversations and
            explore ideas with our intelligent chat system, powered by
            advanced AI technology. Whether you are seeking answers,
            brainstorming creative solutions, or just looking to chat,
            Bouffon Chat is here to make your experience interactive and
            insightful. Sign in to start connecting and discovering the
            limitless possibilities of conversation!            
          </Card.Text>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <GoogleLogin onSuccess={onSuccess} onError={onError} />
          </GoogleOAuthProvider>
        </Card.Body>
      </Card>
    </Container>
  );
};
